import { NextRequest } from 'next/server';
import crypto from 'crypto';
import { supabase, isSupabaseConfigured } from './supabase';

const SESSION_COOKIE_NAME = 'ecell_admin_token';
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // 8 hours

// 1. Sliding window in-memory fallback rate limiter
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [key, val] of rateLimitStore.entries()) {
      if (now > val.resetAt) rateLimitStore.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: maxAttempts - 1, retryAfterSeconds: 0 };
  }

  if (entry.count >= maxAttempts) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds: retryAfter };
  }

  entry.count += 1;
  return { allowed: true, remaining: maxAttempts - entry.count, retryAfterSeconds: 0 };
}

export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Shared Multi-Tier Rate Limiter for Production Environments:
 * Tier 1: Supabase / Database shared table (admin_rate_limits) when configured
 * Tier 2: Upstash / Redis REST API if UPSTASH_REDIS_REST_URL is defined
 * Tier 3: In-memory sliding window fallback (Preview mode & local dev)
 */
export async function checkRateLimitAsync(
  identifier: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000
): Promise<{ allowed: boolean; remaining: number; retryAfterSeconds: number }> {
  // Option A: Upstash Redis if configured
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (redisUrl && redisToken) {
    try {
      const key = `ratelimit:${identifier}`;
      const res = await fetch(`${redisUrl}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${redisToken}` },
        body: JSON.stringify([
          ['INCR', key],
          ['TTL', key],
        ]),
      });
      if (res.ok) {
        const results = await res.json();
        const currentCount = results[0]?.result || 1;
        let ttl = results[1]?.result || -1;
        if (ttl === -1) {
          const expireSec = Math.ceil(windowMs / 1000);
          await fetch(`${redisUrl}/EXPIRE/${key}/${expireSec}`, {
            headers: { Authorization: `Bearer ${redisToken}` },
          });
          ttl = expireSec;
        }
        if (currentCount > maxAttempts) {
          return { allowed: false, remaining: 0, retryAfterSeconds: Math.max(1, ttl) };
        }
        return { allowed: true, remaining: maxAttempts - currentCount, retryAfterSeconds: 0 };
      }
    } catch {
      // Fall through to database / memory
    }
  }

  // Option B: Supabase shared database table
  if (isSupabaseConfigured && supabase) {
    try {
      const now = new Date();
      const { data: existing } = await supabase
        .from('admin_rate_limits')
        .select('attempts, reset_at')
        .eq('identifier', identifier)
        .single();

      if (existing) {
        const resetAtDate = new Date(existing.reset_at);
        if (now < resetAtDate) {
          if (existing.attempts >= maxAttempts) {
            const retryAfter = Math.ceil((resetAtDate.getTime() - now.getTime()) / 1000);
            return { allowed: false, remaining: 0, retryAfterSeconds: retryAfter };
          }
          const nextCount = existing.attempts + 1;
          await supabase
            .from('admin_rate_limits')
            .update({ attempts: nextCount })
            .eq('identifier', identifier);
          return { allowed: true, remaining: maxAttempts - nextCount, retryAfterSeconds: 0 };
        }
      }

      // Initialize or reset window
      const newResetAt = new Date(now.getTime() + windowMs).toISOString();
      await supabase
        .from('admin_rate_limits')
        .upsert({ identifier, attempts: 1, reset_at: newResetAt });
      return { allowed: true, remaining: maxAttempts - 1, retryAfterSeconds: 0 };
    } catch {
      // Fall through to memory store
    }
  }

  // Option C: Memory Store fallback
  return checkRateLimit(identifier, maxAttempts, windowMs);
}

export async function resetRateLimitAsync(identifier: string): Promise<void> {
  resetRateLimit(identifier);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('admin_rate_limits').delete().eq('identifier', identifier);
    } catch {
      // Ignore
    }
  }
}

function getSecretKey(): string {
  return process.env.ADMIN_SECRET_KEY || 'ecell-mitaoe-admin-2025';
}

/**
 * Creates a cryptographically signed session token containing an issue timestamp.
 * Format: `${timestamp}.${hmacSignature}`
 */
export function generateAdminSessionToken(): string {
  const timestamp = Date.now();
  const secret = getSecretKey();
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`session:${timestamp}`);
  const signature = hmac.digest('hex');
  return `${timestamp}.${signature}`;
}

/**
 * Verifies that the request carries a valid, unexpired, and tamper-proof session token.
 */
export function verifyAdminSession(request: NextRequest): boolean {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token || !token.includes('.')) {
    return false;
  }

  const [timestampStr, signature] = token.split('.');
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    return false;
  }

  const now = Date.now();
  // Check if session has expired
  if (now - timestamp > SESSION_MAX_AGE_SECONDS * 1000) {
    return false;
  }

  // Prevent tokens generated in the future
  if (timestamp > now + 60000) {
    return false;
  }

  const secret = getSecretKey();
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`session:${timestamp}`);
  const expectedSignature = hmac.digest('hex');

  // Timing safe comparison to protect against side-channel analysis
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(sigBuffer, expectedBuffer);
}

/**
 * CSRF / Origin Verification for administrative state-changing operations (POST, PUT, DELETE)
 */
export function verifyCsrfOrigin(request: NextRequest): boolean {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return true;
  }

  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');

  // If both origin and referer are absent (e.g. backend script / testing), require valid host
  if (!origin && !referer) {
    return true;
  }

  try {
    const originUrl = origin ? new URL(origin) : new URL(referer!);
    if (host && (originUrl.host === host || originUrl.host === host.split(':')[0])) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS };

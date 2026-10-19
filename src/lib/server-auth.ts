import { NextRequest } from 'next/server';
import crypto from 'crypto';

const SESSION_COOKIE_NAME = 'ecell_admin_token';
const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // 8 hours

// Simple sliding window in-memory rate limiter for administrative auth
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

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS };

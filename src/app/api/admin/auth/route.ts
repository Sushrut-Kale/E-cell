import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { 
  checkRateLimitAsync, 
  resetRateLimitAsync, 
  generateAdminSessionToken, 
  verifyCsrfOrigin,
  SESSION_COOKIE_NAME, 
  SESSION_MAX_AGE_SECONDS 
} from '@/lib/server-auth';

export async function POST(request: NextRequest) {
  try {
    // CSRF verification for state-changing authentication request
    if (!verifyCsrfOrigin(request)) {
      return NextResponse.json(
        { success: false, message: 'Cross-origin request rejected' },
        { status: 403 }
      );
    }

    // Determine client identifier for rate-limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               'anonymous-client';

    const rateLimit = await checkRateLimitAsync(`auth:${ip}`, 5, 15 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Too many failed attempts. Please retry in ${rateLimit.retryAfterSeconds} seconds.` 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfterSeconds),
          }
        }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body.passcode !== 'string' || body.passcode.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Administrator passcode is required' },
        { status: 400 }
      );
    }

    const passcode = body.passcode;
    const serverSecret = process.env.ADMIN_SECRET_KEY || 'ecell-mitaoe-admin-2025';

    // Timing-safe comparison to prevent timing side-channel attacks
    const bufferA = Buffer.from(passcode);
    const bufferB = Buffer.from(serverSecret);

    const isMatch = bufferA.length === bufferB.length && crypto.timingSafeEqual(bufferA, bufferB);

    if (!isMatch) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Invalid administrator credentials. ${rateLimit.remaining} attempts remaining before temporary lockout.` 
        },
        { status: 401 }
      );
    }

    // Reset rate limiter upon successful authentication
    await resetRateLimitAsync(`auth:${ip}`);

    // Generate cryptographic timestamped token
    const token = generateAdminSessionToken();

    const response = NextResponse.json({
      success: true,
      message: 'Server authentication successful',
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Authentication server error' },
      { status: 500 }
    );
  }
}

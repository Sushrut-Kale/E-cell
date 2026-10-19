import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Server-only administrative authentication route
// Strictly verifies credentials on the server without leaking passcodes to client bundles

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passcode } = body;

    if (!passcode || typeof passcode !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Passcode is required' },
        { status: 400 }
      );
    }

    // Retrieve server secret key (defaults to fallback if not explicitly set in env)
    const serverSecret = process.env.ADMIN_SECRET_KEY || 'ecell-mitaoe-admin-2025';

    // Constant-time comparison to prevent timing attacks
    const bufferA = Buffer.from(passcode);
    const bufferB = Buffer.from(serverSecret);

    const isMatch = bufferA.length === bufferB.length && crypto.timingSafeEqual(bufferA, bufferB);

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid administrator credentials' },
        { status: 401 }
      );
    }

    // Create a cryptographic session token
    const token = crypto.createHmac('sha256', serverSecret)
      .update(`ecell-admin-${Date.now()}`)
      .digest('hex');

    const response = NextResponse.json({
      success: true,
      message: 'Server authentication successful',
    });

    // Set secure, httpOnly session cookie
    response.cookies.set('ecell_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: 'Authentication server error' },
      { status: 500 }
    );
  }
}

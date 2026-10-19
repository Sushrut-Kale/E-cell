import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, verifyCsrfOrigin } from '@/lib/server-auth';

export async function POST(request: NextRequest) {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ success: false, message: 'Cross-origin request rejected' }, { status: 403 });
  }

  const response = NextResponse.json({ success: true, message: 'Administrative session terminated' });

  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}

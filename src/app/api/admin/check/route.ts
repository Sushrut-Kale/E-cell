import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/server-auth';

export async function GET(request: NextRequest) {
  const isValid = verifyAdminSession(request);

  if (!isValid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}

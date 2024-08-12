import { NextResponse } from 'next/server';
import { verifySession } from '@/app/lib/session';

export async function GET(request) {
  const cookies = request.cookies;
  const authToken = cookies.get('site-logged');
  const strToken = authToken?.value;
  if (strToken) {
    try {
      const userId = await verifySession(strToken);
      return NextResponse.json({ isAuthenticated: true, userId });
    } catch (error) {
      console.error('Invalid session token:', error);
      return NextResponse.json({ isAuthenticated: false });
    }
  }

  return NextResponse.json({ isAuthenticated: false });
}

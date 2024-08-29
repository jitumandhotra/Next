import { NextRequest, NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;
  const authToken = cookies.get('site-logged');
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/another-restricted-page')) {
    if (!authToken) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
  }
  const response = NextResponse.next();
  response.headers.set('X-Middleware-Check', 'middleware is working');
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/another-restricted-page/:path*', '/login'],
};

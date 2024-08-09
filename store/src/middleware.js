import { NextRequest, NextResponse } from 'next/server';

export function middleware(request) {
  //console.log('Middleware is working!');
  //console.log(`Request URL: ${request.url}`);
  //console.log(`Request Method: ${request.method}`);

  const response = NextResponse.next();
  response.headers.set('X-Middleware-Check', 'middleware is working');
  return response;
}


export const config = {
  matcher: '/'
};

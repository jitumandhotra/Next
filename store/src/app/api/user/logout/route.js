import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    
    const expires = new Date(0).toUTCString();
    const cookieOptions = [
      `path=/`,
      `Secure`,
      `HttpOnly`,
      `SameSite=Strict`,
      `Expires=${expires}`
    ].filter(Boolean).join('; ');

    return new Response(
      JSON.stringify({ success: true, status: 200, message: 'Logged out successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `site-logged=; ${cookieOptions}`
        }
      }
    );
  } catch (error) {
    console.error("Error occurred during logout: ", error);
    return NextResponse.json({ error: 'Logout failed', details: error.message, status: 500 });
  }
}

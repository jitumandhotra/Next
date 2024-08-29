import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { createSession } from '@/app/lib/session';

export async function POST(request) {
  try {
    const { email, password, rememberMe } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required', status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid Email', status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid Password', status: 401 });
    }

    const sessionToken = await createSession(user._id.toString());
    const expires = rememberMe ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)  : new Date(Date.now() + 30 * 1000);  

    const cookieOptions = [
      `path=/`,
      `Secure`,
      `HttpOnly`,
      `SameSite=Strict`,
      expires ? `Expires=${expires.toUTCString()}` : ''
    ].filter(Boolean).join('; ');

    return new Response(
      JSON.stringify({ success: true, status: 200, user: { email: user.email, sessionToken } }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `site-logged=${sessionToken}; ${cookieOptions}`
        }
      }
    );
  } catch (error) {
    console.error("Error occurred during login: ", error);
    return NextResponse.json({ error: 'Login failed', details: error.message, status: 500 });
  }
}

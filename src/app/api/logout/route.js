import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET() {
  const cookie = serialize('session', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: -1, // Expire immediately
  });

  const response = NextResponse.json({ message: 'Logged out successfully' });
  response.headers.set('Set-Cookie', cookie);
  return response;
}

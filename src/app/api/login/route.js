import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    const cookie = serialize('session', JSON.stringify({ email: user.email, role: user.role }), {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', 
      path: '/',
      maxAge: 60 * 60 * 24, 
    });

    const response = NextResponse.json({
      message: 'Login successful',
      user: { email: user.email, role: user.role },
    });

    response.headers.set('Set-Cookie', cookie); 
    return response;

  } catch (error) {
    return NextResponse.json(
      { message: 'Error during login', error: error.message },
      { status: 500 }
    );
  }
}

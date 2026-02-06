import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import OTP from '@/models/OTP';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { sendOTPEmail } from '@/utils/emailService';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Handle OTP generation
    if (data.type === 'send-otp') {
      const otp = generateOTP();
      
      // Delete any existing OTP for this email
      await OTP.deleteOne({ email: data.email });
      
      // Store new OTP in MongoDB
      const newOtp = new OTP({
        email: data.email,
        otp: otp
      });
      await newOtp.save();

      // Send OTP via email
      const emailSent = await sendOTPEmail(data.email, otp);
      if (!emailSent) {
        console.error('Failed to send OTP email');
        return NextResponse.json({ message: 'Failed to send OTP email' }, { status: 500 });
      }

      console.log('OTP sent successfully');
      return NextResponse.json({ message: 'OTP sent successfully' });
    }

    // Handle registration with OTP verification
    const { email, password, otp } = data;
    
    // Verify OTP from MongoDB
    const storedOTPData = await OTP.findOne({ email });
    
    if (!storedOTPData || storedOTPData.otp !== otp) {
      console.error('Invalid or expired OTP');
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Delete the used OTP
    await OTP.deleteOne({ email });

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('Email already registered');
      return NextResponse.json({ message: 'Email already registered' }, { status: 409 });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    // Set session cookie
    const cookie = serialize('session', JSON.stringify({ 
      email: newUser.email, 
      role: newUser.role 
    }), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    const response = NextResponse.json({ 
      message: 'Registration successful', 
      user: { email: newUser.email, role: newUser.role } 
    });
    response.headers.append('Set-Cookie', cookie);

    console.log('Registration successful');
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error during registration', error: error.message }, 
      { status: 500 }
    );
  }
}

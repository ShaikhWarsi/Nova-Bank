import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { sendPasswordResetEmail } from '@/utils/emailService';

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Save token to database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send reset email
    const emailSent = await sendPasswordResetEmail(email, resetToken);
    
    if (emailSent) {
      return NextResponse.json(
        { message: 'Password reset email sent' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Error sending email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

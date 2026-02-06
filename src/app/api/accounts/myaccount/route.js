import { NextResponse } from 'next/server';

export async function GET() {
  // Handle GET request
  return NextResponse.json({ account: 'myaccount', balance: 2450.00 });
}

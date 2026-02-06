import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    transactions: [
      { id: 1, amount: 100.00, date: '2025-02-10', type: 'deposit' },
      { id: 2, amount: 50.00, date: '2025-02-11', type: 'withdrawal' }
    ] 
  });
}

import { NextResponse } from 'next/server';
import dbConnect from "@/utils/dbConnect";
import Account from "@/models/Account";

export async function POST(req) {
  try {
    await dbConnect();
    const { userId } = await req.json();

    const account = await Account.findOne({ userId });
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json({ balance: account.balance, transactions: account.transactions });
  } catch (error) {
    console.error("Error in getBalance:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

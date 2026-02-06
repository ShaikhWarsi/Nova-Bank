import { NextResponse } from 'next/server';
class Account {
  constructor(userId) {
    this.userId = userId;
    this.balance = 1000; // Default balance
  }
  deposit(amount) {
    this.balance += amount;
  }
  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
  transfer(amount, recipient) {
    if (this.withdraw(amount)) {
      recipient.deposit(amount);
      return true;
    }
    return false;
  }
}

// Temporary in-memory storage (In a real app, use a database)
let usersAccounts = {}; 

export async function POST(req) {
  try {
    const { userId, action, amount, recipientId } = await req.json();

    if (!usersAccounts[userId]) {
      usersAccounts[userId] = new Account(userId);
    }

    const userAccount = usersAccounts[userId];
    const numAmount = parseFloat(amount);

    switch (action) {
      case "deposit":
        userAccount.deposit(numAmount);
        return NextResponse.json({ message: "Deposit Successful", balance: userAccount.balance });

      case "withdraw":
        if (userAccount.withdraw(numAmount)) {
          return NextResponse.json({ message: "Withdrawal Successful", balance: userAccount.balance });
        }
        return NextResponse.json({ message: "Insufficient Funds" }, { status: 400 });

      case "transfer":
        if (!usersAccounts[recipientId]) {
          // For demo purposes, create the recipient if they don't exist
          usersAccounts[recipientId] = new Account(recipientId);
        }

        if (userAccount.transfer(numAmount, usersAccounts[recipientId])) {
          return NextResponse.json({ message: "Transfer Successful", balance: userAccount.balance });
        }
        return NextResponse.json({ message: "Transfer Failed. Insufficient Funds" }, { status: 400 });

      default:
        return NextResponse.json({ message: "Invalid Action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in transactions route:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

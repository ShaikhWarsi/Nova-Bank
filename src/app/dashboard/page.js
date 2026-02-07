import { cookies } from 'next/headers';
import dbConnect from '@/utils/dbConnect';
import Account from '@/models/Account';
import DashboardOverview from '@/components/Dashboard/Overview';

async function getDashboardData() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) {
    return null;
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    await dbConnect();
    
    // In a real app, we would find by userId. 
    // For now, we'll find by email or just return a default account for demo purposes
    // since the session only has email.
    let account = await Account.findOne({ email: session.email });
    
    if (!account) {
      // Create a default account for demo if it doesn't exist
      account = {
        balance: 2450.00,
        transactions: [
          { type: 'deposit', amount: 500, date: new Date() },
          { type: 'withdraw', amount: 200, date: new Date() },
          { type: 'transfer', amount: 300, date: new Date() },
        ]
      };
    }

    return {
      account: { balance: account.balance },
      transactions: account.transactions || []
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    // Ideally redirect to login
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold dark:text-white mb-2">Session Expired</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Please log in to view your dashboard.</p>
          <a href="/login" className="text-[#FD5339] font-medium hover:underline">Go to Login</a>
        </div>
      </div>
    );
  }

  return <DashboardOverview account={data.account} transactions={data.transactions} />;
}

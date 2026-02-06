"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  ClockIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';
import { useTheme } from 'next-themes';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountRes, transactionsRes] = await Promise.all([
          axios.get('/api/accounts/myaccount'),
          axios.get('/api/transactions/recent')
        ]);
        setAccount(accountRes.data);
        setTransactions(transactionsRes.data.transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const financialStats = transactions.reduce((acc, transaction) => {
    acc[transaction.type] = (acc[transaction.type] || 0) + transaction.amount;
    return acc;
  }, {});

  const isDark = theme === 'dark';

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: isDark ? '#A1A1AA' : '#4B5563',
        },
      },
      title: {
        display: true,
        text: 'Financial Overview',
        color: isDark ? '#EDEDED' : '#171717',
      },
      tooltip: {
        backgroundColor: isDark ? '#1A1A1A' : '#FFFFFF',
        titleColor: isDark ? '#EDEDED' : '#171717',
        bodyColor: isDark ? '#A1A1AA' : '#4B5563',
        borderColor: isDark ? '#262626' : '#E5E7EB',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? '#262626' : '#F3F4F6',
        },
        ticks: {
          color: isDark ? '#A1A1AA' : '#4B5563',
        },
      },
      y: {
        grid: {
          color: isDark ? '#262626' : '#F3F4F6',
        },
        ticks: {
          color: isDark ? '#A1A1AA' : '#4B5563',
        },
      },
    },
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Income',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        backgroundColor: '#FD5339',
        borderRadius: 6,
      },
      {
        label: 'Expenses',
        data: [2000, 3000, 2000, 5000, 1000, 4000, 3000],
        backgroundColor: isDark ? '#262626' : '#E5E7EB',
        borderRadius: 6,
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="animate-pulse p-6 space-y-6 bg-white dark:bg-black min-h-screen transition-colors duration-300">
        <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
          ))}
        </div>
        <div className="h-96 bg-gray-200 dark:bg-zinc-800 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border dark:border-gray-800 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
              <p className="text-3xl font-bold dark:text-white">${account?.balance?.toLocaleString()}</p>
            </div>
            <CurrencyDollarIcon className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border dark:border-gray-800 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Income</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-500">
                +${financialStats.deposit?.toLocaleString() || 0}
              </p>
            </div>
            <ArrowUpIcon className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border dark:border-gray-800 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Expenses</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-500">
                -${financialStats.withdrawal?.toLocaleString() || 0}
              </p>
            </div>
            <ArrowDownIcon className="h-12 w-12 text-red-500" />
          </div>
        </div>
      </div>

      {/* Financial Overview Tabs */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm mb-8 border dark:border-gray-800 transition-colors">
        <div className="border-b border-gray-200 dark:border-gray-800">
          <nav className="flex space-x-8 px-6">
            {['overview', 'transactions', 'analytics', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-[#FD5339] text-[#FD5339]'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="h-96">
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
          {activeTab === 'transactions' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{t.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{t.type}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${t.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                        ${t.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

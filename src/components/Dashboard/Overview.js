"use client";

import { useState } from 'react';
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
import { useTheme } from 'next-themes';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardOverview({ account, transactions }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const isDark = theme === 'dark';

  const financialStats = transactions.reduce((acc, transaction) => {
    acc[transaction.type] = (acc[transaction.type] || 0) + transaction.amount;
    return acc;
  }, {});

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
        data: [2500, 3200, 2800, 4100, 3800, 4500, 5200],
        backgroundColor: '#10B981',
        borderRadius: 6,
      },
      {
        label: 'Expenses',
        data: [1800, 2400, 2100, 2900, 2600, 3100, 3400],
        backgroundColor: '#EF4444',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b dark:border-gray-800">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === 'overview'
              ? 'border-b-2 border-[#FD5339] text-[#FD5339]'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === 'transactions'
              ? 'border-b-2 border-[#FD5339] text-[#FD5339]'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
          }`}
        >
          Transactions
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CurrencyDollarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  +2.5%
                </span>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Balance</h3>
              <p className="text-2xl font-bold dark:text-white mt-1">${account?.balance?.toLocaleString() || '0.00'}</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <ArrowUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Monthly Income</h3>
              <p className="text-2xl font-bold dark:text-white mt-1">${financialStats.deposit?.toLocaleString() || '0.00'}</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <ArrowDownIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Monthly Expenses</h3>
              <p className="text-2xl font-bold dark:text-white mt-1">${(financialStats.withdraw + financialStats.transfer)?.toLocaleString() || '0.00'}</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <CreditCardIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Cards</h3>
              <p className="text-2xl font-bold dark:text-white mt-1">2</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border dark:border-gray-800">
            <div className="h-[400px]">
              <Bar options={chartOptions} data={chartData} />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border dark:border-gray-800 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b dark:border-gray-800">
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Transaction</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-800">
              {transactions.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${
                        tx.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/30' : 
                        tx.type === 'withdraw' ? 'bg-red-100 dark:bg-red-900/30' : 
                        'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        {tx.type === 'deposit' ? <ArrowUpIcon className="h-4 w-4 text-green-600" /> :
                         tx.type === 'withdraw' ? <ArrowDownIcon className="h-4 w-4 text-red-600" /> :
                         <ClockIcon className="h-4 w-4 text-blue-600" />}
                      </div>
                      <span className="font-medium dark:text-white capitalize">{tx.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 capitalize">{tx.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${
                    tx.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.type === 'deposit' ? '+' : '-'}${tx.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

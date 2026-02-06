"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  CurrencyDollarIcon,
  DocumentArrowUpIcon,
  ArrowRightIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [paperMoneyBalance] = useState(5000); // Mock balance

  const handleNavigation = (path) => {
    router.push(`/dashboard/${path}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-zinc-900 shadow-sm transition-colors duration-300 border-b dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <h1 className="text-3xl font-bold text-[#FD5339] px-3 cursor-pointer">NOVA</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <button
              onClick={() => handleNavigation('transfer')}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors hidden sm:flex"
            >
              <ArrowRightIcon className="h-5 w-5 mr-2" />
              Transfer
            </button>
            <button
              onClick={() => handleNavigation('deposit')}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors hidden sm:flex"
            >
              <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
              Deposit
            </button>
            <button
              onClick={() => handleNavigation('withdraw')}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors hidden sm:flex"
            >
              <ArrowDownIcon className="h-5 w-5 mr-2" />
              Withdraw
            </button>
            <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg transition-colors">
              <CurrencyDollarIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-500 mr-2" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">Paper: ${paperMoneyBalance}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main>
        {children}
      </main>
    </div>
  );
}

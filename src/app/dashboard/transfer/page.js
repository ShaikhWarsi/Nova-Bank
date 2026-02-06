"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

export default function TransferPage({ params }) {
  const [amount, setAmount] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // In a real app, we'd get this from context or a session
  const userId = "user123"; 

  const handleTransfer = async () => {
    if (!amount || !recipientId) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/transactions', { userId, action: 'transfer', amount, recipientId });
      setMessage(response.data.message);
      toast.success(response.data.message);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Transfer failed');
      toast.error(error.response?.data?.message || 'Transfer failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100-72px)] bg-gray-100 dark:bg-black flex items-center justify-center py-12 px-4 transition-colors duration-300">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md transition-colors duration-300 border dark:border-gray-800">
        <div className="mb-6 flex justify-center">
          <Link href="/dashboard" className="text-2xl font-extrabold text-[#FD5339] flex items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} /> NOVA
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Transfer Funds</h2>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="recipientId">
            Recipient ID
          </label>
          <input
            type="text"
            id="recipientId"
            placeholder="Recipient ID"
            value={recipientId}
            onChange={(e) => setRecipientId(e.target.value)}
            className="shadow appearance-none border dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-zinc-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#FD5339] transition-all"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="amount">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="shadow appearance-none border dark:border-gray-700 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 dark:bg-zinc-800 leading-tight focus:outline-none focus:ring-2 focus:ring-[#FD5339] transition-all"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleTransfer}
            disabled={isLoading}
            className={`w-full bg-[#FD5339] hover:bg-[#d15542] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processing...' : 'Transfer'}
          </button>
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}

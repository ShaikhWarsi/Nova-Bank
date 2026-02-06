"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        toast.success("Password reset successful!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Password reset failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center items-center transition-colors duration-300">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-md w-full mx-4 bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 transition-colors duration-300">
        <div className="mb-6">
          <Link href="/" className="text-2xl font-extrabold text-[#FD5339] flex items-center">
            <img src="/logo.png" alt="Logo" width={40} /> NOVA
          </Link>
        </div>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-[#FD5339] transition-all"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white mb-6 focus:outline-none focus:ring-2 focus:ring-[#FD5339] transition-all"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#FD5339] text-white py-2 rounded-lg font-semibold hover:bg-[#d15542] transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordPage;

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import { ThemeToggle } from "@/components/ThemeToggle";

function RegisterPage() {
  const { setIsLoggedIn } = useAuth() || {}; 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!setIsLoggedIn) {
      console.warn("Auth context is not available.");
    }
  }, [setIsLoggedIn]);

  const handleSendOTP = async () => {
    try {
      setIsOtpLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          type: 'send-otp',
          email 
        }),
      });

      if (response.ok) {
        setOtpSent(true);
        toast.success("OTP sent to your email!");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error sending OTP");
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setIsSignupLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, otp }),
      });

      if (response.ok) {
        toast.success("Registration successful! Redirecting...");
        setIsLoggedIn(true);
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        if (errorData.message === "Email already registered") {
          toast.error("Email already registered! Please log in.");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error('Catch error:', error);
      toast.error("An error occurred during signup. Please try again.");
    } finally {
      setIsSignupLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 flex justify-center transition-colors duration-300">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-screen-xl m-0 sm:m-6 bg-white dark:bg-zinc-900 shadow sm:rounded-lg flex items-center justify-center flex-1 transition-colors duration-300">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-8">
          <div>
            <Link
              href="/"
              className="text-2xl font-extrabold text-[#FD5339] flex items-center"
            >
              <Image src="/logo.png" alt="Logo" width={40} height={40} /> NOVA
            </Link>
          </div>

          <div className="flex flex-col items-center h-full">
            <div className="w-full flex-1 justify-center items-center mt-4">
              <div className="mx-auto mt-8">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-zinc-700 dark:text-white transition-all"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative mt-5">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-zinc-700 dark:text-white transition-all"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>

                {!otpSent ? (
                  <button
                    className="mt-5 tracking-wide font-semibold bg-[#FD5339] text-white w-full py-4 rounded-lg hover:bg-[#d1513d] flex items-center justify-center transition-all"
                    onClick={handleSendOTP}
                    disabled={isOtpLoading}
                  >
                    {isOtpLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                ) : (
                  <>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:bg-white dark:focus:bg-zinc-700 dark:text-white mt-5 transition-all"
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                      className="mt-5 tracking-wide font-semibold bg-[#FD5339] text-white w-full py-4 rounded-lg hover:bg-[#d1513d] flex items-center justify-center transition-all"
                      onClick={handleSignup}
                      disabled={isSignupLoading}
                    >
                      {isSignupLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        "Verify & Sign Up"
                      )}
                    </button>
                  </>
                )}

                <p className="mt-6 text-xs text-gray-600 dark:text-gray-400 text-center">
                  I agree to abide by Nova&lsquo;s{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href="#" className="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                  .
                </p>

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-[#FD5339] hover:text-[#d15542] font-semibold"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 h-full bg-gray-200 dark:bg-zinc-800 text-center hidden lg:flex transition-colors duration-300">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat dark:opacity-80"
            style={{ backgroundImage: "url('/Signup.png')" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

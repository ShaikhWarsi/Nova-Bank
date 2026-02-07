"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import CustomChatbot from "./Chatbot";

function HeroSection() {
  const router = useRouter();
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const handleGetStarted = () => {
    router.push("/register");
  };

  const handleLiveChat = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated Decorative Blobs */}
      <motion.div
        className="absolute top-[-80px] left-[-80px] w-40 h-40 bg-[#FD5339] rounded-full opacity-30 filter blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-80px] right-[-80px] w-56 h-56 bg-[#FF7F50] rounded-full opacity-30 filter blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="pb-28 px-20 max-sm:px-4 flex flex-col lg:flex-row gap-10 mt-10 pt-[80px] relative z-10">
        {/* Left Column: Content & CTAs */}
        <div className="w-full lg:w-[30%] relative px-4">
          <div
            className="text-[40px] lg:text-[55px] text-center sm:text-left leading-none absolute max-sm:relative w-full lg:w-[600px] z-20 
              bg-clip-text text-transparent bg-gradient-to-r from-[#FD5339] to-[#FF7F50] font-extrabold drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(253,83,57,0.3)]"
          >
            ALL YOUR BUSINESS BANKING IN ONE PLATFORM
          </div>
          <div className="h-32 max-sm:h-0"></div>
          <div className="pt-20 max-sm:pt-10 max-sm:text-center pb-10 text-gray-500 dark:text-gray-400 text-sm lg:text-base">
            Take your business to new heights with faster cash flow and clear
            financial insights—all with a free Novo account. Apply in 10 minutes.
          </div>
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-2 max-sm:m-auto border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 items-center text-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-zinc-800 dark:text-white"
              onClick={handleGetStarted}
            >
              <img src="/Arrow.png" alt="Arrow" className="w-8 dark:invert" />
              <div>Get Started</div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-3 text-black dark:text-white rounded-full px-8 py-2 items-center mt-4 border border-gray-300 dark:border-gray-700 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-zinc-800"
              onClick={handleLiveChat}
            >
              <img src="/Arrow.png" alt="Chat" className="w-7 dark:invert" />
              <div>Live Chat</div>
            </motion.button>
          </div>
          <div className="py-8 max-sm:text-center dark:text-gray-300">
            Already Started?{" "}
            <span className="text-[#FD5339] font-semibold cursor-pointer hover:underline">
              Finish Application
            </span>
          </div>
        </div>

        {/* Middle Column: Hero Image & Info Cards */}
        <div className="w-full lg:w-[60%] flex justify-end rounded-3xl relative h-[300px] lg:h-[500px]">
          <img
            src="/heroSection_Image1.png"
            alt="HeroImage"
            className="w-full h-full object-cover rounded-3xl shadow-2xl dark:opacity-80"
          />
          <motion.div
            className="bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl px-4 py-2 absolute top-24 left-8 lg:top-52 lg:left-32 flex gap-2 items-center justify-center shadow-lg"
            variants={fadeInFromLeft}
            initial="hidden"
            animate="visible"
          >
            <img src="/dollar.png" alt="Dollar" className="h-8 lg:h-10" />
            <div>
              <div className="text-white font-medium">Nova Balance</div>
              <div className="text-white/80 text-xs">$17,500</div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white/10 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl px-4 py-2 absolute top-40 right-5 lg:top-72 lg:right-10 flex gap-2 items-center justify-center shadow-lg"
            variants={fadeInFromRight}
            initial="hidden"
            animate="visible"
          >
            <img src="/tick.png" alt="Tick" className="h-8 lg:h-10" />
            <div>
              <div className="text-white font-medium">Invoice Paid</div>
              <div className="text-white/80 text-xs">$900</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Secondary Image & Feature Card */}
        <div className="w-full lg:w-[30%] px-4">
          <img
            src="/heroSection_Image2.png"
            alt="HeroImage"
            className="rounded-2xl w-full h-auto shadow-xl dark:opacity-80"
          />
          <div className="mt-8 flex items-center gap-4">
            <img src="/Arrow.png" alt="HeroImage" className="h-16 lg:h-20 dark:invert" />
            <div>
              <div className="font-bold text-lg lg:text-xl dark:text-white">
                Instant card control
              </div>
              <div className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                Monitor all your purchases in one place, and freeze or unfreeze
                your card in just a few taps.
              </div>
            </div>
          </div>
        </div>
      </div>
      {isChatbotVisible && <CustomChatbot toggleChatbot={handleLiveChat} />}

      {/* Animated Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          className="w-8 h-8 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </motion.div>
    </div>
  );
}

export default HeroSection;

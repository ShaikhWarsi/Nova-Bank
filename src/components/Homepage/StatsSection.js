"use client";
import React from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

function StatsSection() {
  return (
    <motion.div
      id="result-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col lg:flex-row px-10 lg:px-20 justify-center items-center my-20 gap-10 overflow-hidden"
    >
      {/* Animated Background Element */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-[#FD5339] rounded-full opacity-20 filter blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <Image
        src="/StatsSection_Image1.png"
        alt="Stats Visual"
        width={600}
        height={400}
        className="w-full lg:w-1/2 object-contain relative z-10"
      />

      <div className="py-10 max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#FD5339] px-5 text-white rounded-full max-sm:m-auto py-2 text-center w-52"
        >
          OUR CUSTOMERS
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl my-6 max-sm:text-center font-bold dark:text-white"
        >
          FOR GROWING TEAMS AND THE SELF-EMPLOYED ALIKE
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm w-64 max-sm:text-center">
            Whether you&apos;re just getting started or employ an established team,
            Novo can help you get your business&apos;s finances in order. Here&apos;s how
            small business customers have found success using Novo&apos;s powerful
            digital banking tools.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex gap-2 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2 items-center text-lg transition-all duration-200 dark:text-white"
          >
            <Image src="/Arrow.png" alt="Arrow" width={24} height={24} className="dark:invert" />
            <span>Learn More</span>
          </motion.button>
        </div>

        <div className="mt-8">
          <Image src="/StatsSection_Image2.png" alt="Stats Graph" width={600} height={300} className="w-full dark:invert" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-[#e9e9e9] dark:bg-zinc-900 py-6 rounded-b-xl flex flex-wrap justify-around items-center gap-6 dark:text-white"
          >
            <StatItem value={200000} label="CUSTOMERS" post={"+"} />
            <StatItem value={0} label="MONTHLY FEE" pre={"$"} />
            <StatItem
              value={500000000}
              label="FASTER PAYMENTS"
              pre={"$"}
              post={"+"}
            />
            <StatItem value={4.9} label="APP RATING" />
          </motion.div>
        </div>

        {/* New Call-to-Action Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-[#FD5339] to-[#FF7F50] rounded-xl p-6 text-white text-center shadow-xl"
        >
          <div className="text-2xl font-bold mb-4">
            Join Thousands of Happy Customers
          </div>
          <div className="mb-4 text-sm">
            Experience the simplicity and power of Novo&apos;s digital banking today.
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-white rounded-full px-6 py-2 text-lg"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

const StatItem = ({ value, label, pre, post }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div className="text-center" ref={ref}>
      <div className="text-3xl font-semibold">
        {inView && (
          <div>
            {pre}
            <CountUp
              end={value}
              duration={2.5}
              formattingFn={(num) => formatNumber(num)}
              preserveValue={true}
            />
            {post}
          </div>
        )}
      </div>
      <div className="text-xs">{label}</div>
    </div>
  );
};

const formatNumber = (num) => {
  if (num >= 1_000_000) return Math.round(num / 1_000_000) + "M";
  if (num >= 1_000) return Math.round(num / 1_000) + "K";
  return num.toString();
};

export default StatsSection;

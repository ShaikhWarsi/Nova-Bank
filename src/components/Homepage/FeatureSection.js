"use client";
import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { MdLock } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";
import { FaCreditCard } from "react-icons/fa";

// Original feature list
const features = [
  {
    title: "Access Your Card at any time",
    description:
      "Every Nova checking account comes with a free physical debit card and virtual debit, so you always have access at your fingertips.",
  },
  {
    title: "Make Your Money Work for You",
    description:
      "Invest your money efficiently with Nova&apos;s automated savings features.",
  },
  {
    title: "Pay and get paid your way",
    description:
      "Send and receive payments seamlessly with no hidden fees.",
  },
  {
    title: "Free from hidden fees",
    description:
      "With Nova, enjoy transparent banking without worrying about hidden charges.",
  },
];

// New testimonial data for carousel section
const testimonials = [
  {
    quote:
      "Nova transformed the way I manage my business finances. The interface is both beautiful and intuitive!",
    author: "Alex D.",
    role: "Entrepreneur",
  },
  {
    quote:
      "The security and ease of use have made Nova my go-to banking solution. I highly recommend it!",
    author: "Maria S.",
    role: "Freelancer",
  },
  {
    quote:
      "A seamless experience from sign-up to everyday banking. Nova&rsquo;s features are exactly what I needed.",
    author: "John K.",
    role: "Small Business Owner",
  },
];

// A simple testimonial slider component using Framer Motion
function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const testimonialCount = testimonials.length;

  const nextTestimonial = React.useCallback(() =>
    setCurrent((prev) => (prev + 1) % testimonialCount), [testimonialCount]);

  const prevTestimonial = () =>
    setCurrent((prev) => (prev - 1 + testimonialCount) % testimonialCount);

  React.useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-zinc-900 rounded-xl p-8 shadow-lg border dark:border-gray-800 min-h-[200px] flex flex-col justify-center"
        >
          <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
            &quot;{testimonials[current].quote}&quot;
          </p>
          <div className="text-right">
            <p className="font-bold text-gray-900 dark:text-white">
              {testimonials[current].author}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {testimonials[current].role}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevTestimonial}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Prev
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextTestimonial}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}

function FeatureSection() {
  const [expanded, setExpanded] = useState(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.5 });
  const isLeftInView = useInView(leftRef, { once: true, threshold: 0.5 });
  const isRightInView = useInView(rightRef, { once: true, threshold: 0.5 });

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div id="resources-section" className="relative overflow-hidden">
      {/* Animated decorative blob in the background */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-[#FD5339] rounded-full filter blur-3xl opacity-30"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pb-20 px-20 max-sm:px-4 flex flex-col lg:flex-row gap-10 max-sm:mt-20 lg:px-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Section - Enhanced Hero with overlay */}
        <motion.div
          ref={leftRef}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: isLeftInView ? 1 : 0, x: isLeftInView ? 0 : -50 }}
          transition={{ duration: 0.5 }}
          className="h-[450px] relative w-[40%] max-sm:w-full flex gap-2 bg-white dark:bg-zinc-900 rounded-xl p-10 shadow-lg overflow-hidden border dark:border-gray-800"
        >
          {/* Background overlay pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent dark:from-zinc-800 dark:to-transparent opacity-20"></div>
          <div className="w-64 relative z-10">
            <div className="h-40"></div>
            <div className="text-4xl font-bold dark:text-white">
              ONLINE BANKING THAT TAKES YOUR BUSINESS TO THE{" "}
              <span className="text-[#FD5339]">NEXT LEVEL</span>
            </div>
            <div className="text-sm text-gray-400 dark:text-gray-500 mt-6">
              Monitor all your purchases in one place, and freeze or unfreeze
              your cards in a few taps.
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-2 bg-[#FD5339] text-white rounded-full shadow-md"
            >
              Learn More
            </motion.button>
          </div>
          <div className="flex items-end z-10">
            <Image
              src="/FeatureSection_Image1.png"
              alt="Feature showcasing online banking"
              width={208}
              height={150}
              className="rounded-xl w-52 max-sm:hidden"
            />
          </div>
        </motion.div>

        {/* Right Section - Accordion & Benefits with Tab-like Header */}
        <motion.div
          ref={rightRef}
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: isRightInView ? 1 : 0,
            x: isRightInView ? 0 : 50,
          }}
          transition={{ duration: 0.5 }}
          className="w-full lg:w-[55%] bg-[#F6F6F6] dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden border dark:border-gray-800 transition-colors duration-300"
        >
          <div className="flex text-lg">
            <div className="bg-white dark:bg-zinc-800 py-4 px-8 rounded-tl-xl flex justify-center border-r border-b dark:border-gray-700">
              <div className="bg-[#FD5339] px-4 h-8 flex items-center rounded-full text-white font-bold text-sm">
                BENEFITS
              </div>
            </div>
            <div className="bg-[#F6F6F6] dark:bg-zinc-900 flex flex-wrap max-sm:gap-1 gap-4 w-full px-4 rounded-tr-xl border-b dark:border-gray-800">
              {["Invoice", "Integration", "Partner Perks", "Nova Boost"].map(
                (item) => (
                  <div key={item} className="py-2">
                    <div className="bg-[#E5E4E4] dark:bg-zinc-800 dark:text-gray-300 px-4 py-1 rounded-full text-sm font-medium border dark:border-gray-700">
                      {item}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-[#FD5339] w-2 h-2 rounded-full"></div>
                    <h3 className="text-xl font-bold dark:text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white dark:bg-zinc-800 rounded-xl border dark:border-gray-700 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <RiShieldCheckFill className="text-2xl text-[#FD5339]" />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white">Security First</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Your data is always encrypted</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 w-full p-8 rounded-b-xl space-y-6">
            {features.map((feature, index) => (
              <div key={index}>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <motion.h3
                    className={`text-xl font-medium ${
                      expanded === index ? "text-[#FD5339]" : "text-black dark:text-white"
                    }`}
                  >
                    {feature.title}
                  </motion.h3>
                  <FontAwesomeIcon
                    icon={expanded === index ? faChevronUp : faChevronDown}
                    className="text-gray-500 w-4"
                  />
                </div>

                <AnimatePresence>
                  {expanded === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 w-96">
                        {feature.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <hr className="border-2 border-gray-300 dark:border-zinc-700 mt-4" />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Additional Info Section with Security/FDIC details */}
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-zinc-900 rounded-xl p-8 md:p-14 w-full mx-auto shadow-xl border dark:border-gray-800"
      >
        <div className="flex flex-col md:flex-row md:justify-around gap-8">
          <div className="text-center md:text-left flex items-center justify-center md:justify-start">
            <div>
              <div className="flex gap-2 text-2xl items-center dark:text-white">
                <RiShieldCheckFill className="text-[#FD5339] text-3xl" />
                <span>FDIC insured</span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
                Your deposits are insured for up to $250,000 through our
                partner bank, Middlesex Federal Savings.
              </div>
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="flex gap-2 text-2xl items-center dark:text-white">
              <MdLock className="text-[#FD5339] text-3xl" />
              <span>Powerful security</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto md:mx-0">
              Our bank-grade encryption ensures that your information remains
              safe and secure at all times.
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="flex gap-2 text-2xl items-center dark:text-white">
              <FaCreditCard className="text-[#FD5339] text-3xl" />
              <span>Instant card controls</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto md:mx-0">
              Freeze or unfreeze your cards anytime with just a few taps
              through our mobile app.
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center mt-10">
          <Image
            src="/FeatureSection_Image2.png"
            alt="Feature Image 2"
            width={300}
            height={256}
            className="h-48 sm:h-64 object-contain"
          />
          <Image
            src="/FeatureSection_Image3.png"
            alt="Feature Image 3"
            width={300}
            height={256}
            className="h-48 sm:h-64 object-contain max-sm:hidden"
          />
        </div>
      </motion.div>

      {/* New Call-to-Action (CTA) Card */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-[#FD5339] to-[#FF7F50] rounded-xl p-10 max-w-3xl mx-auto shadow-2xl text-white flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to elevate your banking experience?
        </h2>
        <p className="mb-6 text-center">
          Join thousands of savvy business owners who trust Nova for secure,
          seamless, and innovative banking.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white text-[#FD5339] rounded-full font-semibold"
        >
          Get Started Today
        </motion.button>
      </motion.div>

      {/* New Testimonials Carousel Section */}
      <TestimonialSlider />
    </div>
  );
}

export default FeatureSection;

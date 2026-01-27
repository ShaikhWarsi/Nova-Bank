"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function SolutionSection() {
  const router = useRouter();
  const handleGetStarted = () => {
    console.log("Get Started");
    router.push("/register");
  };

  const cards = [
    {
      title: "INVOICE",
      description:
        "Create and send an unlimited number of fully customizable invoices directly from your account.",
      image: "/SolutionSection_Image1.png",
    },
    {
      title: "INTEGRATIONS",
      description:
        "From Stripe to Shopify, integrate with multiple apps to manage everything from one place.",
      image: "/SolutionSection_Image2.png",
    },
    {
      title: "PARTNER PERKS",
      description:
        "Save thousands on tools like Gusto and Hubspot with exclusive perks.",
      image: "/SolutionSection_Image1.png",
    },
    {
      title: "SUPPORT",
      description:
        "Our support team is available 24/7 to assist with any inquiries.",
      image: "/SolutionSection_Image2.png",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      id="solution-section"
      className="relative my-8 px-4 sm:px-8 py-16 bg-white dark:bg-black overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-[#FD5339] rounded-full opacity-20 filter blur-2xl"
        animate={{ scale: [1, 1.3, 1], rotate: [0, 360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-[#FF7F50] rounded-full opacity-20 filter blur-2xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, -360, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 flex flex-col sm:flex-row justify-between items-center"
      >
        <div className="text-2xl sm:text-3xl text-center sm:text-left font-bold dark:text-white">
          <div>OUR SOLUTION MAKES IT EASIER</div>
          <div>FOR YOU IN ALL TRANSACTIONS</div>
        </div>
        <div className="flex gap-4 items-center mt-4 sm:mt-0">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="swiper-button-prev-custom text-black dark:text-white bg-gray-200 dark:bg-gray-800 rounded-full px-4 py-1 cursor-pointer text-2xl"
          />
          <FontAwesomeIcon
            icon={faArrowRight}
            className="swiper-button-next-custom bg-[#FD5339] text-white rounded-full px-4 py-1 cursor-pointer text-2xl"
          />
        </div>
      </motion.div>

      {/* Swiper Carousel */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-8 h-80 rounded-xl transition-all duration-300 flex flex-col justify-between ${
                index === activeIndex
                  ? "bg-[#FD5339] text-white shadow-xl"
                  : "bg-gray-200 dark:bg-zinc-900 text-gray-800 dark:text-gray-200"
              }`}
            >
              <div>
                <div
                  className={`border rounded-full text-center px-3 py-2 w-40 mx-auto ${
                    index === activeIndex
                      ? "border-white text-white"
                      : "border-gray-500 dark:border-gray-700 text-gray-700 dark:text-gray-400"
                  }`}
                >
                  {card.title}
                </div>
                <div className="text-2xl my-4 text-center font-semibold">
                  {card.title}
                </div>
                <div
                  className={`text-xs text-center ${
                    index === activeIndex ? "text-gray-200" : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {card.description}
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={200}
                  height={112}
                  className="mt-4 rounded-xl max-h-28 object-contain dark:invert"
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CTA Banner Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col sm:flex-row justify-around my-20 gap-8 items-center"
      >
        <div className="text-2xl sm:text-3xl text-center sm:text-left w-full sm:w-96 font-bold dark:text-white">
          ALL IN ONE MONEY MANAGEMENT
        </div>
        <div className="max-w-xl text-gray-400 dark:text-gray-500 text-center sm:text-left">
          Running a business is complicated enough. Your banking solution should
          be simple—and help simplify. Spend less time managing your finances and
          more time running your business with Novo.
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGetStarted}
          className="flex gap-2 max-sm:m-auto border border-gray-300 dark:border-gray-700 rounded-full px-4 py-1 items-center text-lg transition-all duration-200 dark:text-white"
        >
          <Image src="/Arrow.png" alt="Arrow" width={32} height={32} className="dark:invert" />
          <div>Get Started</div>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default SolutionSection;

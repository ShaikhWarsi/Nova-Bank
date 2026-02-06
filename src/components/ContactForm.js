"use client";

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Your message has been submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-zinc-900 p-4 sm:p-6 lg:p-8 pt-24 sm:pt-28 lg:pt-32 transition-colors duration-300">
      <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg transition-colors duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FD5339] text-sm sm:text-base transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FD5339] text-sm sm:text-base transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-gray-600 dark:text-gray-400 font-medium text-sm sm:text-base">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter your message"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FD5339] text-sm sm:text-base resize-none transition-all"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FD5339] text-white py-2 sm:py-3 px-4 rounded-md hover:bg-[#be4937] transition font-medium text-sm sm:text-base"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

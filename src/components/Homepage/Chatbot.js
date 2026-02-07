"use client";
import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

const CustomChatbot = ({ toggleChatbot }) => {
  if (!toggleChatbot) {
    return null; // Don't render if toggle function is missing to avoid crashes
  }
  return (
    <div className="fixed bottom-8 left-8 z-50 bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden border dark:border-gray-800 transition-colors">
      <div className="flex justify-end p-2 bg-white dark:bg-zinc-900 border-b dark:border-gray-800">
        <button onClick={toggleChatbot} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </div>
  );
};

export default CustomChatbot;
'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  title: string;
  description: string;
}

const Loading: React.FC<LoadingProps> = ({ title, description }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 p-6">
    <div className="flex flex-col items-center bg-white shadow-xl rounded-2xl p-8 max-w-sm w-full animate-fadeIn">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-spin border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 animate-spin-slow" />
        </div>
      </div>
      <h2 className="mt-6 text-xl sm:text-2xl font-semibold text-gray-700 text-center">
        {title}
      </h2>
      <p className="mt-2 text-sm sm:text-base text-gray-500 text-center italic">
        {description}
      </p>
      <div className="flex mt-6 space-x-2">
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></span>
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
      </div>
    </div>
  </div>
);

export default Loading; 
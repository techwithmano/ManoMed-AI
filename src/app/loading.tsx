'use client';

import { FaHeartbeat } from 'react-icons/fa';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <FaHeartbeat className="text-blue-600 text-6xl mb-4 animate-pulse mx-auto" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Processing Your Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we prepare your analysis...
        </p>
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage; 
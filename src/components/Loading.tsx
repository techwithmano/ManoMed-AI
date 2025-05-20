'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingProps {
  title: string;
  description: string;
}

const Loading: React.FC<LoadingProps> = ({ title, description }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-gradient-to-b from-background to-secondary/10">
    <div className="text-center space-y-6 max-w-md mx-auto">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 text-primary animate-spin" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary animate-pulse">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex justify-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"></div>
      </div>
    </div>
  </div>
);

export default Loading; 
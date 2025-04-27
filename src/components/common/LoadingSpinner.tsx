// src/components/common/LoadingSpinner.tsx
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] bg-black">
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-30 blur-xl"></div>

        {/* Spinner animation */}
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin relative z-10"></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <p className="ml-4 text-lg text-white">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;

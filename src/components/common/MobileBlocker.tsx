import React, { useState, useEffect } from "react";

interface MobileBlockerProps {
  toolName: string;
}

const MobileBlocker: React.FC<MobileBlockerProps> = ({ toolName }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkIfMobile();

    // Add listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center p-6 text-center">
      <svg
        className="w-16 h-16 mb-4 text-yellow-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        ></path>
      </svg>
      <h2 className="text-2xl font-bold mb-3 text-white">
        Mobile Device Detected
      </h2>
      <p className="text-lg mb-4 text-gray-300">
        The {toolName} requires a larger screen to work properly.
      </p>
      <p className="text-md mb-6 text-gray-400">
        Please access this tool from a desktop or tablet device for the best
        experience.
      </p>
      <a
        href="/tools"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
      >
        Return to Tools
      </a>
    </div>
  );
};

export default MobileBlocker;

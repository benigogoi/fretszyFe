import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface MobileBlockerProps {
  toolName: string;
}

const MobileBlocker: React.FC<MobileBlockerProps> = ({ toolName }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Ensure the component only runs client-side, not during SSR
    setIsLoaded(true);
    
    // Function to check if the device is mobile based on screen size
    const checkMobile = () => {
      // Force check to run after component is fully mounted
      if (typeof window !== 'undefined') {
        // Consider devices with width under 768px as mobile
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
      }
    };

    // Check on initial load with a slight delay to ensure DOM is fully rendered
    setTimeout(checkMobile, 100);
    
    // Add event listener for resize events
    window.addEventListener('resize', checkMobile);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Don't render anything during SSR or before component is fully loaded
  if (!isLoaded) {
    return null;
  }

  // Don't show the blocker if not on mobile
  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-yellow-400 text-yellow-400">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">Mobile Device Detected</h2>
        <p className="mb-4">
          The {toolName} requires a larger screen to work properly.
        </p>
        <p className="text-sm mb-6">
          Please access this tool from a desktop or tablet device for the best experience.
        </p>
        <Link
          to="/tools"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Return to Tools
        </Link>
      </div>
    </div>
  );
};

export default MobileBlocker;
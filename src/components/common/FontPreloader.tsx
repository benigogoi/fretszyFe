// src/components/common/FontPreloader.tsx
import { useEffect } from 'react';

// FontPreloader component - load fonts without blocking render
const FontPreloader: React.FC = () => {
  useEffect(() => {
    // Check if we have system fonts available
    const checkSystemFont = () => {
      document.body.classList.add('system-font-loaded');
    };

    // Try system fonts first
    checkSystemFont();

    // Add a class to indicate fonts are ready
    document.documentElement.classList.add('fonts-loaded');
    
    // This runs once on mount - no cleanup needed
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default FontPreloader;
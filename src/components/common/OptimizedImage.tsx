// src/components/common/OptimizedImage.tsx
import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  onLoad?: () => void;
}

// Component that optimizes image loading based on viewport
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  priority = false,
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Check for mobile device on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Handle successful load
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Determine loading strategy
  const loadingStrategy = priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : 'auto';
  
  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={{ 
        ...style,
        // Apply simpler effects on mobile
        filter: isMobile ? 'none' : (style.filter || 'none')
      }}
      loading={loadingStrategy}
      fetchPriority={fetchPriority}
      decoding={priority ? 'sync' : 'async'}
      onLoad={handleLoad}
    />
  );
};

export default OptimizedImage;
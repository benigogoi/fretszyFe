// src/components/homeComps/Hero.tsx
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { mainGradient } from "../../utils/GradientUtils";
// Import OptimizedImage
import OptimizedImage from "../common/OptimizedImage";

// Import with named import to avoid pulling in unnecessary code
import heroImage from "../../assets/hero.webp";

// Add interface for component props
interface HeroProps {
  onImageLoad?: () => void;
}

// Define Particle interface for better type safety
interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  animationDuration: string;
}

const Hero: React.FC<HeroProps> = ({ onImageLoad }) => {
  // Create a reference to the button and image
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  // Track image loading state
  const [isLoaded, setIsLoaded] = useState(true); // Changed to true by default to prevent loading indicator
  
  // Track if the viewport is mobile
  const [isMobile, setIsMobile] = useState(false);
  // Track if decorative elements should be shown (delayed)
  const [showDecorations, setShowDecorations] = useState(false);

  // Manage particles with React state - useMemo to avoid recreating on every render
  const particles = useMemo<Particle[]>(() => [
    { id: 1, top: '25%', left: '25%', size: 2, animationDuration: '3s' },
    { id: 2, top: '33%', left: '50%', size: 1, animationDuration: '2s' },
    { id: 3, top: '67%', left: '33%', size: 1.5, animationDuration: '4s' },
    { id: 4, top: '50%', left: '75%', size: 2, animationDuration: '5s' },
  ], []);

  // Fixed throttle function with proper typing
  const throttle = useCallback(<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ) => {
    let timeout: number | null = null;
    let lastRun = 0;
    
    // Use arrow function to preserve 'this' context
    return (...args: Parameters<T>) => {
      if (!timeout) {
        const now = Date.now();
        const delta = now - lastRun;
        
        if (delta >= wait) {
          func(...args);
          lastRun = now;
        } else {
          timeout = window.setTimeout(() => {
            timeout = null;
            func(...args);
            lastRun = Date.now();
          }, wait - delta);
        }
      }
    };
  }, []);

  // Check for mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Create throttled resize handler
    const handleResize = throttle(checkMobile, 200);
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [throttle]);

  // Handle image load event
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    if (onImageLoad) onImageLoad();
    
    // Mark the LCP timing for performance monitoring
    if (window.performance && window.performance.mark) {
      window.performance.mark('hero-image-loaded');
    }
    
    // Delay showing decorative elements
    setTimeout(() => {
      setShowDecorations(true);
    }, 100);
  }, [onImageLoad]);

  // Add explicit touch handling to ensure mobile functionality
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Create a throttled handler for touch events
    const throttledTouchHandler = throttle((e: TouchEvent) => {
      // Prevent any default behavior that might be blocking the action
      e.preventDefault();
      // Navigate programmatically if Link isn't working
      window.location.href = "/tools";
    }, 300);

    button.addEventListener("touchstart", throttledTouchHandler);

    return () => {
      button.removeEventListener("touchstart", throttledTouchHandler);
    };
  }, [throttle]);

  return (
    <>
      {/* Hero section - Full width with gradient background */}
      <div className="relative w-full overflow-hidden opacity-100"
           data-loaded={isLoaded.toString()}>
        {/* Main gradient background (only essential for first render) */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: mainGradient,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 py-24 w-full">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Left content - SEO Focused (60% on desktop) */}
              <div className="lg:w-3/5 text-center lg:text-left px-4 lg:px-6">
                {/* Updated heading with two lines of equal size and period at the end */}
                <h1 className="text-white font-bold mb-6">
                  <span className="block text-2xl md:text-4xl lg:text-5xl mb-2">
                    Master the Guitar Fretboard.
                  </span>
                  <span className="block text-2xl md:text-4xl lg:text-5xl">
                    Improve Your Skills Faster.
                  </span>
                </h1>

                <div className="w-22 h-1 bg-white mx-auto lg:mx-0 mb-6"></div>
                <p className="text-white text-lg mb-6 max-w-lg mx-auto lg:mx-0 opacity-90">
                  Sharpen your guitar skills with Fretszy's interactive tools,
                  designed to help you master the fretboard, recognize notes
                  faster, build ear training, and track your progress easily.
                </p>

                {/* Fixed button with explicit z-index and pointer-events-auto to ensure it's clickable */}
                <div className="relative z-50 pointer-events-auto">
                  <Link
                    ref={buttonRef}
                    to="/tools"
                    className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-8 rounded-md transition-colors shadow-lg transform hover:scale-105 duration-200 active:bg-gray-200"
                    onClick={(e) => {
                      // Add explicit click handling
                      if (window.innerWidth < 768) {
                        e.preventDefault();
                        window.location.href = "/tools";
                      }
                    }}
                  >
                    Explore Training Tools
                  </Link>
                </div>
              </div>

              {/* Right content - Guitarist Hero Image with spotlight (40% on desktop) */}
              <div className="lg:w-2/5 px-4 lg:px-6 flex items-center justify-center relative z-10">
                {/* Main guitarist image */}
                <div className="relative">
                  {/* Main image with high priority */}
                  <OptimizedImage
                    src={heroImage}
                    alt="Guitarist playing with energy"
                    className="relative z-20 h-auto max-h-[500px] object-contain pointer-events-none opacity-100"
                    width={600} 
                    height={500}
                    priority={true}
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)",
                      transform: isMobile ? "scale(1.15)" : "scale(1.25)",
                    }}
                    onLoad={handleImageLoad}
                  />

                  {/* Decorative elements only loaded after main content */}
                  {showDecorations && !isMobile && (
                    <>
                      {/* Spotlight cone effect */}
                      <div
                        className="absolute top-0 left-1/2 w-96 h-96 pointer-events-none"
                        style={{
                          background:
                            "conic-gradient(from 90deg at 50% 0%, rgba(255, 255, 255, 0.3) 0deg, transparent 75deg, transparent 285deg, rgba(255, 255, 255, 0.3) 360deg)",
                          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                          transform: "translateX(-50%) translateY(-25%) scale(2)",
                          opacity: "0.5",
                          zIndex: "1",
                        }}
                      ></div>

                      {/* Color overlay effects */}
                      <div 
                        className="absolute top-1/3 right-0 w-32 h-32 bg-red-500 rounded-full mix-blend-screen opacity-30 blur-2xl z-10 pointer-events-none"
                      ></div>
                      <div 
                        className="absolute bottom-1/4 left-0 w-24 h-24 bg-blue-500 rounded-full mix-blend-screen opacity-30 blur-2xl z-10 pointer-events-none"
                      ></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated particles - Only loaded after main content has loaded */}
        {showDecorations && !isMobile && (
          <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
            {particles.map(particle => (
              <div 
                key={particle.id}
                className="absolute bg-white rounded-full animate-pulse opacity-70"
                style={{ 
                  top: particle.top, 
                  left: particle.left, 
                  width: `${particle.size}px`, 
                  height: `${particle.size}px`,
                  animationDuration: particle.animationDuration,
                }}
              ></div>
            ))}
          </div>
        )}
      </div>

      {/* Dark overlay that fades to black - positioned as a separate element */}
      <div
        className="w-full h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 1) 100%)",
          marginTop: "-6rem",
          position: "relative",
          zIndex: "5",
        }}
      ></div>
    </>
  );
};

export default Hero;
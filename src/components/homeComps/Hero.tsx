// src/components/homeComps/Hero.tsx
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png"; // Make sure path is correct
import { mainGradient } from "../../utils/GradientUtils";
import { useEffect, useRef } from "react";

const Hero = () => {
  // Create a reference to the button
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Add explicit touch handling to ensure mobile functionality
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleTouchStart = (e: TouchEvent) => {
      // Prevent any default behavior that might be blocking the action
      e.preventDefault();

      // Navigate programmatically if Link isn't working
      window.location.href = "/tools";
    };

    button.addEventListener("touchstart", handleTouchStart);

    return () => {
      button.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <>
      {/* Hero section - Full width with gradient background */}
      <div className="relative w-full overflow-hidden">
        {/* Custom gradient background to match navbar */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: mainGradient,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Spotlight effect */}
        <div className="absolute top-0 left-2/3 w-full h-96 bg-white opacity-10 blur-3xl rounded-full -translate-y-24 z-0"></div>
        <div className="absolute top-10 right-1/3 w-32 h-32 bg-blue-500 opacity-30 blur-3xl rounded-full z-0"></div>

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
                  Sharpen your guitar skills with Fretszy’s interactive tools,
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
                  {/* Spotlight cone effect */}
                  <div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-96 h-96 pointer-events-none"
                    style={{
                      background:
                        "conic-gradient(from 90deg at 50% 0%, rgba(255, 255, 255, 0.3) 0deg, transparent 75deg, transparent 285deg, rgba(255, 255, 255, 0.3) 360deg)",
                      borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                      transform: "translateX(-50%) translateY(-25%) scale(2)",
                      opacity: "0.5",
                      zIndex: "1",
                    }}
                  ></div>

                  {/* Dynamic light beam */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-32 w-64 h-64 bg-gradient-to-b from-white via-white to-transparent opacity-10 blur-md z-0 pointer-events-none"></div>

                  {/* Main image */}
                  <img
                    src={heroImage}
                    alt="Guitarist playing with energy"
                    className="relative z-20 h-auto max-h-[500px] object-contain pointer-events-none"
                    style={{
                      filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))",
                      transform: "scale(1.25)",
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 90%)",
                    }}
                  />

                  {/* Color overlay effects */}
                  <div className="absolute top-1/3 right-0 w-32 h-32 bg-red-500 rounded-full mix-blend-screen opacity-30 blur-2xl z-10 pointer-events-none"></div>
                  <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-blue-500 rounded-full mix-blend-screen opacity-30 blur-2xl z-10 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated particles (optional) - Added pointer-events-none to ensure they don't block clicks */}
        <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-70"></div>
          <div
            className="absolute top-1/3 left-1/2 w-1 h-1 bg-white rounded-full animate-ping opacity-60"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-50"
            style={{ animationDuration: "4s" }}
          ></div>
          <div
            className="absolute top-1/2 left-3/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"
            style={{ animationDuration: "5s" }}
          ></div>
        </div>
      </div>

      {/* Dark overlay that fades to black - positioned as a separate element */}
      <div
        className="w-full h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 1) 100%)",
          marginTop:
            "-6rem" /* Pull the gradient up to overlap with the bottom of the image */,
          position: "relative",
          zIndex: "5",
        }}
      ></div>
    </>
  );
};

export default Hero;

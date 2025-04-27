// src/components/layout/Layout.tsx
import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { saveLastLocation } from '../../utils/authRedirectUtils';

interface LayoutProps {
    children?: ReactNode;
}

// Component for improved loading experience
const PageTransition = ({ children, isLoading }: { children: ReactNode, isLoading: boolean }) => {
  return (
    <div className="relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-blue-400">Loading content...</p>
          </div>
        </div>
      )}
      
      {/* Actual content with opacity transition */}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-25' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    // Save the current location whenever it changes
    useEffect(() => {
        saveLastLocation(location.pathname);
        
        // Only show loading state for navigation after initial load
        if (!isFirstLoad) {
          setIsLoading(true);
        } else {
          setIsFirstLoad(false);
        }
        
        // Mark navigation start in performance timeline
        if (window.performance && window.performance.mark) {
          window.performance.mark('navigation-start');
        }
        
        // Simulate content loading - adjust timing as needed for your app
        const timer = setTimeout(() => {
          setIsLoading(false);
          
          // Mark navigation complete in performance timeline
          if (window.performance && window.performance.mark) {
            window.performance.mark('navigation-complete');
            try {
              window.performance.measure(
                'navigation-duration',
                'navigation-start',
                'navigation-complete'
              );
            } catch (e) {
              console.error('Performance measurement error:', e);
            }
          }
        }, 300);
        
        return () => clearTimeout(timer);
    }, [location.pathname, isFirstLoad]);

    // Preload images for better UX
    const preloadNextPageImages = useCallback(() => {
      const links = document.querySelectorAll('a');
      const preloadedUrls = new Set();
      
      links.forEach(link => {
        // Only preload internal links that haven't been preloaded
        if (
          link.href && 
          link.href.startsWith(window.location.origin) && 
          link.href !== window.location.href &&
          !preloadedUrls.has(link.href)
        ) {
          // Create link preload for the page
          const linkPreload = document.createElement('link');
          linkPreload.rel = 'prefetch';
          linkPreload.href = link.href;
          document.head.appendChild(linkPreload);
          
          // Track preloaded URLs
          preloadedUrls.add(link.href);
        }
      });
    }, []);
    
    // Run image preloading after the page has loaded
    useEffect(() => {
      if (!isLoading) {
        // Use requestIdleCallback if available, otherwise setTimeout
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(preloadNextPageImages);
        } else {
          setTimeout(preloadNextPageImages, 1000);
        }
      }
    }, [isLoading, preloadNextPageImages]);

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Navbar />
            {/* Main content area with proper spacing and loading transition */}
            <main className="flex-grow" style={{ marginTop: "4rem" }}>
                <PageTransition isLoading={isLoading}>
                  {children || <Outlet />}
                </PageTransition>
            </main>
            <Analytics />
            <SpeedInsights />
            <Footer />
        </div>
    );
};

export default Layout;
// src/App.tsx
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense, useState } from 'react';
import { AuthProvider } from './components/auth/AuthProvider';
import { GoogleAuthProvider } from './components/auth/GoogleAuthProvider';
// Import the FontPreloader component
import FontPreloader from './components/common/FontPreloader';

// Lazy load components
const AppRoutes = lazy(() => import('./Router'));
const ScrollToTop = lazy(() => import('./utils/ScrollToTop'));

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Throttle function to limit execution frequency
function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function GATracker() {
  const location = useLocation();
  const [hasInteracted, setHasInteracted] = useState(false);

  // Track user interaction
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('scroll', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useEffect(() => {
    // Only track page views if gtag exists, user has given consent, and has interacted
    const hasConsent = localStorage.getItem('analytics-consent') === 'true';
    
    if (window.gtag && hasConsent && hasInteracted) {
      // Throttle page view tracking to avoid excessive calls during rapid navigation
      const throttledPageView = throttle(() => {
        window.gtag!('event', 'page_view', {
          page_path: location.pathname + location.search,
          page_title: document.title,
          page_location: window.location.href
        });
      }, 1000);
      
      throttledPageView();
    }
  }, [location, hasInteracted]);

  return null;
}

// Loading component for suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen w-full bg-black">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-white text-lg">Loading Fretszy...</p>
    </div>
  </div>
);

function App() {
  // Add a performance marker for component mounting
  useEffect(() => {
    // Mark the main app component mounted time
    if (window.performance && window.performance.mark) {
      window.performance.mark('app-mounted');
    }
    
    // Cleanup function to measure performance when component unmounts
    return () => {
      if (window.performance && window.performance.measure) {
        try {
          window.performance.measure('app-lifecycle', 'app-mounted');
        } catch (e) {
          console.error('Performance measurement error:', e);
        }
      }
    };
  }, []);

  return (
    <GoogleAuthProvider>
      <AuthProvider>
        <FontPreloader />
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <ScrollToTop />
            <GATracker />
            <AppRoutes />
          </Suspense>
        </Router>
      </AuthProvider>
    </GoogleAuthProvider>
  );
}

export default App;
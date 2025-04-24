// src/App.tsx
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AppRoutes from './Router';
import ScrollToTop from './utils/ScrollToTop';
import { AuthProvider } from './components/auth/AuthProvider';
import { GoogleAuthProvider } from './components/auth/GoogleAuthProvider';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function GATracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <GoogleAuthProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <GATracker />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </GoogleAuthProvider>
  );
}

export default App;

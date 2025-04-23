// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Router';
import ScrollToTop from './utils/ScrollToTop';
import { AuthProvider } from './components/auth/AuthProvider';
import { GoogleAuthProvider } from './components/auth/GoogleAuthProvider';

function App() {
  return (
    <GoogleAuthProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </GoogleAuthProvider>
  );
}

export default App;
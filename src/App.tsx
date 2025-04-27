// App.tsx - Implement code splitting using React.lazy and Suspense
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Import components that are needed for the initial render directly
import Home from './pages/Home';
import LoadingSpinner from './components/common/LoadingSpinner'; // Create this as a simple spinner

// Lazy load all other pages
const Tools = lazy(() => import('./pages/Tools'));
const FretboardPage = lazy(() => import('./pages/games/FretboardPage'));
const PentatonicShapes = lazy(() => import('./pages/games/PentatonicShapes'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
// Add any other routes you have that aren't needed for initial page load

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Home page loaded immediately (not lazy) */}
          <Route path="/" element={<Home />} />
          
          {/* All other routes are lazy loaded */}
          <Route path="/tools" element={<Tools />} />
          <Route path="/games/fretboard" element={<FretboardPage />} />
          <Route path="/games/pentatonic-shapes" element={<PentatonicShapes />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/404" element={<NotFound />} />
          
          {/* Redirect any other routes to 404 */}
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
// src/Router.tsx
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import LazyComponent from "./components/common/LazyComponent";

// Only import Home directly since it's needed for the initial render
// Lazy load all other components
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Resources = lazy(() => import("./pages/Resources"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Landing = lazy(() => import("./pages/Landing"));
const FretboardGame = lazy(() => import("./games/fretboard-notefinder/FretboardGame"));
const PentatonicShapeConnector = lazy(() => import('./games/pentatonic-shapes/PentatonicShapeConnector'));
const TrainingTools = lazy(() => import("./pages/TrainingTools"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Profile pages (already lazy loaded)
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Special case for Login/Register since they have their own layout */}
      <Route path="login" element={<LazyComponent component={Login} />} />
      <Route path="register" element={<LazyComponent component={Register} />} />

      {/* All other routes wrapped in Layout component */}
      <Route element={<Layout />}>
        {/* Home is not lazy loaded for faster initial load */}
        <Route index element={<Home />} />
        
        {/* All other routes are lazy loaded */}
        <Route path="about" element={<LazyComponent component={About} />} />
        <Route path="contact" element={<LazyComponent component={Contact} />} />
        <Route path="faq" element={<LazyComponent component={FAQ} />} />
        <Route path="privacy-policy" element={<LazyComponent component={PrivacyPolicy} />} />
        <Route path="terms-of-service" element={<LazyComponent component={TermsOfService} />} />
        <Route path="resources" element={<LazyComponent component={Resources} />} />
        <Route path="landing" element={<LazyComponent component={Landing} />} />
        <Route path="tools" element={<LazyComponent component={TrainingTools} />} />
        
        {/* Game routes */}
        <Route path="games/pentatonic-shapes" element={<LazyComponent component={PentatonicShapeConnector} />} />
        <Route path="games/fretboard" element={<LazyComponent component={FretboardGame} />} />

        {/* Protected routes - already using Suspense */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <LazyComponent component={Profile} />
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <LazyComponent component={Settings} />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<LazyComponent component={NotFound} />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
// src/Router.tsx
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import LoadingSpinner from "./components/common/LoadingSpinner";

// Keep Home imported directly for fast initial load
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

// Already lazy loaded
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Special case for Login/Register since they have their own layout */}
      <Route path="login" element={
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      } />
      <Route path="register" element={
        <Suspense fallback={<LoadingSpinner />}>
          <Register />
        </Suspense>
      } />

      {/* All other routes wrapped in Layout component */}
      <Route element={<Layout />}>
        {/* Home is not lazy loaded for faster initial load */}
        <Route index element={<Home />} />
        
        {/* All other routes are lazy loaded */}
        <Route path="about" element={
          <Suspense fallback={<LoadingSpinner />}>
            <About />
          </Suspense>
        } />
        <Route path="contact" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        } />
        <Route path="faq" element={
          <Suspense fallback={<LoadingSpinner />}>
            <FAQ />
          </Suspense>
        } />
        <Route path="privacy-policy" element={
          <Suspense fallback={<LoadingSpinner />}>
            <PrivacyPolicy />
          </Suspense>
        } />
        <Route path="terms-of-service" element={
          <Suspense fallback={<LoadingSpinner />}>
            <TermsOfService />
          </Suspense>
        } />
        <Route path="resources" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Resources />
          </Suspense>
        } />
        <Route path="landing" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Landing />
          </Suspense>
        } />
        <Route path="tools" element={
          <Suspense fallback={<LoadingSpinner />}>
            <TrainingTools />
          </Suspense>
        } />
        
        {/* Game routes */}
        <Route path="games/pentatonic-shapes" element={
          <Suspense fallback={<LoadingSpinner />}>
            <PentatonicShapeConnector />
          </Suspense>
        } />
        <Route path="games/fretboard" element={
          <Suspense fallback={<LoadingSpinner />}>
            <FretboardGame />
          </Suspense>
        } />

        {/* Protected routes - already using Suspense */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <Settings />
              </Suspense>
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={
          <Suspense fallback={<LoadingSpinner />}>
            <NotFound />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
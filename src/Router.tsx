// src/Router.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Resources from "./pages/Resources";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import FretboardGame from "./games/fretboard-notefinder/FretboardGame";
import PentatonicShapeConnector from './games/pentatonic-shapes/PentatonicShapeConnector';
import TrainingTools from "./pages/TrainingTools";

// Profile pages (protected)
const Profile = React.lazy(() => import("./pages/Profile"));
const Settings = React.lazy(() => import("./pages/Settings"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Special case for Login/Register since they have their own layout */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* All other routes wrapped in Layout component */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="resources" element={<Resources />} />
        <Route path="landing" element={<Landing />} />
        <Route path="tools" element={<TrainingTools />} />
        {/* Game routes */}
        <Route path="games/pentatonic-shapes" element={<PentatonicShapeConnector />} />
        <Route path="games/fretboard" element={<FretboardGame />} />

        {/* Protected routes */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </React.Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <React.Suspense fallback={<div>Loading...</div>}>
                <Settings />
              </React.Suspense>
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

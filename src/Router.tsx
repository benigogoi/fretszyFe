// src/Router.tsx
import React, { lazy, Suspense, ComponentType } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Import ProtectedRoute
import { ProtectedRoute } from "./components/common/ProtectedRoute";

// Instead of direct imports, use lazy loading for all components
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Resources = lazy(() => import("./pages/Resources"));
const Landing = lazy(() => import("./pages/Landing"));
const TrainingTools = lazy(() => import("./pages/TrainingTools"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FretboardGame = lazy(() => import("./games/fretboard-notefinder/FretboardGame"));
const PentatonicShapeConnector = lazy(() => import('./games/pentatonic-shapes/PentatonicShapeConnector'));

// Blog pages
// const Blog = lazy(() => import("./pages/Blog"));
// const BlogPost = lazy(() => import("./pages/BlogPost"));

// Profile pages (protected)
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

// Custom loading component with better UX
const PageLoader = ({ pageName = "page" }: { pageName?: string }) => (
  <div className="flex items-center justify-center h-64 w-full">
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-blue-400 text-sm">Loading {pageName}...</p>
    </div>
  </div>
);

// Factory function to create lazy-loaded components with proper typing
function createLazyComponent<T extends ComponentType<any>>(
  LazyComponent: React.LazyExoticComponent<T>,
  pageName: string
): React.FC<React.ComponentProps<T>> {
  // This creates a named function component with proper TypeScript types
  const WithSuspense: React.FC<React.ComponentProps<T>> = (props) => (
    <Suspense fallback={<PageLoader pageName={pageName} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
  
  // Set display name for React DevTools
  WithSuspense.displayName = `Lazy${pageName.replace(/\s+/g, '')}`;
  
  return WithSuspense;
}

// Create all the lazy components
const LazyLogin = createLazyComponent(Login, "login");
const LazyRegister = createLazyComponent(Register, "registration");
const LazyHome = createLazyComponent(Home, "home");
const LazyAbout = createLazyComponent(About, "about");
const LazyContact = createLazyComponent(Contact, "contact");
const LazyFAQ = createLazyComponent(FAQ, "FAQs");
const LazyPrivacyPolicy = createLazyComponent(PrivacyPolicy, "privacy policy");
const LazyTermsOfService = createLazyComponent(TermsOfService, "terms of service");
const LazyResources = createLazyComponent(Resources, "resources");
const LazyLanding = createLazyComponent(Landing, "landing");
const LazyTrainingTools = createLazyComponent(TrainingTools, "training tools");
const LazyNotFound = createLazyComponent(NotFound, "not found");
const LazyFretboardGame = createLazyComponent(FretboardGame, "fretboard game");
const LazyPentatonicShapeConnector = createLazyComponent(PentatonicShapeConnector, "pentatonic shapes");
const LazyProfile = createLazyComponent(Profile, "profile");
const LazySettings = createLazyComponent(Settings, "settings");

// // Blog components
// const LazyBlog = createLazyComponent(Blog, "blog");
// const LazyBlogPost = createLazyComponent(BlogPost, "blog post");

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Special case for Login/Register since they have their own layout */}
      <Route path="login" element={<LazyLogin />} />
      <Route path="register" element={<LazyRegister />} />

      {/* All other routes wrapped in Layout component */}
      <Route element={<Layout />}>
        <Route index element={<LazyHome />} />
        <Route path="about" element={<LazyAbout />} />
        <Route path="contact" element={<LazyContact />} />
        <Route path="faq" element={<LazyFAQ />} />
        <Route path="privacy-policy" element={<LazyPrivacyPolicy />} />
        <Route path="terms-of-service" element={<LazyTermsOfService />} />
        <Route path="resources" element={<LazyResources />} />
        <Route path="landing" element={<LazyLanding />} />
        <Route path="tools" element={<LazyTrainingTools />} />
        
        {/* Blog routes */}
        {/* <Route path="blog" element={<LazyBlog />} />
        <Route path="blog/:id" element={<LazyBlogPost />} /> */}
        
        {/* Game routes */}
        <Route path="games/pentatonic-shapes" element={<LazyPentatonicShapeConnector />} />
        <Route path="games/fretboard" element={<LazyFretboardGame />} />

        {/* Protected routes */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <LazyProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <LazySettings />
            </ProtectedRoute>
          }
        />

        {/* Fallback routes */}
        <Route path="404" element={<LazyNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
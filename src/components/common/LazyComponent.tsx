// src/components/common/LazyComponent.tsx
import React, { Suspense } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LazyComponentProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  props?: Record<string, any>;
}

/**
 * A wrapper for lazy-loaded components that provides a consistent loading UI
 */
const LazyComponent: React.FC<LazyComponentProps> = ({
  component: Component,
  props = {},
}) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component {...props} />
    </Suspense>
  );
};

export default LazyComponent;

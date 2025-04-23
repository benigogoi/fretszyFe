// src/components/auth/AuthProvider.tsx
import React, { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { User, AuthState } from "./types";
import * as authService from "../../services/authService";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Create a function to refresh the auth state that can be called from anywhere
  const refreshAuthState = useCallback(async () => {
    try {
      // Check if user is already authenticated
      const isUserAuthenticated = authService.isAuthenticated();
      console.log(
        "Refreshing auth state, isAuthenticated:",
        isUserAuthenticated
      );

      if (isUserAuthenticated) {
        // Try to refresh user data from the server
        const user = await authService.refreshUserData();

        if (user) {
          console.log("User data refreshed from server:", user);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          // If we couldn't refresh, fall back to local storage
          const localUser = authService.getCurrentUser();
          console.log("Using local user data:", localUser);
          setAuthState({
            user: localUser,
            isAuthenticated: !!localUser,
            isLoading: false,
            error: null,
          });
        }
      } else {
        console.log("User is not authenticated");
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error("Error refreshing auth state:", error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: "Failed to refresh authentication",
      });
    }
  }, []);

  // Initialize auth state on component mount
  useEffect(() => {
    refreshAuthState();
  }, [refreshAuthState]);

  // Re-check authentication every time the component is focused
  useEffect(() => {
    // This will run when the window regains focus
    const handleFocus = () => {
      console.log("Window focused, checking auth state");
      refreshAuthState();
    };

    window.addEventListener("focus", handleFocus);

    // Also check auth state when storage changes (in case of login/logout in another tab)
    window.addEventListener("storage", (event) => {
      if (event.key === "fretszy_auth_token" || event.key === "fretszy_user") {
        console.log("Storage changed, refreshing auth state");
        refreshAuthState();
      }
    });

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refreshAuthState]);

  // Handle login with provider (Google, Email)
  const login = async (
    provider: "google" | "email",
    credential?: string,
    email?: string,
    password?: string
  ): Promise<void> => { // Changed return type to Promise<void> to match the type definition
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      let user: User;

      if (provider === "google") {
        if (!credential) {
          throw new Error("Google credential is required");
        }
        user = await authService.loginWithGoogle(credential);
      } else if (provider === "email") {
        if (!email || !password) {
          throw new Error("Email and password are required");
        }
        user = await authService.loginWithEmail(email, password);
      } else {
        throw new Error("Invalid provider");
      }

      console.log("Login successful:", user);

      // Immediately update auth state after successful login
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      
      // No return value needed (void)
    } catch (error: any) {
      console.error(`${provider} login error:`, error);

      // Format error message
      let errorMessage = `Failed to login with ${provider}`;
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      throw error;
    }
  };

  // Handle logout
  const logout = async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      await authService.logout();

      // Immediately update auth state after logout
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Logout error:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to logout",
      }));
    }
  };

  // Get current user
  const getUser = (): User | null => {
    return authState.user;
  };

  // Context value
  const value = {
    ...authState,
    login,
    logout,
    getUser,
    refreshAuthState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};  
// src/components/auth/types.ts
export interface User {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
    provider: 'google' | 'facebook' | 'email';
    createdAt: string;
    lastLogin: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthContextType extends AuthState {
    login: (provider: 'google' | 'email', credential?: string, email?: string, password?: string) => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => User | null;
    refreshAuthState: () => Promise<void>; // Added this method
}
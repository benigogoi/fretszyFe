import { createContext } from 'react';
import { AuthContextType } from './types'; // Removed unused User import

// Create default context values
const defaultAuthContext: AuthContextType = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: async () => { throw new Error('login not implemented'); },
    logout: async () => { throw new Error('logout not implemented'); },
    getUser: () => null,
    refreshAuthState: async () => { throw new Error('refreshAuthState not implemented'); } // Added the missing property
};

// Create the auth context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
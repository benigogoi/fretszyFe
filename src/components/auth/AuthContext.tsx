import { createContext } from 'react';
import { AuthContextType, User } from './types';

// Create default context values
const defaultAuthContext: AuthContextType = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: async () => { throw new Error('login not implemented'); },
    logout: async () => { throw new Error('logout not implemented'); },
    getUser: () => null
};

// Create the auth context
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
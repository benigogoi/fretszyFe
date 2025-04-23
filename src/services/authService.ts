// src/services/authService.ts
import { User } from '../components/auth/types';
import axios from 'axios';

const API_URL = 'https://BeniGogoi.pythonanywhere.com'; // Adjusted for production
const AUTH_TOKEN_KEY = 'fretszy_auth_token';
const USER_KEY = 'fretszy_user';

// Setup axios instance with token
const createAxiosInstance = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return axios.create({
        baseURL: API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Token ${token}` : '',
        },
    });
};

// Helper to map backend user data to frontend User type
const mapUserData = (userData: any): User => {
    return {
        id: userData.id.toString(),
        email: userData.email,
        displayName: userData.first_name && userData.last_name 
            ? `${userData.first_name} ${userData.last_name}` 
            : userData.username,
        photoURL: userData.photo_url || undefined,
        provider: userData.provider as 'google' | 'facebook' | 'email',
        createdAt: userData.date_joined,
        lastLogin: userData.last_login || userData.date_joined
    };
};

// Initialize auth with Google
export const loginWithGoogle = async (credential: string): Promise<User> => {
    try {
        console.log('Sending Google credential to backend:', credential.substring(0, 20) + '...');
        
        // Log the API URL being used
        console.log('API URL:', `${API_URL}/auth/google/`);
        
        // Send Google credential to backend for verification
        const response = await axios.post(`${API_URL}/auth/google/`, { credential });
        
        console.log('Backend response:', response.data);
        
        // Extract token from response
        const { token, user: backendUser } = response.data;
        
        // Map backend user to frontend User type
        const user = mapUserData(backendUser);
        
        // Store token and user in localStorage
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        
        return user;
    } catch (error) {
        console.error('Google login error details:', error);
        if (axios.isAxiosError(error)) {
            console.error('Response status:', error.response?.status);
            console.error('Response data:', error.response?.data);
            console.error('Request config:', error.config);
        }
        throw error;
    }
};

// Register with email and password
export const registerWithEmail = async (userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
}): Promise<User> => {
    try {
        const response = await axios.post(`${API_URL}/auth/register/`, {
            email: userData.email,
            password: userData.password,
            first_name: userData.firstName || '',
            last_name: userData.lastName || '',
            provider: 'email'
        });
        
        // Extract token and user data
        const { token, user: backendUser } = response.data;
        
        // Map backend user to frontend User type
        const user = mapUserData(backendUser);
        
        // Store token and user in localStorage
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        
        return user;
    } catch (error) {
        console.error('Email registration error:', error);
        if (axios.isAxiosError(error)) {
            console.error('Response status:', error.response?.status);
            console.error('Response data:', error.response?.data);
        }
        throw error;
    }
};

// Login with email and password
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
    try {
        const response = await axios.post(`${API_URL}/auth/login/`, {
            email,
            password
        });
        
        // Extract token and user data
        const { token, user: backendUser } = response.data;
        
        // Map backend user to frontend User type
        const user = mapUserData(backendUser);
        
        // Store token and user in localStorage
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        
        return user;
    } catch (error) {
        console.error('Email login error:', error);
        if (axios.isAxiosError(error)) {
            console.error('Response status:', error.response?.status);
            console.error('Response data:', error.response?.data);
        }
        throw error;
    }
};

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) return null;
    
    try {
        return JSON.parse(userJson) as User;
    } catch (error) {
        console.error('Error parsing user JSON:', error);
        return null;
    }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
};

// Refresh user data from backend
export const refreshUserData = async (): Promise<User | null> => {
    if (!isAuthenticated()) {
        return null;
    }
    
    try {
        const api = createAxiosInstance();
        const response = await api.get('/auth/user/');
        
        // Map backend user to frontend User type
        const user = mapUserData(response.data);
        
        // Update stored user data
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
    } catch (error) {
        console.error('Error refreshing user data:', error);
        // If 401 unauthorized, clear auth data
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            logout();
        }
        return null;
    }
};

// Logout user
export const logout = async (): Promise<void> => {
    try {
        if (isAuthenticated()) {
            const api = createAxiosInstance();
            await api.post('/auth/logout/');
        }
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Always clear localStorage, even if API call fails
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }
};
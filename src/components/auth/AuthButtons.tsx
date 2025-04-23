// src/components/auth/AuthButtons.tsx
import React from 'react';
import { useAuth } from './useAuth';
import { GoogleLogin } from '@react-oauth/google';

interface AuthButtonsProps {
    mode?: 'horizontal' | 'vertical';
    className?: string;
}

export const AuthButtons: React.FC<AuthButtonsProps> = ({
    mode = 'vertical',
    className = ''
}) => {
    const { login, isLoading, refreshAuthState } = useAuth();

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            await login('google', credentialResponse.credential);
            // Explicitly refresh auth state to update UI
            await refreshAuthState();
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };

    const handleGoogleError = () => {
        console.error('Google login failed');
    };

    return (
        <div className={`auth-buttons ${mode === 'vertical' ? 'flex flex-col space-y-3' : 'flex space-x-3'} ${className}`}>
            <div>
                {/* Removed the disabled prop as it's not supported by GoogleLogin */}
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    shape="rectangular"
                    text="signin_with"
                    theme="filled_blue"
                    locale="en"
                />
                {/* Show loading state outside the component if needed */}
                {isLoading && <div className="mt-2 text-sm text-gray-400">Loading...</div>}
            </div>
        </div>
    );
};
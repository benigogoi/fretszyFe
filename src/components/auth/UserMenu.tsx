import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './useAuth';

export const UserMenu: React.FC = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
    };

    if (!user) {
        return null;
    }

    // Get initials for avatar - guarantees at least one character
    const getInitials = () => {
        if (!user.displayName || user.displayName.trim() === '') {
            // Fallback to email if no display name
            return user.email.charAt(0).toUpperCase();
        }
        
        const nameParts = user.displayName.trim().split(' ').filter(part => part.length > 0);
        if (nameParts.length === 0) {
            // If still no valid name parts, use email
            return user.email.charAt(0).toUpperCase();
        } else if (nameParts.length === 1) {
            // Just use the first character of the name
            return nameParts[0].charAt(0).toUpperCase();
        } else {
            // Use first character of first and last name
            return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
        }
    };

    // Get a consistent background color based on user ID or name
    const getAvatarColor = () => {
        // List of pleasing colors for avatars
        const colors = [
            'bg-blue-600', 'bg-purple-600', 'bg-green-600', 
            'bg-red-600', 'bg-indigo-600', 'bg-pink-600', 
            'bg-teal-600', 'bg-orange-600'
        ];
        
        // Use user ID or email to consistently pick a color
        const seed = user.id || user.email;
        const hash = seed.split('').reduce((acc, char) => {
            return acc + char.charCodeAt(0);
        }, 0);
        
        return colors[hash % colors.length];
    };

    return (
        <div className="relative" ref={menuRef}>
            {/* Profile button */}
            <button
                type="button"
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="user-menu-button"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span className="sr-only">Open user menu</span>
                {user.photoURL ? (
                    <img
                        className="h-8 w-8 rounded-full border-2 border-white object-cover"
                        src={user.photoURL}
                        alt={`${user.displayName || user.email}'s profile`}
                        onError={(e) => {
                            // If image fails to load, replace with avatar div
                            e.currentTarget.style.display = 'none';
                            // We need to manually create and insert the avatar div since we can't use state here
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                                const avatarDiv = document.createElement('div');
                                avatarDiv.className = `h-8 w-8 rounded-full flex items-center justify-center text-white font-medium border-2 border-white ${getAvatarColor()}`;
                                avatarDiv.innerText = getInitials();
                                parent.appendChild(avatarDiv);
                            }
                        }}
                    />
                ) : (
                    <div 
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium border-2 border-white ${getAvatarColor()}`}
                        data-testid="avatar-fallback"
                    >
                        {getInitials()}
                    </div>
                )}
            </button>

            {/* Dropdown menu */}
            {isMenuOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                >
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        <div className="font-medium">{user.displayName || 'User'}</div>
                        <div className="text-gray-500 truncate">{user.email}</div>
                    </div>

                    <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Your Profile
                    </Link>

                    <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Settings
                    </Link>

                    <button
                        type="button"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex={-1}
                        onClick={handleLogout}
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
};
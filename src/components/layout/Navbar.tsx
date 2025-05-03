import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/FretszyLogo.png";
import { mainGradient } from '../../utils/GradientUtils';
import { useAuth } from '../auth/useAuth';
import { UserMenu } from '../auth/UserMenu';

// Helper component for sign out button
const SignOutButton: React.FC<{ onSignOut: () => void }> = ({ onSignOut }) => {
    const { logout } = useAuth();

    const handleSignOut = async () => {
        await logout();
        onSignOut();
    };

    return (
        <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
        >
            Sign out
        </button>
    );
};

interface NavbarProps {
    title?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    // Remove debug logging in production
    // useEffect(() => {
    //     console.log('Auth state in Navbar:', { isAuthenticated, isLoading, user });
    // }, [isAuthenticated, isLoading, user]);

    // Add scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Check if we're on the home page
    const isHomePage = location.pathname === "/" || location.pathname === "/home";
    
    // Check if we're on a game page to apply different styling
    const isGamePage = location.pathname.includes('/games/') || location.pathname.includes('/fretboard');

    // Determine background style based on page and scroll state
    const getBackgroundStyle = () => {
        if (isGamePage) {
            // For game pages, use a solid color regardless of scroll position
            return { background: '#111827' };
        } else if (isHomePage && !scrolled) {
            // For home page when not scrolled, use the gradient
            return {
                background: mainGradient,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            };
        } else {
            // For all other pages or when scrolled - using dark navy blue
            return { 
                background: '#121c2e', // Deep navy/dark blue color
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
            };
        }
    };

    // Determine what to show in the auth section of the navbar
    const renderAuthSection = () => {
        if (isLoading) {
            return (
                <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse"></div>
            );
        }
        
        if (isAuthenticated && user) {
            return <UserMenu />;
        }
        
        return (
            <Link to="/login" className="bg-white text-blue-600 hover:bg-gray-100 
                px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
                Sign In
            </Link>
        );
    };

    return (
        <nav
            className={`
                w-full z-50
                fixed top-0 left-0 right-0
                transition-all duration-300 ease-in-out
                text-white border-b-0
                ${isGamePage ? 'border-b border-gray-800' : ''}
            `}
            style={getBackgroundStyle()}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <img
                                src={logo}
                                alt="Fretszy Guitar Fretboard Training Tool Logo"
                                className="h-12 w-auto p-1"
                                width={48}
                                height={48}
                            />
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link to="/" className="text-white hover:text-opacity-80 px-3 py-2 text-sm font-medium transition-colors">
                            Home
                        </Link>
                        <Link to="/about" className="text-white hover:text-opacity-80 px-3 py-2 text-sm font-medium transition-colors">
                            About
                        </Link>
                        <Link to="/blog" className="text-white hover:text-opacity-80 px-3 py-2 text-sm font-medium transition-colors">
                            Blog
                        </Link>
                        
                        <Link to="/faq" className="text-white hover:text-opacity-80 px-3 py-2 text-sm font-medium transition-colors">
                            FAQ
                        </Link>
                        <Link to="/contact" className="text-white hover:text-opacity-80 px-3 py-2 text-sm font-medium transition-colors">
                            Contact
                        </Link>
                        
                        {renderAuthSection()}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen ? "true" : "false"}
                            onClick={toggleMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed */}
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                                width={24}
                                height={24}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Icon when menu is open */}
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                                width={24}
                                height={24}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-900 text-white shadow-lg border-t border-gray-800`}
                id="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        to="/"
                        className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        to="/blog"
                        className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Blog
                    </Link>
                    <Link
                        to="/faq"
                        className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        FAQ
                    </Link>
                    <Link
                        to="/contact"
                        className="text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </Link>
                    {!isAuthenticated && !isLoading && (
                        <Link
                            to="/login"
                            className="bg-blue-600 text-white hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium mt-3"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Sign In
                        </Link>
                    )}
                </div>

                {/* Show user info in mobile menu if authenticated */}
                {isAuthenticated && user && (
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
                                <Link to="/profile">
                                    <UserMenu />
                                </Link>
                            </div>
                            <div className="ml-3">
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Settings
                                </Link>
                                <SignOutButton onSignOut={() => setIsMenuOpen(false)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
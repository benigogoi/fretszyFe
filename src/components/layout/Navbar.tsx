import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/FretszyLogo.png";

interface NavbarProps {
    title?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="
            bg-[#1f1f1f] text-white shadow-md 
            w-full z-50
            relative          /* Default for mobile (not fixed) */
            md:fixed md:top-0 md:left-0 md:right-0  /* Fixed on md and above */
        ">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and brand */}
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <img
                                src={logo}
                                alt="Fretszy Guitar Fretboard Training Tool Logo"
                                className="h-12 w-auto p-1"
                            />
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <Link to="/" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">
                            Home
                        </Link>
                        <Link to="/about" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">
                            About
                        </Link>
                        <Link to="/blog" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">
                            Blog
                        </Link>
                        {/* <Link to="/resources" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">
                            Resources
                        </Link> */}
                        <Link to="/faq" className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium">
                            FAQ
                        </Link>
                        <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-300 hover:bg-gray-700 focus:outline-none"
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
                className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
                id="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link
                        to="/"
                        className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        to="/blog"
                        className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Blog
                    </Link>
                    <Link
                        to="/resources"
                        className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Resources
                    </Link>
                    <Link
                        to="/faq"
                        className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        FAQ
                    </Link>
                    <Link
                        to="/contact"
                        className="bg-blue-600 hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
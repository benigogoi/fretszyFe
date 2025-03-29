import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSignup from '../ui/NewsletterSignup';

interface FooterProps {
    copyrightYear?: number;
    appName?: string;
}

const Footer: React.FC<FooterProps> = ({
    copyrightYear = new Date().getFullYear(),
    appName = 'Fretszy'
}) => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Column 1: About & Logo */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Fretszy</h3>
                        <p className="text-sm text-gray-300 mb-4">
                            Interactive tools to help guitarists master the fretboard quickly and effectively.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            {/* <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li> */}
                            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Connect */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Connect</h3>
                        <div className="flex space-x-4 mb-4">
                            
                            <a href="https://www.facebook.com/profile.php?id=61574906033043&sk=about_contact_and_basic_info" target='blank' className="text-gray-300 hover:text-white" aria-label="Facebook">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                                </svg>
                            </a>
                            {/* <a href="https://instagram.com" className="text-gray-300 hover:text-white" aria-label="Instagram">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                                </svg>
                            </a> */}
                            
                        </div>

                        {/* Replace the form with the NewsletterSignup component */}
                        {/* <NewsletterSignup /> */}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
                    <p>&copy; {copyrightYear} {appName}. All rights reserved.</p>
                    <div className="mt-2">
                        <span className="mx-2">Guitar Fretboard Trainer</span> •
                        <span className="mx-2">Note Recognition Game</span> •
                        <span className="mx-2">Learn Guitar Online</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
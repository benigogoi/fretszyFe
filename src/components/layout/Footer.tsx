import React from 'react';
import { Link } from 'react-router-dom';
// import NewsletterSignup from '../ui/NewsletterSignup';

interface FooterProps {
    copyrightYear?: number;
    appName?: string;
}

const Footer: React.FC<FooterProps> = ({
    copyrightYear = new Date().getFullYear(),
    appName = 'Fretszy'
}) => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-6 mt-auto border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Column 1: About & Logo */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Fretszy</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Interactive tools to help guitarists master the fretboard quickly and effectively.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link to="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-white transition-colors">
                                    About
                                </Link>
                            </li>
                            
                            <li>
                                <Link to="/faq" className="hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Legal */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Connect */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect</h3>
                        <div className="flex space-x-4 mb-4">
                            <a
                                href="https://www.facebook.com/profile.php?id=61574906033043&sk=about_contact_and_basic_info"
                                target='blank'
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                                </svg>
                            </a>
                        </div>

                        {/* <div className="mt-4">
                            <a
                                href="mailto:contact@fretszy.com"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md inline-block"
                            >
                                Email Us
                            </a>
                        </div> */}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                    <p className="text-sm text-gray-400">&copy; {copyrightYear} {appName}. Guitar Fretboard Training Platform</p>
                    <div className="mt-2 flex justify-center flex-wrap">
                        <span className="px-2 text-sm text-gray-500">Guitar Fretboard Trainer</span>
                        <span className="text-gray-600 mx-1">•</span>
                        <span className="px-2 text-sm text-gray-500">Note Recognition Game</span>
                        <span className="text-gray-600 mx-1">•</span>
                        <span className="px-2 text-sm text-gray-500">Learn Guitar Online</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
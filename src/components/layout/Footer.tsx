import React from "react";
import { Link } from "react-router-dom";
// import NewsletterSignup from '../ui/NewsletterSignup';

interface FooterProps {
  copyrightYear?: number;
  appName?: string;
}

const Footer: React.FC<FooterProps> = ({
  copyrightYear = new Date().getFullYear(),
  appName = "Fretszy",
}) => {
  return (
    <footer
      className="bg-gray-900 text-white pt-10 pb-6 mt-auto border-t border-gray-800"
      style={{
        minHeight: "300px", // Add explicit minimum height
        contain: "layout", // Use layout containment to isolate this element's layout
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1: About & Logo */}
          <div className="min-h-[120px]">
            <h3 className="text-xl font-bold mb-4">Fretszy</h3>
            <p className="text-sm text-gray-400 mb-4">
              Interactive tools to help guitarists master the fretboard quickly
              and effectively.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="min-h-[120px]">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
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
          <div className="min-h-[120px]">
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="min-h-[120px]">
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.facebook.com/profile.php?id=61574906033043&sk=about_contact_and_basic_info"
                target="blank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/fretszy/"
                target="blank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.509-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428.247-.667.642-1.272 1.153-1.772a4.904 4.904 0 011.772-1.153c.637-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.04 0 2.67.01 2.986.058 4.04.044.976.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.04.058 2.67 0 2.987-.01 4.04-.058.976-.044 1.504-.207 1.857-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.054.058-1.37.058-4.04 0-2.67-.01-2.986-.058-4.04-.044-.976-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.097 3.097 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.054-.048-1.37-.058-4.04-.058zm0 3.063a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 100-6.666 3.333 3.333 0 000 6.666zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"></path>
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
          <p className="text-sm text-gray-400">
            &copy; {copyrightYear} {appName}. Guitar Fretboard Training Platform
          </p>
          <div className="mt-2 flex justify-center flex-wrap">
            <span className="px-2 text-sm text-gray-500">
              Guitar Fretboard Trainer
            </span>
            <span className="text-gray-600 mx-1">•</span>
            <span className="px-2 text-sm text-gray-500">
              Note Recognition Game
            </span>
            <span className="text-gray-600 mx-1">•</span>
            <span className="px-2 text-sm text-gray-500">
              Learn Guitar Online
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

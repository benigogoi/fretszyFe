import React from 'react';
import logo from "../../assets/fretCleverLogo1.png";

interface NavbarProps {
    title?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <nav className="bg-[#1f1f1f] text-white shadow-md fixed top-0 left-0 right-0 w-full z-50">
            {/* Simplified navbar with centered title */}
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center h-16">
                    {/* Centered logo and title section */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="font-bold text-xl">
                                <img src={logo} alt="Fretboard Master Logo" className="h-16 w-auto p-2" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
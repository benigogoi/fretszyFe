import React from 'react';

interface FooterProps {
    copyrightYear?: number;
    appName?: string;
}

const Footer: React.FC<FooterProps> = ({
    copyrightYear = new Date().getFullYear(),
    appName = 'Fretboard Master'
}) => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center">
                    {/* Simple copyright section */}
                    <div className="text-center">
                        <p>&copy; {copyrightYear} {appName}. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
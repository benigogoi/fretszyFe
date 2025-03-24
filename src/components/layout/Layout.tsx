import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// import { Analytics } from "@vercel/analytics/react"
// import { SpeedInsights } from "@vercel/speed-insights/next"

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pb-24">
                {children}
            </main>
            {/* <Analytics />
            <SpeedInsights /> */}
            <Footer />
        </div>
    );
};

export default Layout;
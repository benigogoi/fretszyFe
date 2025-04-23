// src/components/layout/Layout.tsx
import React, { ReactNode, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { saveLastLocation } from '../../utils/authRedirectUtils';

interface LayoutProps {
    children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    // Save the current location whenever it changes
    useEffect(() => {
        saveLastLocation(location.pathname);
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            <Navbar />
            {/* Main content area with proper spacing */}
            <main className="flex-grow" style={{ marginTop: "4rem" }}>
                {children || <Outlet />}
            </main>
            <Analytics />
            <SpeedInsights />
            <Footer />
        </div>
    );
};

export default Layout;
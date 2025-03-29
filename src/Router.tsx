import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import App from './App';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
// import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ScrollToTop from './utils/ScrollToTop';


// Analytics tracker component
function PageTracker() {
    const location = useLocation();

    useEffect(() => {
        // Send pageview with current page's location
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search
        });
    }, [location]);

    return null;
}

// Layout wrapper to include the tracker in all routes
import { ReactNode } from 'react';

function AppLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <PageTracker />
            {children}
        </>
    );
}

const Router = () => {
    // Initialize GA once when router mounts
    useEffect(() => {
        ReactGA.initialize('G-D37FBTN3TP');
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <AppLayout>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    {/* <Route path="/resources" element={<Resources />} /> */}
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
};

export default Router;
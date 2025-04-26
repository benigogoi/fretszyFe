import React from 'react';
import Layout from '../components/layout/Layout';

const PrivacyPolicy: React.FC = () => {
    const lastUpdated = "March 27, 2025";

    return (
        <Layout>
            <div className="pt-20 pb-12 bg-gray-900 text-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
                    <p className="text-center text-gray-400 mb-8">Last Updated: {lastUpdated}</p>

                    <div className="bg-gray-800 p-8 rounded-lg shadow-sm">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                            <p className="mb-4">
                                At Fretszy, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we handle your personal and non-personal information when you visit our website fretszy.com.
                            </p>
                            <p>
                                Please read this Privacy Policy carefully. By using our Website or Application, you agree to the terms outlined herein.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                            <h3 className="text-xl font-semibold mb-2">Personal Data</h3>
                            <p className="mb-4">We may collect personal information including:</p>
                            <ul className="list-disc pl-6 mb-4 space-y-2">
                                <li>Name</li>
                                <li>Email address</li>
                                <li>Subject and content of messages</li>
                                <li>User preferences and settings</li>
                            </ul>

                            <h3 className="text-xl font-semibold mb-2">Non-Personal Data</h3>
                            <p className="mb-4">We may also collect non-personal data such as:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Browser type and version</li>
                                <li>Device type and operating system</li>
                                <li>General analytics and usage statistics</li>
                                <li>Interaction patterns with the website</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                            <p className="mb-4">Your information helps us:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Improve our website and application</li>
                                <li>Personalize your learning experience</li>
                                <li>Send periodic emails (with your consent)</li>
                                <li>Understand user behavior and improve our content and services</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Tracking Technologies & Cookies</h2>
                            <p className="mb-4">
                                We utilize cookies and tracking technologies to improve user experience, analyze website traffic, and personalize content. You can adjust cookie preferences through your browser settings, though disabling cookies may affect your experience.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
                            <p className="mb-4">We engage trusted third-party services including:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Google Analytics:</strong> To analyze website traffic.</li>
                                <li><strong>Vercel Analytics:</strong> For performance monitoring and usage statistics.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Advertising</h2>
                            <p className="mb-4">
                                Fretszy may partner with third-party advertising companies, such as Google AdSense, to serve personalized advertisements. These companies may use cookies and similar technologies to deliver ads relevant to your interests based on your browsing history. You may adjust your cookie settings or opt-out through your browser settings.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                            <p>
                                We implement security measures to protect your personal information. However, no method of electronic transmission or storage is entirely secure; thus, absolute security cannot be guaranteed.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Your Data Protection Rights</h2>
                            <p className="mb-4">You have rights concerning your personal data, including:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Right to access and rectify your information</li>
                                <li>Right to request deletion of your data</li>
                                <li>Right to restrict or object to processing</li>
                                <li>Right to data portability</li>
                                <li>Right to withdraw consent anytime</li>
                            </ul>
                            <p className="mt-4">
                                Contact us to exercise any of these rights.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                            <p className="mb-4">
                                Our services are not intended for children under 13. We do not knowingly collect personal data from individuals under this age. If you believe we have inadvertently collected information from a minor, please contact us for prompt removal.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                            <p>
                                We may update this Privacy Policy occasionally. We will notify you about any changes by updating the date on this page. We recommend reviewing this policy periodically to stay informed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                            <p className="mb-2">If you have any questions, contact us at:</p>
                            <div className="bg-gray-700 rounded p-4">
                                <p><strong>Email:</strong> support@fretszy.com</p>
                                <p><strong>Call Us:</strong> <a href="tel:+917002505588" className="text-blue-400 hover:underline">+91 70025 05588</a></p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PrivacyPolicy;
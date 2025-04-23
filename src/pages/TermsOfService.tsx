import React from 'react';
import Layout from '../components/layout/Layout';

const TermsOfService: React.FC = () => {
    const lastUpdated = "March 27, 2025";

    return (
        <Layout>
            <div className="pt-20 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-2 text-center">Terms of Service</h1>
                    <p className="text-center text-gray-600 mb-8">Last Updated: {lastUpdated}</p>

                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                            <p className="mb-4">
                                Welcome to Fretszy ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of
                                the Fretszy website (fretszy.com) and guitar fretboard training application (collectively, the "Service").
                            </p>
                            <p className="mb-4">
                                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part, you may not access the Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">2. Use of the Service</h2>

                            <h3 className="text-xl font-bold mb-3">2.1 Account Registration</h3>
                            <p className="mb-4">
                                Certain features may require account registration. You must provide accurate information and update it as needed.
                            </p>

                            <h3 className="text-xl font-bold mb-3">2.2 Account Security</h3>
                            <p className="mb-4">
                                You're responsible for protecting your account and using secure, unique passwords.
                            </p>

                            <h3 className="text-xl font-bold mb-3">2.3 Acceptable Use</h3>
                            <p className="mb-4">
                                You agree not to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Use the Service in ways violating applicable laws</li>
                                <li>Engage in harmful, abusive, or illegal activities</li>
                                <li>Attempt unauthorized access or disrupt services</li>
                                <li>Copy, modify, or reverse engineer the Service</li>
                                <li>Perform actions harming or impairing Service functionality</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
                            <p className="mb-4">
                                The Service and its content are owned by Fretszy. You agree not to reproduce or misuse content without permission.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">4. Disclaimer of Warranties</h2>
                            <p className="mb-4">
                                The Service is provided "AS IS" without warranties of any kind regarding its availability, accuracy, or performance.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
                            <p className="mb-4">
                                Fretszy isn't liable for indirect, incidental, or consequential damages related to your use or inability to use the Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">4. Advertising</h2>
                            <p className="mb-4">
                                We may use third-party advertising services, like Google AdSense, to display personalized ads. These companies might use cookies to deliver relevant ads based on your browsing history. You can manage your preferences via browser settings.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
                            <p className="mb-4">
                                Fretszy is not liable for indirect, incidental, consequential, or punitive damages related to your use of or inability to use the Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">5. Termination</h2>
                            <p className="mb-4">
                                We may terminate or suspend your account without notice at our discretion. You can discontinue using the Service anytime.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">5. Changes to Terms</h2>
                            <p className="mb-4">
                                We may update these Terms periodically. Your continued use after updates indicates acceptance of the revised terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">6. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and interpreted according to the laws of India, irrespective of conflict of law principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
                            <p className="mb-2">Questions? Reach us at:</p>
                            <div className="bg-gray-50 rounded p-4">
                                <p><strong>Email:</strong> support@fretszy.com</p>
                                <p><strong>Call Us:</strong> <a href="tel:+917002505588" className="text-blue-600 hover:underline">+91 70025 05588</a></p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TermsOfService;
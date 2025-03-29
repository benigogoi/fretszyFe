import React from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
    return (
        <Layout>
            <div className="pt-20 pb-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h1 className="text-3xl font-bold mb-8 text-center">Guitar Fretboard Resources</h1>
                    <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                        We've compiled a collection of helpful resources to supplement your fretboard learning journey.
                        From printable diagrams to interactive exercises, you'll find everything you need to accelerate your progress.
                    </p>

                    {/* Free downloads section */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Free Printable Resources</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Fretboard Diagram */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">Complete Fretboard Note Chart</h3>
                                    <p className="text-gray-600 mb-4">A printable diagram showing all notes on the guitar fretboard. Perfect for reference during practice.</p>
                                    <Button variant="primary" size="sm">Download PDF</Button>
                                </div>
                            </div>

                            {/* Scale Patterns */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">Major Scale Patterns</h3>
                                    <p className="text-gray-600 mb-4">Five CAGED positions for the major scale with fingerings and pattern explanations.</p>
                                    <Button variant="primary" size="sm">Download PDF</Button>
                                </div>
                            </div>

                            {/* Practice Planner */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">Fretboard Practice Planner</h3>
                                    <p className="text-gray-600 mb-4">A 30-day progressive practice guide to help you memorize the entire fretboard in one month.</p>
                                    <Button variant="primary" size="sm">Download PDF</Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interactive tools section */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Interactive Learning Tools</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Fretboard Trainer */}
                            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">Note Recognition Game</h3>
                                </div>
                                <p className="mb-4">
                                    Test your fretboard knowledge with our interactive note recognition game.
                                    Customize difficulty levels and string ranges to focus on specific areas of the fretboard.
                                </p>
                                <Link to="/">
                                    <Button variant="primary">Start Playing</Button>
                                </Link>
                            </div>

                            {/* Interval Trainer */}
                            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                                <div className="flex items-center mb-4">
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold">Scale Visualization Tool</h3>
                                </div>
                                <p className="mb-4">
                                    Visualize scales, modes, and chord shapes across the entire fretboard.
                                    A great companion for improvisation practice and music theory study.
                                </p>
                                <Button variant="secondary">Coming Soon</Button>
                            </div>
                        </div>
                    </section>

                    {/* Video tutorials */}
                    <section className="mb-16">
                        <h2 className="text-2xl font-bold mb-6">Free Video Tutorials</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Video 1 */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                    <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg mb-2">The CAGED System Explained</h3>
                                    <p className="text-gray-600 mb-4">Learn how to use the CAGED system to visualize and navigate the entire fretboard with ease.</p>
                                    <p className="text-sm text-gray-500 mb-2">Duration: 15:32</p>
                                    <Button variant="secondary" size="sm">Watch Now</Button>
                                </div>
                            </div>

                            {/* Video 2 */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                    <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg mb-2">Speed Up Your Fretboard Learning</h3>
                                    <p className="text-gray-600 mb-4">Practical memory techniques and shortcuts to help you memorize the fretboard faster.</p>
                                    <p className="text-sm text-gray-500 mb-2">Duration: 12:47</p>
                                    <Button variant="secondary" size="sm">Watch Now</Button>
                                </div>
                            </div>

                            {/* Video 3 */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                    <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg mb-2">Octave Patterns & Fretboard Shortcuts</h3>
                                    <p className="text-gray-600 mb-4">How to use octave patterns to quickly find any note anywhere on the guitar fretboard.</p>
                                    <p className="text-sm text-gray-500 mb-2">Duration: 18:05</p>
                                    <Button variant="secondary" size="sm">Watch Now</Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ section */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="divide-y">
                                {/* FAQ Item 1 */}
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">How long does it take to learn the entire fretboard?</h3>
                                    <p className="text-gray-600">
                                        The timeline varies depending on practice consistency and prior knowledge. With dedicated practice
                                        using our resources and app, most guitarists can develop a functional knowledge of the fretboard in
                                        4-8 weeks. Complete mastery may take 3-6 months of regular practice.
                                    </p>
                                </div>

                                {/* FAQ Item 2 */}
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">What's the best method for memorizing the fretboard?</h3>
                                    <p className="text-gray-600">
                                        The most effective approach combines several methods: learning octave patterns, using the CAGED system,
                                        regular drills with a tool like Fretszy, and applying your knowledge in real musical contexts. Our 30-day
                                        practice planner integrates all these methods.
                                    </p>
                                </div>

                                {/* FAQ Item 3 */}
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">Should I learn music theory before memorizing the fretboard?</h3>
                                    <p className="text-gray-600">
                                        You don't need to master music theory first, but basic theory knowledge can make fretboard learning more
                                        meaningful. Understanding intervals, keys, and scale construction helps you see patterns and relationships
                                        between notes, rather than just memorizing isolated positions.
                                    </p>
                                </div>

                                {/* FAQ Item 4 */}
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">Does Fretszy work for bassists or other string instruments?</h3>
                                    <p className="text-gray-600">
                                        Currently, Fretszy is optimized for 6-string guitars in standard tuning. However, the principles and
                                        many of the exercises can be adapted for bass guitar, especially 4-string bass. We're considering
                                        adding dedicated support for bass and other string instruments in future updates.
                                    </p>
                                </div>

                                {/* FAQ Item 5 */}
                                <div className="p-6">
                                    <h3 className="font-bold text-lg mb-2">What if I use alternate tunings?</h3>
                                    <p className="text-gray-600">
                                        While Fretszy focuses on standard tuning, developing a strong foundation in standard tuning will help you
                                        adapt to alternate tunings more easily. The note relationships and patterns remain consistent—they're just
                                        shifted to different positions in alternate tunings.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default Resources;
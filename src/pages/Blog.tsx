import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import FeaturedBlogImg from '../assets/blogImage1.jpg';
import fretboardMemoryImage from '../assets/blogImg4.jpg';
import scaleVisualizationImage from '../assets/blogImg5.jpg';
import fastLearningImage from '../assets/blogImg6.jpg';
=======
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import FeaturedBlogImg from '../assets/blogImage1.jpg';
import fretboardMemoryImage  from '../assets/blogImg4.jpg';
import scaleVisualizationImage  from '../assets/blogImg5.jpg';
import fastLearningImage  from '../assets/blogImg6.jpg';
>>>>>>> 9e8b03c4c11e3fee722852612c1ccd6987ae5506

// Import blog post images
// In a real implementation, these would be properly stored and optimized
const blogImages = {
    lowEString: 'https://via.placeholder.com/800x450?text=Low+E+String+Mastery',
    fretboardMemory: fretboardMemoryImage,
    scaleVisualization: scaleVisualizationImage,
    fastLearning: fastLearningImage
};

// Blog posts data
const blogPosts = [
    {
        id: 'master-low-e-string',
        title: 'The Fast Track to Fretboard Mastery: Start with the Low E String',
        excerpt: 'Discover how mastering the notes on the Low E string creates a foundation for complete fretboard knowledge using pattern recognition and string relationships.',
        date: 'March 25, 2025',
        author: 'Sarah Johnson',
        category: 'Learning Techniques',
        readingTime: '7 min read',
        image: blogImages.lowEString,
        featured: true
    },
    {
        id: 'importance-of-note-memorization',
        title: 'Why Memorizing the Notes is Essential for Guitar Excellence',
        excerpt: 'Understanding why learning the fretboard note-by-note is a non-negotiable skill for advancing your playing and musical comprehension.',
        date: 'March 18, 2025',
        author: 'Michael Chen',
        category: 'Music Theory',
        readingTime: '6 min read',
        image: blogImages.fretboardMemory
    },
    {
        id: 'scale-visualization-techniques',
        title: 'How Note Knowledge Transforms Scale Visualization',
        excerpt: 'Learn how understanding the note layout on your fretboard helps you visualize scale patterns more effectively and break free from fixed positions.',
        date: 'March 10, 2025',
        author: 'Sarah Johnson',
        category: 'Scale Patterns',
        readingTime: '8 min read',
        image: blogImages.scaleVisualization
    },
    {
        id: 'learn-scales-faster',
        title: 'Master Scales in Half the Time with Proper Note Knowledge',
        excerpt: 'Accelerate your scale learning by understanding the underlying note relationships that create patterns across the entire fretboard.',
        date: 'March 5, 2025',
        author: 'Alex Rivera',
        category: 'Practice Techniques',
        readingTime: '5 min read',
        image: blogImages.fastLearning
    }
];

const Blog: React.FC = () => {
    // Get featured post
    const featuredPost = blogPosts.find(post => post.featured);
    // Get remaining posts
    const regularPosts = blogPosts.filter(post => !post.featured);

    return (
<<<<<<< HEAD
        <div className="pt-8 pb-12 bg-black text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Blog Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Fretszy Guitar Blog</h1>
                    <p className="text-lg mb-4">
                        Practical tips and strategies to help you master the guitar fretboard and accelerate your playing progress.
                    </p>
                </div>

                {/* Featured Post */}
                {featuredPost && (
                    <div className="mb-16">
                        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="md:flex md:items-center">
                                <div className="md:w-1/2 h-56 md:h-64 overflow-hidden">
                                    <img
                                        src={FeaturedBlogImg}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover"
                                        style={{
                                            objectPosition: "center 40%",
                                            transform: "scale(1.2) translateY(-10%)"
                                        }}
                                    />
                                </div>
                                <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <span className="text-sm text-gray-400">{featuredPost.readingTime}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold mb-3 hover:text-blue-400 transition-colors duration-300">
                                            <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                                        </h2>
                                        <p className="text-gray-300">{featuredPost.excerpt}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800">
                                        <p className="text-sm text-gray-400">{featuredPost.date}</p>
                                        <Link
                                            to={`/blog/${featuredPost.id}`}
                                            className="text-blue-400 hover:text-blue-300 font-medium flex items-center"
                                        >
                                            Read More
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                            </svg>
=======
        <Layout>
            <div className="pt-20 pb-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    {/* Blog Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">Fretszy Guitar Blog</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Practical tips and strategies to help you master the guitar fretboard and accelerate your playing progress.
                        </p>
                    </div>

                    {/* Featured Post */}
                    {featuredPost && (
                        <div className="mb-16">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="md:flex md:items-center"> {/* Added items-center for vertical alignment */}
                                    <div className="md:w-1/2 h-56 md:h-64 overflow-hidden"> {/* Reduced height */}
                                        <img
                                            src={FeaturedBlogImg}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover"
                                            style={{
                                                objectPosition: "center 40%",
                                                transform: "scale(1.2) translateY(-10%)"
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between"> {/* Added flex and justify-between */}
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <span className="text-sm text-gray-600">{featuredPost.readingTime}</span>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-3 hover:text-blue-600 transition-colors duration-300">
                                                <Link to={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                                            </h2>
                                            <p className="text-gray-700">{featuredPost.excerpt}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                            <p className="text-sm text-gray-500">{featuredPost.date}</p>
                                            <Link
                                                to={`/blog/${featuredPost.id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                                            >
                                                Read More
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search and Category Filters */}
                    <div className="mb-10 flex flex-col md:flex-row justify-between items-center">
                        {/* <div className="mb-4 md:mb-0 relative w-full md:w-64">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div> */}

                        <div className="flex flex-wrap gap-2">
                            <Button variant="secondary" size="sm">All Topics</Button>
                            <Button variant="secondary" size="sm">Learning Techniques</Button>
                            <Button variant="secondary" size="sm">Music Theory</Button>
                            <Button variant="secondary" size="sm">Scale Patterns</Button>
                            <Button variant="secondary" size="sm">Practice Tips</Button>
                        </div>
                    </div>

                    {/* Regular Posts Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                <Link to={`/blog/${post.id}`}>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-48 w-full object-cover"
                                    />
                                </Link>
                                <div className="p-6">
                                    <div className="flex items-center mb-3">
                                        <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">
                                            {post.category}
                                        </span>
                                        <span className="mx-2 text-gray-400">•</span>
                                        <span className="text-xs text-gray-600">{post.readingTime}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors duration-300">
                                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center">
                                            {/* <div className="w-7 h-7 rounded-full bg-gray-300 mr-2"></div> */}
                                            {/* <div>
                                                <p className="text-xs font-medium">{post.author}</p>
                                                <p className="text-xs text-gray-500">{post.date}</p>
                                            </div> */}
                                        </div>
                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Read More
>>>>>>> 9e8b03c4c11e3fee722852612c1ccd6987ae5506
                                        </Link>
                                    </div>
                                </div>
                            </div>
<<<<<<< HEAD
                        </div>
                    </div>
                )}

                {/* Category Filters */}
                <div className="mb-10 flex flex-wrap justify-center gap-2">
                    <Button variant="secondary" size="sm">All Topics</Button>
                    <Button variant="secondary" size="sm">Learning Techniques</Button>
                    <Button variant="secondary" size="sm">Music Theory</Button>
                    <Button variant="secondary" size="sm">Scale Patterns</Button>
                    <Button variant="secondary" size="sm">Practice Tips</Button>
                </div>

                {/* Regular Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {regularPosts.map((post) => (
                        <div key={post.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                            <Link to={`/blog/${post.id}`}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-48 w-full object-cover"
                                />
                            </Link>
                            <div className="p-6">
                                <div className="flex items-center mb-3">
                                    <span className="inline-block bg-gray-800 text-gray-300 text-xs font-semibold px-2 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                    <span className="mx-2 text-gray-500">•</span>
                                    <span className="text-xs text-gray-400">{post.readingTime}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 hover:text-blue-400 transition-colors duration-300">
                                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                </h3>
                                <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-xs text-gray-500">{post.date}</p>
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
=======
                        ))}
                    </div>


                </div>
            </div>
        </Layout>
>>>>>>> 9e8b03c4c11e3fee722852612c1ccd6987ae5506
    );
};

export default Blog;
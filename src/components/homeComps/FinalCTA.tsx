// src/components/homeComps/FinalCTA.tsx
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Ready to improve your guitar skills?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of learners already using Fretszy to master the
          fretboard and become better guitarists.
        </p>
        <Link
          to="/tools"
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Explore The Tools
        </Link>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-full p-2 mr-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-gray-300">Free to start</span>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-full p-2 mr-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-gray-300">No downloads needed</span>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-full p-2 mr-2">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-gray-300">Works on all devices</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;

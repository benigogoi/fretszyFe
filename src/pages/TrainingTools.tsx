// src/pages/AllToolsPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateTitle } from "../utils/SEOUtils";
import { mainGradient } from "../utils/GradientUtils";
import fretboardGameImg from "../assets/noteFinderFeatureThumb.png";
import pentaImg from "../assets/pentaThumb.png";

// Tool data structure
interface Tool {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  tags: string[];
  status: "available" | "coming-soon";
  skillLevel: "beginner" | "intermediate" | "advanced";
}

const AllToolsPage = () => {
  // Update page title
  useEffect(() => {
    updateTitle("All Guitar Tools | Fretszy");
  }, []);

  // Tool data - in a real app, this would likely come from an API or context
  const tools: Tool[] = [
    {
      id: "fretboard-note-finder",
      title: "Fretboard Note Finder",
      description: "Challenge yourself with real-time note recognition drills. Master the notes on your guitar fretboard with this interactive training game.",
      image: fretboardGameImg,
      path: "/games/fretboard",
      tags: ["beginner", "music theory"],
      status: "available",
      skillLevel: "beginner"
    },
    {
      id: "pentatonic-shapes",
      title: "Pentatonic Scale Shapes",
      description: "Explore and connect the 5 pentatonic shapes across the entire fretboard. Visualize patterns and build your soloing vocabulary.",
      image: pentaImg,
      path: "/games/pentatonic-shapes",
      tags: ["beginner", "scales", "music theory"],
      status: "available",
      skillLevel: "beginner"
    },
    {
      id: "ear-training",
      title: "Pitch & Ear Training",
      description: "Develop your musical ear with interval recognition, chord identification, and pitch matching exercises.",
      image: "",
      path: "/games/ear-training",
      tags: ["intermediate", "ear training"],
      status: "coming-soon",
      skillLevel: "intermediate"
    },
    {
      id: "progress-analytics",
      title: "Progress Analytics",
      description: "Track your training progress over time with detailed analytics. Set goals, view improvements, and identify areas for further practice.",
      image: "",
      path: "/tools/progress",
      tags: ["statistics", "tracking"],
      status: "coming-soon",
      skillLevel: "beginner"
    },
    {
      id: "scale-explorer",
      title: "Scale Explorer",
      description: "Interactive tool to explore and visualize different scales across the fretboard. Perfect for expanding your musical vocabulary beyond pentatonics.",
      image: "",
      path: "/tools/scales",
      tags: ["intermediate", "scales", "music theory"],
      status: "coming-soon",
      skillLevel: "intermediate"
    },
    {
      id: "rhythm-trainer",
      title: "Rhythm Trainer",
      description: "Develop your rhythmic precision and timing with interactive exercises. Master complex time signatures and improve your groove.",
      image: "",
      path: "/tools/rhythm",
      tags: ["intermediate", "rhythm", "timing"],
      status: "coming-soon",
      skillLevel: "intermediate"
    }
  ];
  
  // State for active filter
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="bg-black min-h-screen">
      {/* Header section */}
      <div className="relative w-full overflow-hidden" style={{ height: "140px" }}>
        {/* Custom gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: mainGradient,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center">All Tools</h1>
            <p className="text-white text-center max-w-2xl mx-auto mt-2 text-sm md:text-base">
              Browse our complete collection of guitar learning and practice tools
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button 
            className={`${activeFilter === "all" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"} text-white py-1 px-4 rounded-full text-sm transition-colors`}
            onClick={() => setActiveFilter("all")}
          >
            All Tools
          </button>
          <button 
            className={`${activeFilter === "available" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"} text-white py-1 px-4 rounded-full text-sm transition-colors`}
            onClick={() => setActiveFilter("available")}
          >
            Available Now
          </button>
          <button 
            className={`${activeFilter === "coming-soon" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"} text-white py-1 px-4 rounded-full text-sm transition-colors`}
            onClick={() => setActiveFilter("coming-soon")}
          >
            Coming Soon
          </button>
          <button 
            className={`${activeFilter === "beginner" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"} text-white py-1 px-4 rounded-full text-sm transition-colors`}
            onClick={() => setActiveFilter("beginner")}
          >
            Beginner
          </button>
          <button 
            className={`${activeFilter === "intermediate" ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"} text-white py-1 px-4 rounded-full text-sm transition-colors`}
            onClick={() => setActiveFilter("intermediate")}
          >
            Intermediate
          </button>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools
            .filter(tool => {
              if (activeFilter === "all") return true;
              if (activeFilter === "available") return tool.status === "available";
              if (activeFilter === "coming-soon") return tool.status === "coming-soon";
              if (activeFilter === "beginner") return tool.skillLevel === "beginner";
              if (activeFilter === "intermediate") return tool.skillLevel === "intermediate";
              return true;
            })
            .map((tool) => (
            <div
              key={tool.id}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:shadow-lg transition-shadow hover:border-blue-600 duration-300 h-full flex flex-col"
            >
              <div className="h-48 relative overflow-hidden bg-gray-800 flex items-center justify-center">
                {tool.status === "available" && tool.image ? (
                  <>
                    {/* Background styling */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-indigo-900/40"></div>
                    
                    {/* Guitar fretboard effects */}
                    <div className="absolute w-full h-px bg-white/10 top-1/3"></div>
                    <div className="absolute w-full h-px bg-white/10 top-2/3"></div>
                    <div className="absolute h-full w-px bg-white/10 left-1/3"></div>
                    <div className="absolute h-full w-px bg-white/10 left-2/3"></div>
                    
                    {/* Accent lighting */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/20 blur-xl rounded-full"></div>
                    
                    {/* Image */}
                    <img
                      src={tool.image}
                      alt={tool.title}
                      className="relative z-10 object-contain max-w-full max-h-full"
                      style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))" }}
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    {tool.status === "coming-soon" ? (
                      <div className="bg-blue-900/30 p-4 rounded-full">
                        <svg
                          className="w-12 h-12 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </div>
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  {tool.status === "coming-soon" && (
                    <span className="inline-block bg-blue-900/50 text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded mb-2">
                      Coming Soon
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-white">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-gray-400 mb-4 flex-grow">{tool.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-wrap gap-1">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-blue-900 rounded-full px-3 py-1 text-xs font-semibold text-blue-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {tool.status === "available" ? (
                    <Link
                      to={tool.path}
                      className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white font-semibold py-1 px-4 rounded-md shadow hover:shadow-md transition duration-300"
                    >
                      Try
                    </Link>
                  ) : (
                    <span className="inline-block bg-gray-800 text-gray-400 py-1 px-4 rounded-md text-sm cursor-not-allowed">
                      Soon
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* No results message */}
          {tools.filter(tool => {
            if (activeFilter === "all") return true;
            if (activeFilter === "available") return tool.status === "available";
            if (activeFilter === "coming-soon") return tool.status === "coming-soon";
            if (activeFilter === "beginner") return tool.skillLevel === "beginner";
            if (activeFilter === "intermediate") return tool.skillLevel === "intermediate";
            return true;
          }).length === 0 && (
            <div className="col-span-3 text-center py-16">
              <div className="bg-gray-900 rounded-lg p-8 inline-block mx-auto">
                <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-lg text-gray-400 mb-2">No tools found</h3>
                <p className="text-gray-600">There are no tools matching your selected filter.</p>
                <button 
                  onClick={() => setActiveFilter("all")} 
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
                >
                  Show all tools
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllToolsPage;
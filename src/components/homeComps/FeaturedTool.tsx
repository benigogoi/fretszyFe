// src/components/homeComps/FeaturedTool.tsx
import { Link } from "react-router-dom";
import OptimizedImage from "../common/OptimizedImage";

// Defining the Tool type for TypeScript
interface Tool {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  tags: string[];
}

interface FeaturedToolProps {
  featuredTools: Tool[];
}

const FeaturedTool: React.FC<FeaturedToolProps> = ({ featuredTools }) => {
  return (
    <div className="container mx-auto px-4 mt-4 mb-16">
      <h2 className="text-3xl text-center font-bold mb-4 text-white-400">
        Featured Tool
      </h2>
      {featuredTools.map((tool) => (
        <div
          key={tool.id}
          className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-800 hover:shadow-xl transition-all duration-300"
        >
          <div className="md:flex">
            <div className="md:w-1/2 h-auto overflow-hidden flex items-center justify-center relative">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50"></div>
              
              {/* Guitar string effect - subtle horizontal lines */}
              <div className="absolute w-full h-px bg-white/10 top-1/4"></div>
              <div className="absolute w-full h-px bg-white/10 top-2/4"></div>
              <div className="absolute w-full h-px bg-white/10 top-3/4"></div>
              
              {/* Fretboard markers */}
              <div className="absolute h-full w-px bg-white/10 left-1/4"></div>
              <div className="absolute h-full w-px bg-white/10 left-2/4"></div>
              <div className="absolute h-full w-px bg-white/10 left-3/4"></div>
              
              {/* Accent light */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/20 blur-xl rounded-full"></div>
              
              {/* Image container with subtle shadow - Using OptimizedImage */}
              <div className="relative z-10 p-6">
                <OptimizedImage
                  src={tool.image}
                  alt={tool.title}
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-md shadow-lg"
                  width={400} 
                  height={270}
                  style={{ 
                    filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))"
                  }}
                />
              </div>
            </div>
            <div className="p-8 md:w-1/2">
              <h3 className="text-2xl font-bold mb-3 text-white">
                {tool.title}
              </h3>
              <p className="text-gray-400 mb-6">{tool.description}</p>
              <div className="mb-6">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-blue-900 rounded-full px-3 py-1 text-sm font-semibold text-blue-300 mr-2 mb-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <Link
                to={tool.path}
                className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-md shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
              >
                Try Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedTool;
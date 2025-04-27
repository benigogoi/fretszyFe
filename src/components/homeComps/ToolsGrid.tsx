// src/components/homeComps/ToolsGrid.tsx
import { Link } from "react-router-dom";

// Defining the Tool type for TypeScript
interface Tool {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
  tags: string[];
}

interface ToolsGridProps {
  tools: Tool[];
}

const ToolsGrid: React.FC<ToolsGridProps> = ({ tools }) => {
  return (
    <div className="mt-16 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white-400">
          All Tools
        </h2>
        <Link 
          to="/tools"
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white font-semibold py-2 px-6 rounded-md shadow hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
        >
          View All
        </Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-800 hover:shadow-lg transition-shadow hover:transform hover:scale-105 duration-300"
          >
            <Link to={tool.path}>
              <div className="overflow-hidden h-40 flex items-center justify-center relative">
                {/* Background styling */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-indigo-900/40"></div>
                
                {/* Guitar fretboard effects */}
                <div className="absolute w-full h-px bg-white/10 top-1/3"></div>
                <div className="absolute w-full h-px bg-white/10 top-2/3"></div>
                <div className="absolute h-full w-px bg-white/10 left-1/3"></div>
                <div className="absolute h-full w-px bg-white/10 left-2/3"></div>
                
                {/* Accent lighting */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/20 blur-xl rounded-full"></div>
                
                {/* Image with enhanced styling - Added width/height and lazy loading */}
                <div className="relative z-10 p-3 transition-transform duration-300 transform hover:scale-110">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="w-auto h-auto max-w-full max-h-full object-contain rounded-md"
                    width="170" 
                    height="150"
                    loading="lazy"
                    style={{ 
                      filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))"
                    }}
                  />
                </div>
              </div>
            </Link>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white">
                {tool.title}
              </h3>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-900 rounded-full px-3 py-1 text-xs font-semibold text-blue-300 mr-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={tool.path}
                  className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-purple-500 text-white font-semibold py-1 px-4 rounded-md shadow hover:shadow-md transition-transform duration-300 transform hover:scale-105 text-sm"
                >
                  Try
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder for future tools */}
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-800 flex flex-col items-center justify-center p-10 text-center h-full group hover:bg-gray-800 transition-all duration-300">
          <div className="mb-4 bg-blue-900/30 p-4 rounded-full group-hover:transform group-hover:scale-110 transition-transform duration-300">
            <svg
              className="w-12 h-12 text-blue-500 mx-auto"
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
          <h3 className="text-xl font-bold mb-2 text-gray-300 group-hover:text-white transition-colors duration-300">
            More Tools Coming Soon
          </h3>
          <p className="text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
            We're developing new guitar tools to help you learn and improve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToolsGrid;
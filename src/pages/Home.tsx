// src/pages/Home.tsx
import { useEffect } from "react";
import { updateTitle } from "../utils/SEOUtils";
import noteFinderThumb from "../assets/noteFinderFeatureThumb.png";
import pentaImg from "../assets/pentaThumb.webp";

// Import Components
import Hero from "../components/homeComps/Hero";
import HowItWorks from "../components/homeComps/HowItWorks";
import FeaturedTool from "../components/homeComps/FeaturedTool";
import ToolsGrid from "../components/homeComps/ToolsGrid";
import WhyChoose from "../components/homeComps/WhyChoose";
import Testimonials from "../components/homeComps/Testimonials";
import FinalCTA from "../components/homeComps/FinalCTA";

const Home = () => {
  // Update page title
  useEffect(() => {
    updateTitle("Guitar Fretboard Training Tools | Fretszy");
  }, []);

  // Define your tool catalog (renamed from "games")
  const tools = [
    {
      id: "fretboard-notefinder",
      title: "Fretboard Note Finder",
      description: "Challenge yourself with real-time note recognition drills.",
      image: noteFinderThumb,
      path: "games/fretboard",
      tags: ["beginner", "music theory"],
    },
    {
      id: "pentatonic-scales",
      title: "Pentatonic scale shapes",
      description:
        "Explore and connect the 5 pentatonic shapes across the entire fretboard.",
      image: pentaImg,
      path: "games/pentatonic-shapes",
      tags: ["beginner", "scales", "music theory"],
    },
    // Add more tools as you develop them
  ];

  // Featured tools section
  const featuredTools = tools.slice(0, 1); // Just showing the first tool as featured for now

  return (
    <div className="bg-black">
      {/* Hero section */}
      <Hero />
      
      {/* How It Works section */}
      <HowItWorks />
      
      {/* Featured Tool section */}
      <FeaturedTool featuredTools={featuredTools} />
      
      {/* All Tools Grid section */}
      <div className="container mx-auto px-4">
        <ToolsGrid tools={tools} />
      </div>
      
      {/* Why Choose section */}
      <WhyChoose />
      
      {/* Testimonials section */}
      <Testimonials />
      
      {/* Final CTA section */}
      <FinalCTA />
    </div>
  );
};

export default Home;
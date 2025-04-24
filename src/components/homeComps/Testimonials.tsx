// src/components/homeComps/Testimonials.tsx

const Testimonials = () => {
  // Testimonials data
  const testimonials = [
    {
      quote: "I finally know all the notes on the fretboard thanks to Fretszy!",
      author: "Rohan S.",
      role: "Beginner Guitarist",
    },
    {
      quote: "These tools made my practice fun and productive.",
      author: "Aarti G.",
      role: "Intermediate Player",
    },
    {
      quote: "Simple yet powerful – great for beginners!",
      author: "Daniel K.",
      role: "Guitar Teacher",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          What Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 relative transition-transform duration-300 hover:transform hover:scale-105"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-6 text-blue-500 opacity-50">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Testimonial content */}
              <div className="pt-6">
                <p className="text-gray-300 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center mt-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

export default function LandingPage() {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 py-6 shadow-md">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-yellow-400">Fretszy</h1>
            <nav className="space-x-6">
              <a href="#tools" className="hover:text-yellow-300">Tools</a>
              <a href="#features" className="hover:text-yellow-300">Features</a>
              <a href="#faq" className="hover:text-yellow-300">FAQ</a>
            </nav>
          </div>
        </header>
  
        <section className="text-center py-20 px-4 bg-gradient-to-br from-gray-800 to-gray-900">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Master the Fretboard with Free Guitar Learning Tools
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Interactive tools, games, and trainers to help you memorize guitar notes, practice scales, and learn faster—completely free.
          </p>
          <a
            href="#tools"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-xl transition"
          >
            Explore Tools
          </a>
        </section>
  
        <section id="tools" className="py-16 bg-gray-950 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🎸 Fretboard Trainer</h3>
              <p className="text-gray-300">
                Learn and memorize the entire fretboard using interactive visual trainers. Ideal for beginners and intermediate players.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🧠 Memorization Game</h3>
              <p className="text-gray-300">
                Play games designed to build note recognition and recall. Great for anyone wanting to improve their speed and accuracy.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">📝 Fretboard Notes Quiz</h3>
              <p className="text-gray-300">
                Test yourself with dynamic quizzes that help reinforce learning through repetition and instant feedback.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">🔊 Scale Practice Tools</h3>
              <p className="text-gray-300">
                Practice pentatonic and major scales with guided tools and backing tracks. Build confidence and musicality.
              </p>
            </div>
          </div>
        </section>
  
        <section id="features" className="py-16 px-4 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6 text-yellow-300">Why Choose Fretszy?</h3>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li>✅ 100% Free – No account required</li>
              <li>✅ Beginner-friendly with fast learning curves</li>
              <li>✅ Gamified approach makes practice fun</li>
              <li>✅ Designed to improve fretboard memory and musical fluency</li>
            </ul>
          </div>
        </section>
  
        <section id="faq" className="py-16 bg-gray-950 px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-yellow-400 mb-8">Frequently Asked Questions</h3>
            <div className="space-y-6 text-gray-300">
              <div>
                <h4 className="font-semibold text-lg">Is Fretszy really free?</h4>
                <p>Yes! All tools are free to use—no sign-up required.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Who is this for?</h4>
                <p>Fretszy is perfect for beginners to intermediate players looking to learn faster and more effectively.</p>
              </div>
              <div>
                <h4 className="font-semibold text-lg">What makes this different from YouTube tutorials?</h4>
                <p>Our tools are interactive and game-based, helping you actively practice instead of just watching.</p>
              </div>
            </div>
          </div>
        </section>
  
        <footer className="bg-gray-800 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Fretszy. Built for guitar learners, by guitar lovers.
        </footer>
      </div>
    );
  }
  
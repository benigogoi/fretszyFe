import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Link, useNavigate } from "react-router-dom";
import { updateTitle, updateSEO } from "../../utils/SEOUtils";
import ResponsiveFretboard from "./components/core/ResponsiveFretboard";
import {
  generateAllFretboardNotes,
  getNoteAtPosition,
} from "./utils/FretboardUtils";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import StringSelection from "../../components/common/StringSelection";
import ReactGA from "react-ga4";
import emailjs from "emailjs-com";
import { useAuth } from "../../components/auth/useAuth";
import { saveLastLocation } from "../../utils/authRedirectUtils";
import MobileBlocker from "../../components/common/MobileBlocker";
import {
  getBestScore,
  saveGameScore,
  formatDate,
} from "../../services/gameScoreService";

// Define interface for target note
interface TargetNote {
  stringNumber: number;
  fretNumber: number;
  label: string;
  actualNote: string;
  color: string;
}

function FretboardGame() {
  useEffect(() => {
    // Enhanced SEO when page loads
    updateSEO(
      "Learn Guitar Fretboard Notes with This Interactive Trainer | Fretszy",
      "Train your brain with this interactive Guitar Fretboard Note Recognition Game. Learn all fretboard notes fast and boost your playing skills. Perfect for beginners and pros.",
      "https://fretszy.com/games/fretboard"
    );
  }, []);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Add a ref to track the current score
  const currentScoreRef = useRef(0);

  const triggerConfettiCelebration = () => {
    // Create a canvas-based confetti instance
    const duration = 3 * 1000; // 3 seconds
    const animationEnd = Date.now() + duration;

    // Function for the confetti animation frame
    const randomInRange = (min: number, max: number): number => {
      return Math.random() * (max - min) + min;
    };

    const confettiAnimation = () => {
      const timeLeft = animationEnd - Date.now();

      // Stop when animation time is up
      if (timeLeft <= 0) return;

      // Launch confetti pieces in each frame
      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.1, 0.5) },
        colors: [
          "#ff0000",
          "#00ff00",
          "#0000ff",
          "#ffff00",
          "#00ffff",
          "#ff00ff",
        ],
        disableForReducedMotion: true,
      });

      // Continue the animation
      requestAnimationFrame(confettiAnimation);
    };

    // Start the animation
    confettiAnimation();
  };

  // Initialize Google Analytics and EmailJS on app load
  useEffect(() => {
    // Initialize Google Analytics
    ReactGA.initialize("G-D37FBTN3TP");
    ReactGA.send({ hitType: "pageview", page: "/games/fretboard-notefinder" });

    // Initialize EmailJS
    emailjs.init("WR3raC70Oqwd00JG8");
  }, []);

  // Game settings state
  const [fretLength, setFretLength] = useState(12);
  const [startString, setStartString] = useState(6); // Default to 6th string (low E)
  const [endString, setEndString] = useState(1); // Default to 1st string (high E)

  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [targetNote, setTargetNote] = useState<TargetNote | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [timerActive, setTimerActive] = useState(false);
  const [guessResult, setGuessResult] = useState<boolean | null>(null);

  // Best score state
  const [bestScore, setBestScore] = useState(0);
  const [bestScoreDate, setBestScoreDate] = useState<string | null>(null);

  // Define number of frets to show
  const numberOfFrets = fretLength;

  // Update title based on game state
  useEffect(() => {
    if (gameActive) {
      updateTitle("Playing Note Recognition Game");
    } else if (gameEnded) {
      updateTitle(`Game Results: Score ${currentScoreRef.current}`);
    } else {
      updateTitle("Master the Guitar Fretboard");
    }
  }, [gameActive, gameEnded]);

  // Fetch best score when component mounts or game settings change
  // This will update when score changes during gameplay
  useEffect(() => {
    const fetchBestScore = async () => {
      if (isAuthenticated) {
        try {
          console.log("Fetching best score with current score:", score);
          // Pass the current score to getBestScore
          const bestScoreData = await getBestScore(
            "fretboard",
            fretLength,
            startString,
            endString,
            score
          );
          console.log("Received best score data:", bestScoreData);

          // Normal logic
          setBestScore(bestScoreData.score || 0);
          setBestScoreDate(bestScoreData.date_achieved);
        } catch (error) {
          console.error("Error fetching best score:", error);
        }
      }
    };

    fetchBestScore();
  }, [isAuthenticated, fretLength, startString, endString, score]);

  // Add an additional useEffect hook to fetch the best score immediately on component mount
  // This ensures the best score is loaded on initial page load, without depending on score
  useEffect(() => {
    const fetchInitialBestScore = async () => {
      if (isAuthenticated) {
        try {
          console.log("Fetching initial best score on component mount");
          const bestScoreData = await getBestScore(
            "fretboard",
            fretLength,
            startString,
            endString
          );
          console.log("Initial best score data:", bestScoreData);
          setBestScore(bestScoreData.score || 0);
          setBestScoreDate(bestScoreData.date_achieved);
        } catch (error) {
          console.error("Error fetching initial best score:", error);
        }
      }
    };

    // Only run this on component mount and when auth/settings change, not when score changes
    fetchInitialBestScore();
  }, [isAuthenticated, fretLength, startString, endString]);

  // Timer effect
  useEffect(() => {
    let interval: number | null = null;

    if (gameActive && timerActive) {
      interval = window.setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            if (interval) clearInterval(interval);
            setTimerActive(false);
            endGame();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!timerActive) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameActive, timerActive]);

  // Generate a random target note
  const generateRandomNote = (): TargetNote => {
    const stringNumber = Math.floor(
      Math.random() * (startString - endString + 1) + endString
    );
    const fretNumber = Math.floor(Math.random() * fretLength) + 1;
    const noteName = getNoteAtPosition(stringNumber, fretNumber);

    return {
      stringNumber,
      fretNumber,
      label: "?",
      actualNote: noteName,
      color: "#ff1493",
    };
  };

  // Start a new game
  const handleStartGame = () => {
    console.log("Starting game with best score:", bestScore);

    // Set initial score to 0
    const initialScore = 0;
    setScore(initialScore);
    currentScoreRef.current = initialScore;

    // For first-time players, ensure best score stays consistent
    if (bestScore === 0) {
      console.log("First time player - setting best score to 0");
      setBestScore(initialScore);
    }

    // Continue with normal game start
    setGameActive(true);
    setGameEnded(false);
    setTimeLeft(60);
    setTimerActive(true);
    setGuessResult(null);
    setTargetNote(generateRandomNote());
  };

  // End the current game
  const endGame = async () => {
    const finalScore = currentScoreRef.current;
    console.log(
      `GAME: endGame function called with final score: ${finalScore}`
    );

    setGameActive(false);
    setTimerActive(false);
    setGameEnded(true);
    setTargetNote(null);

    // For non-authenticated users, we'll just show the score
    if (!isAuthenticated) {
      console.log(`GAME: User not logged in. Score ${finalScore} displayed but not saved.`);
      // Still show the score and celebrate a good performance
      if (finalScore > 10) {
        triggerConfettiCelebration();
      }
      return;
    }

    // Save the score if the user is authenticated and score is greater than 0
    if (finalScore > 0) {
      try {
        console.log(`GAME: Attempting to save final score: ${finalScore}`);

        // Get current best score before saving
        const currentBestScore = bestScore;

        // Save the new score
        await saveGameScore(
          finalScore,
          "fretboard",
          fretLength,
          startString,
          endString
        );
        console.log("GAME: Score saved successfully to database");

        // Fetch the best score after saving
        const bestScoreData = await getBestScore(
          "fretboard",
          fretLength,
          startString,
          endString
        );

        console.log(`GAME: Updated best score: ${bestScoreData.score}`);
        setBestScore(bestScoreData.score || 0);
        setBestScoreDate(bestScoreData.date_achieved);

        // Check if this was a new record and trigger confetti if so
        if (finalScore > currentBestScore) {
          console.log("GAME: New record achieved! Triggering confetti.");
          triggerConfettiCelebration();
        }
      } catch (error) {
        console.error("GAME ERROR: Error saving score:", error);

        // If saving fails, still update UI if it's a new best score
        if (finalScore > bestScore) {
          setBestScore(finalScore);
          setBestScoreDate(new Date().toISOString());
          triggerConfettiCelebration();
        }
      }
    } else {
      console.log(`GAME: Score not saved: score=${finalScore} is too low`);
    }
  };

  // Handle the manual end game button
  const handleEndGame = () => {
    console.log(
      `GAME: handleEndGame called, current score: ${currentScoreRef.current}`
    );
    endGame();
  };

  // Reset to original state
  const handleReset = () => {
    setGameEnded(false);
    setTargetNote(null);
  };

  // Handle user's note guess
  const handleNoteGuess = (guessedNote: string) => {
    if (!targetNote || !targetNote.actualNote) return;

    const isCorrect = guessedNote === targetNote.actualNote;

    if (isCorrect) {
      setGuessResult(true);

      // Calculate new score and update both state and ref
      const newScore = score + 1;
      setScore(newScore);
      currentScoreRef.current = newScore; // Update the ref with current score
      console.log(
        `Score updated: ${newScore} (ref: ${currentScoreRef.current})`
      );

      // If this is a new high score, update best score immediately
      if (newScore > bestScore) {
        console.log("New best score during gameplay!", newScore);
        setBestScore(newScore);
        setBestScoreDate(new Date().toISOString());
      }

      setTargetNote({ ...targetNote, label: "✓", color: "#22c55e" });

      setTimeout(() => {
        setTargetNote(generateRandomNote());
        setGuessResult(null);
      }, 1000);
    } else {
      setGuessResult(false);
      setTargetNote({ ...targetNote, label: "✗", color: "#ef4444" });

      setTimeout(() => {
        setTargetNote({ ...targetNote, label: "?", color: "#ff1493" });
        setGuessResult(null);
      }, 1000);
    }
  };

  // Notes for display in the fretboard
  const displayNotes = gameActive
    ? targetNote
      ? [targetNote]
      : []
    : generateAllFretboardNotes(6, numberOfFrets, 1);

  // Use different fret length options based on desktop
  const fretLengthOptions = [
    { value: 5, label: "5 Frets" },
    { value: 7, label: "7 Frets" },
    { value: 9, label: "9 Frets" },
    { value: 12, label: "12 Frets" },
    { value: 15, label: "15 Frets" },
    { value: 24, label: "24 Frets" },
  ];

  // All possible notes for the note selector
  const allNotes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
  };

  // String labels for the view
  const getStringName = (num: number): string => {
    const labels = [
      "1st (high E)",
      "2nd (B)",
      "3rd (G)",
      "4th (D)",
      "5th (A)",
      "6th (low E)",
    ];
    return labels[num - 1] || `${num}th`;
  };

  return (
    <div className="pt-6 pb-8 bg-gray-900 text-white min-h-screen">
      {/* Add the mobile blocker component */}
      <MobileBlocker toolName="Fretboard Note Finder" />
      
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <Link
            to="/tools"
            className="text-blue-400 hover:text-blue-300 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Tools
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center text-white">
          Learn Guitar Fretboard Notes with This Interactive Trainer
        </h1>
        
        {!gameActive && !gameEnded && (
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-blue-400">
            Play the Note Recognition Game and Master the Fretboard Fast
          </h2>
        )}
        
        {!gameActive && !gameEnded && (
          <div className="max-w-3xl mx-auto mb-6">
            <p className="text-gray-300 text-center">
              Struggling to memorize the guitar fretboard? Use Fretszy's Fretboard Note Finder — a free online tool to practice, visualize, and recognize notes across all strings and frets. Whether you're a beginner or an advanced player, this interactive fretboard trainer helps you master the neck, boost your note memory, and improve your soloing skills.
            </p>
          </div>
        )}

        {gameActive ? (
          <div className="game-view-container h-[calc(100vh-200px)] flex flex-col">
            {/* Game status bar - fixed at top */}
            <div className="container mx-auto px-4 md:px-14">
              <div className="game-status flex items-center justify-between p-4 bg-gray-800 text-white rounded-lg mb-4 shadow-lg border border-gray-700">
                <div className="flex items-center space-x-6 md:space-x-10">
                  <div className="score flex items-center">
                    <span className="font-bold mr-2">Score:</span>
                    <span className="text-xl font-semibold">{score}</span>
                  </div>
                  <div className="timer flex items-center">
                    <span className="font-bold mr-2">Time:</span>
                    <span className="text-xl font-semibold">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold mr-2">Best:</span>
                    <span className="text-xl font-semibold text-yellow-400">
                      {bestScore}
                    </span>
                  </div>
                </div>
                <Button variant="danger" size="sm" onClick={handleEndGame}>
                  End Game
                </Button>
              </div>
            </div>

            {/* Fretboard container - fill available space */}
            <div className="fretboard-container flex-grow flex flex-col justify-center items-center mb-0 overflow-hidden pb-16">
              <ResponsiveFretboard
                numberOfFrets={numberOfFrets}
                notes={displayNotes}
                gameActive={gameActive}
                targetNote={targetNote}
                guessResult={guessResult}
                scale={0.9}
              />
            </div>

            {/* Note selector - fixed at bottom */}
            <div className="note-selector fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 py-4 z-50 shadow-lg">
              <div className="container mx-auto px-4 md:px-16">
                <h4 className="text-sm font-bold mb-2 text-center text-white">
                  Select the correct note:
                </h4>
                <div className="grid grid-cols-6 gap-1 md:gap-2">
                  {allNotes.map((note) => (
                    <button
                      key={note}
                      className={`py-2 px-0 font-bold rounded text-sm md:text-base text-white transition-colors ${
                        note.includes("#")
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      onClick={() => handleNoteGuess(note)}
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-6 pb-8">
            <div className="container mx-auto px-4">
              {!gameEnded && (
                <div>
                  <p className="text-lg text-center mb-6 text-gray-300">
                    Test your fretboard skills with the Guitar Note Recognition
                    Game! Boost memory, improve playing, and track progress.
                    Perfect for all guitarists! Play now!
                  </p>
                  <h2 className="text-2xl font-bold text-center mt-6 mb-4 text-white">
                    Start Training Your Fretboard Skills
                  </h2>
                </div>
              )}

              {/* Best Score Section - Only show for authenticated users with a best score */}
              {isAuthenticated && bestScore > 0 && !gameEnded && (
                <div className="best-score mb-4 p-3 bg-gray-800 rounded-lg text-center border border-yellow-700 shadow-lg">
                  <h3 className="text-lg font-bold mb-1 text-yellow-400">
                    Your Best Score
                  </h3>
                  <div className="flex justify-center items-center space-x-4">
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-white">
                        {bestScore}
                      </span>
                      <span className="text-xs text-gray-400">points</span>
                    </div>
                    {bestScoreDate && (
                      <div className="text-center">
                        <span className="block text-sm text-gray-300">
                          {formatDate(bestScoreDate)}
                        </span>
                        <span className="text-xs text-gray-400">
                          date achieved
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Login prompt for non-authenticated users in initial state */}
              {!isAuthenticated && !gameEnded && (
                <div className="mb-4 p-3 bg-gray-800 rounded-lg text-center border border-gray-700 shadow-lg">
                  <p className="text-gray-300 mb-2">
                    You can play without an account, but creating one lets you save scores and track progress!
                  </p>
                </div>
              )}

              {gameEnded && (
                <div className="game-summary mb-6 p-4 bg-gray-800 rounded-lg text-center border border-gray-700 shadow-lg">
                  <h2 className="text-xl font-bold mb-2 text-white">
                    Game Over!
                  </h2>
                  <p className="text-lg mb-2 text-gray-300">
                    Your final score:{" "}
                    <span className="font-bold text-blue-400">
                      {currentScoreRef.current}
                    </span>
                  </p>

                  {/* Show best score if the user is authenticated */}
                  {isAuthenticated && bestScore > 0 && (
                    <div className="mt-3 mb-3 pt-3 border-t border-gray-700">
                      <p className="text-gray-300">
                        Your best score:{" "}
                        <span className="font-bold text-yellow-400">
                          {bestScore}
                        </span>
                        {currentScoreRef.current > bestScore && (
                          <span className="ml-2 bg-green-900 text-green-300 px-2 py-1 rounded-full text-xs">
                            New Record!
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                  
                  {/* Login prompts for non-authenticated users */}
                  {!isAuthenticated && currentScoreRef.current > 0 && (
                    <div className="mt-3 mb-3 pt-3 border-t border-gray-700">
                      <p className="text-gray-300 mb-2">
                        Create an account to save your scores and track your progress!
                      </p>
                      <div className="flex justify-center gap-3">
                        <Link 
                          to="/login" 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                          onClick={() => saveLastLocation(window.location.pathname)}
                        >
                          Login
                        </Link>
                        <Link 
                          to="/signup" 
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                          onClick={() => saveLastLocation(window.location.pathname)}
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  )}

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleReset}
                    className="mt-2"
                  >
                    Play Again
                  </Button>
                </div>
              )}
              <div className="mb-4">
                <ResponsiveFretboard
                  numberOfFrets={numberOfFrets}
                  notes={displayNotes}
                  onNoteClick={undefined}
                  gameActive={false}
                  targetNote={null}
                  guessResult={null}
                  scale={0.9}
                />
              </div>
              {!gameEnded && (
                <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-white">
                      Fret Length
                    </label>
                    <Select
                      id="desktop-fret-length"
                      options={fretLengthOptions}
                      value={fretLength}
                      onChange={(e) => setFretLength(Number(e.target.value))}
                      variant="dark"
                    />
                  </div>
                  <StringSelection
                    startString={startString}
                    endString={endString}
                    onStartStringChange={setStartString}
                    onEndStringChange={setEndString}
                    variant="dark"
                  />
                  <Button
                    variant="success"
                    size="md"
                    onClick={handleStartGame}
                    className="mt-4 md:mt-0 md:ml-4"
                  >
                    Start Game
                  </Button>
                </div>
              )}
              
              {!gameEnded && (
                <>
                  <div className="mt-16 max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                    <h2 className="text-2xl font-bold mb-4 text-white">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-6 text-gray-300">
                      <div itemScope itemType="https://schema.org/Question">
                        <h3 itemProp="name" className="text-lg font-bold text-white mb-2">How can I memorize notes on the guitar fretboard?</h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <div itemProp="text">
                            <p>Practice regularly using interactive tools like the Fretszy Note Finder. Start with one string at a time, use visual patterns, and test yourself daily with the note recognition game.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div itemScope itemType="https://schema.org/Question">
                        <h3 itemProp="name" className="text-lg font-bold text-white mb-2">Is this fretboard trainer good for beginners?</h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <div itemProp="text">
                            <p>Absolutely. Beginners can limit the fret range and focus on the 6th to 4th strings before progressing. The Fretszy Note Finder is designed to grow with you as your skills develop.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div itemScope itemType="https://schema.org/Question">
                        <h3 itemProp="name" className="text-lg font-bold text-white mb-2">How long does it take to learn all the notes on the fretboard?</h3>
                        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                          <div itemProp="text">
                            <p>With daily 10-minute sessions using Fretszy, most players start recognizing all notes within a few weeks. Consistent practice is key, and the game format makes learning more engaging and effective.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 max-w-3xl mx-auto text-center">
                    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <h3 className="text-lg font-bold mb-2 text-white">Related Guitar Training Tools</h3>
                      <p className="text-gray-300 mb-3">Take your guitar skills to the next level with these related training tools:</p>
                      <Link to="/games/pentatonic-shapes" className="text-blue-400 hover:text-blue-300 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Try our Pentatonic Scale Trainer to connect scales across the fretboard!
                      </Link>
                    </div>
                  </div>
                </>
              )}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: `
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Fretszy Guitar Fretboard Trainer",
              "description": "Interactive guitar fretboard trainer to help guitarists learn notes and master the fretboard. Practice note recognition with our guitar learning game.",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Any",
              "keywords": "guitar fretboard notes, note recognition game, guitar note trainer, fretboard memorization, learn guitar notes",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Interactive fretboard visualization",
                "Guitar note recognition game",
                "Customizable fretboard length",
                "String selection options",
                "Score tracking and personal bests",
                "Fretboard memorization tool",
                "Guitar learning software"
              ]
            }
          `,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FretboardGame;
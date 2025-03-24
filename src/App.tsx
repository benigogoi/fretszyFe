/// <reference types="node" />
import { useState, useEffect } from 'react';
import './App.css';
import ResponsiveFretboard from './components/core/ResponsiveFretboard';
import { NoteData } from './components/core/NoteMarkers';
import { generateAllFretboardNotes, getNoteAtPosition } from './components/core/FretboardUtils';
import Layout from './components/layout/Layout';
import Button from './components/ui/Button';
import Select from './components/ui/Select';
import StringSelection from './components/ui/StringSelection';

function App() {
  // Game settings state
  const [fretLength, setFretLength] = useState(12);
  const [startString, setStartString] = useState(6); // Default to 6th string (low E)
  const [endString, setEndString] = useState(1);   // Default to 1st string (high E)
  const [isMobile, setIsMobile] = useState(false);

  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [targetNote, setTargetNote] = useState<NoteData | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [timerActive, setTimerActive] = useState(false);
  const [guessResult, setGuessResult] = useState<boolean | null>(null);

  // Define number of frets to show
  const numberOfFrets = fretLength;

  // Detect if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (gameActive && timerActive) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Time's up - end game
            clearInterval(interval as NodeJS.Timeout);
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
  const generateRandomNote = () => {
    // Random string between startString and endString
    const stringNumber = Math.floor(
      Math.random() * (startString - endString + 1) + endString
    );

    // Random fret between 1 and fretLength
    const fretNumber = Math.floor(Math.random() * fretLength) + 1;

    // Get the actual note name at this position
    const noteName = getNoteAtPosition(stringNumber, fretNumber);

    return {
      stringNumber,
      fretNumber,
      label: "?", // Replace note name with question mark
      actualNote: noteName, // Store the actual note for comparison
      color: '#ff1493' // Hot pink for target note
    };
  };

  // Start a new game
  const handleStartGame = () => {
    setGameActive(true);
    setGameEnded(false);
    setScore(0);
    setTimeLeft(60);
    setTimerActive(true);
    setGuessResult(null);
    setTargetNote(generateRandomNote());
  };

  // End the current game
  const endGame = () => {
    setGameActive(false);
    setTimerActive(false);
    setGameEnded(true);
    setTargetNote(null);
  };

  // Handle the manual end game button
  const handleEndGame = () => {
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
      // Correct guess
      setGuessResult(true);
      setScore(score + 1);

      // Update the target note to show the check mark and green color
      setTargetNote({
        ...targetNote,
        label: "✓", // Replace ? with check mark
        color: "#22c55e" // Green color
      });

      // Move to next note after a brief delay
      setTimeout(() => {
        setTargetNote(generateRandomNote());
        setGuessResult(null);
      }, 1000);
    } else {
      // Wrong guess - show X mark and red color
      setGuessResult(false);
      setTargetNote({
        ...targetNote,
        label: "✗", // X mark for wrong answer
        color: "#ef4444" // Red color
      });

      // Just show feedback briefly before returning to the question mark
      setTimeout(() => {
        setTargetNote({
          ...targetNote,
          label: "?",
          color: "#ff1493"
        });
        setGuessResult(null);
      }, 1000);
    }
  };

  // Notes for display in the fretboard
  const displayNotes = gameActive
    ? targetNote ? [targetNote] : []
    : generateAllFretboardNotes(6, numberOfFrets, 1);

  // Use different fret length options based on mobile/desktop
  const fretLengthOptions = isMobile
    ? [
      { value: 5, label: '5 Frets' },
      { value: 7, label: '7 Frets' },
      { value: 9, label: '9 Frets' },
      { value: 12, label: '12 Frets' }
    ]
    : [
      { value: 5, label: '5 Frets' },
      { value: 7, label: '7 Frets' },
      { value: 9, label: '9 Frets' },
      { value: 12, label: '12 Frets' },
      { value: 15, label: '15 Frets' },
      { value: 24, label: '24 Frets' }
    ];

  // All possible notes for the note selector
  const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // String labels for the simplified mobile view
  const getStringName = (num: number) => {
    const labels = ['1st (high E)', '2nd (B)', '3rd (G)', '4th (D)', '5th (A)', '6th (low E)'];
    return labels[num - 1] || `${num}th`;
  };

  return (
    <Layout>
      {/* Conditional layout based on game state */}
      {gameActive ? (
        // ACTIVE GAME VIEW - optimized for mobile to fit in one screen
        <div className="game-view-container min-h-screen flex flex-col">
          {/* 
            Updated this container to have pt-10 for mobile and pt-16 for md+ 
            (replacing pt-12).
          */}
          <div className="pt-4 md:pt-16 px-4 flex-5 flex flex-col">
            {/* Game Status Bar */}
            <div className="game-status flex items-center justify-between p-2 bg-gray-100 rounded mt-1">
              <div className="flex items-center space-x-10">
                <div className="score">
                  <span className="font-bold">Score:</span> {score}
                </div>
                <div className="timer">
                  <span className="font-bold">Time:</span> {formatTime(timeLeft)}
                </div>
              </div>
              <Button variant="danger" size="sm" onClick={handleEndGame}>
                End Game
              </Button>
            </div>

            {/* Fretboard Container - with flex-grow to take available space */}
            <div className="fretboard-container flex-grow flex flex-col justify-center items-center mb-2 overflow-hidden">
              <ResponsiveFretboard
                numberOfFrets={numberOfFrets}
                notes={displayNotes}
                gameActive={gameActive}
                targetNote={targetNote}
                guessResult={guessResult}
                scale={isMobile ? 0.69 : 0.9}
              />
            </div>

            {/* Note Selection - fixed at bottom with minimal padding */}
            <div className="note-selector py-2 bg-white border-t border-gray-200 mb-1">
              <h4 className="text-sm font-bold mb-1 text-center">Select the correct note:</h4>
              <div className="grid grid-cols-6 gap-1 px-1">
                {allNotes.map((note) => (
                  <button
                    key={note}
                    className="py-2 px-0 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded text-sm"
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
        // HOME VIEW - when not in active game
        <div className="pt-20 pb-24">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-3 text-center">
              Guitar Fretboard Mastery - Freboard Trainer
            </h1>

            {/* Only show intro paragraph on desktop */}
            {!gameEnded && (
              <div className="hidden md:block">
                <p className="text-lg text-center mb-6">
                  Test your fretboard skills with the Guitar Note Recognition Game!
                  Boost memory, improve playing, and track progress. Perfect for all guitarists! Play now!
                </p>
              </div>
            )}

            {/* Game Ended Summary */}
            {gameEnded && (
              <div className="game-summary mb-6 p-4 bg-blue-50 rounded-lg text-center">
                <h2 className="text-xl font-bold mb-2">Game Over!</h2>
                <p className="text-lg mb-2">
                  Your final score: <span className="font-bold text-blue-600">{score}</span>
                </p>
                <Button variant="primary" size="md" onClick={handleReset} className="mt-2">
                  Reset Game
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

            {/* Home Controls - Optimized for mobile */}
            {!gameEnded && (
              <div className="relative">
                {/* Only show on mobile view */}
                <div className="sm:hidden flex flex-col items-center">
                  <div className="w-full max-w-md mb-20">
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-1/2 pr-1">
                        <label className="block text-sm font-medium mb-1">Fret Length</label>
                        <Select
                          id="fret-length"
                          options={fretLengthOptions}
                          value={fretLength}
                          onChange={(e) => setFretLength(Number(e.target.value))}
                        />
                      </div>

                      <div className="w-1/2 pl-1">
                        <label className="block text-sm font-medium mb-1">String Range</label>
                        <div className="text-sm bg-gray-100 py-2 px-3 rounded-md border border-gray-300">
                          {getStringName(startString)} → {getStringName(endString)}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <StringSelection
                        startString={startString}
                        endString={endString}
                        onStartStringChange={setStartString}
                        onEndStringChange={setEndString}
                      />
                    </div>
                  </div>

                  {/* Floating Start Game Button */}
                  <div className="fixed bottom-24 left-0 right-0 px-4 z-40 flex justify-center">
                    <button
                      onClick={handleStartGame}
                      className="w-full max-w-md bg-green-500 hover:bg-green-600 
                                 text-white font-bold py-3 px-4 rounded-md shadow-lg 
                                 flex items-center justify-center"
                    >
                      <span>Start Game</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Desktop controls */}
                <div className="hidden sm:flex sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <div>
                    <label className="block mb-2 font-medium">Fret Length</label>
                    <Select
                      id="desktop-fret-length"
                      options={fretLengthOptions}
                      value={fretLength}
                      onChange={(e) => setFretLength(Number(e.target.value))}
                    />
                  </div>

                  <StringSelection
                    startString={startString}
                    endString={endString}
                    onStartStringChange={setStartString}
                    onEndStringChange={setEndString}
                  />

                  <Button
                    variant="success"
                    size="md"
                    onClick={handleStartGame}
                    className="mt-4 sm:mt-0 sm:ml-4"
                  >
                    Start Game
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile intro paragraph - show at the bottom */}
            {!gameEnded && (
              <div className="md:hidden mt-8">
                <p className="text-base text-center">
                  Test your fretboard skills with the Guitar Note Recognition Game!
                  Boost memory, improve playing, and track progress. Perfect for all guitarists! Play now!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default App;

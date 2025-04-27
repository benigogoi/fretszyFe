import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { updateTitle, updateSEO } from "../../utils/SEOUtils";
import ResponsiveFretboard from "../fretboard-notefinder/components/core/ResponsiveFretboard";
import { generateMultiplePentatonicPatterns } from "./utils/PentatonicUtils";
import { ScaleType, PatternPosition, NoteData } from "./types/PentatonicTypes";

function PentatonicShapeConnector() {
  useEffect(() => {
    updateSEO(
      "Pentatonic Scale Trainer - Practice Guitar Scales | Fretszy",
      "Train your pentatonic scale shapes across the fretboard with Fretszy's interactive tool. Practice minor and major pentatonic patterns easily. Play with backing tracks!",
      "https://fretszy.com/games/pentatonic-shapes"
    );
  }, []);
  // State for settings
  const [rootNote, setRootNote] = useState<string>("A");
  const [scaleType, setScaleType] = useState<ScaleType>("minor");
  const [selectedPatterns, setSelectedPatterns] = useState<PatternPosition[]>([
    1,
    2,
    3,
    4,
    5, // Default to showing all patterns
  ]);
  const [shape5Position, setShape5Position] = useState<string>("low"); // "low" or "high"
  const [shape4Position, setShape4Position] = useState<string>("standard"); // "standard" or "lower"
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [fretLength, setFretLength] = useState<number>(15);
  const [displayNotes, setDisplayNotes] = useState<NoteData[]>([]);

  // Metronome state
  const [metronomeActive, setMetronomeActive] = useState<boolean>(false);
  const [tempo, setTempo] = useState<number>(100);
  const audioContextRef = useRef<AudioContext | null>(null);
  const metronomeIntervalRef = useRef<number | null>(null);

  // Detect if mobile and set initial fret length
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setFretLength(window.innerWidth < 768 ? 12 : 17); // Increased default fretboard length
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Update title
  useEffect(() => {
    updateTitle("Pentatonic Scale Shape Connector");
  }, []);

  // Check if the current key should show the lower neck position option for shape 4
  const showShape4LowerOption = () => {
    return ["B", "C", "C#", "D", "D#"].includes(rootNote);
  };

  // Check if the current key should hide the shape 5 position selection
  const hideShape5PositionSelect = () => {
    return ["E", "F", "F#", "G"].includes(rootNote);
  };

  // For keys F, F#, G, use high position as default for shape 5
  useEffect(() => {
    if (["F", "F#", "G"].includes(rootNote)) {
      setShape5Position("high");
    } else if (rootNote === "E") {
      // For E, keep low position
      setShape5Position("low");
    }
  }, [rootNote]);

  // Update display notes whenever settings change
  useEffect(() => {
    try {
      // Handle Pattern 5 selection with position variant
      let patternsToUse = [...selectedPatterns];

      // Replace Pattern 5 with alt version if high position is selected
      if (selectedPatterns.includes(5)) {
        patternsToUse = patternsToUse.filter((p) => p !== 5);

        // For F, F#, G, always use high position
        if (["F", "F#", "G"].includes(rootNote)) {
          patternsToUse.push("5-alt" as any);
        } else {
          patternsToUse.push(shape5Position === "high" ? ("5-alt" as any) : 5);
        }
      }

      // Handle Pattern 4 with lower position if selected
      if (selectedPatterns.includes(4) && shape4Position === "lower") {
        patternsToUse = patternsToUse.filter((p) => p !== 4);
        patternsToUse.push("4-low" as any); // Add a new pattern type for the lower position of shape 4
      }

      const notes = generateMultiplePentatonicPatterns(
        rootNote,
        patternsToUse,
        scaleType,
        true, // Always show connectors
        0 // Start fret (auto position)
      );

      // Dynamically set fretboard length based on highest fret in use
      if (notes.length > 0) {
        const highestFret = Math.max(...notes.map((note) => note.fretNumber));
        // Add 2 frets of padding and ensure minimum of 15 or 12 (mobile) frets
        const newFretLength = Math.max(highestFret + 2, isMobile ? 12 : 17);
        setFretLength(newFretLength);
      }

      setDisplayNotes(notes);
    } catch (error) {
      console.error("Error generating pentatonic patterns:", error);
      setDisplayNotes([]);
    }
  }, [
    rootNote,
    scaleType,
    selectedPatterns,
    shape5Position,
    shape4Position,
    isMobile,
  ]);

  // Metronome functionality
  useEffect(() => {
    return () => {
      // Cleanup metronome on unmount
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const toggleMetronome = () => {
    if (metronomeActive) {
      // Stop metronome
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
      setMetronomeActive(false);
    } else {
      // Start metronome
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }

      const context = audioContextRef.current;
      const interval = 60000 / tempo; // ms per beat

      const playTick = () => {
        // Create a better metronome sound
        const oscillator = context.createOscillator();
        const envelope = context.createGain();

        // Connect the nodes
        oscillator.connect(envelope);
        envelope.connect(context.destination);

        // Set a higher frequency for a clearer "click" sound
        oscillator.frequency.value = 1800; // Higher frequency for a sharper click

        // Start with silence and quickly attack to full volume
        envelope.gain.setValueAtTime(0, context.currentTime);
        envelope.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.001);

        // Quick decay for a crisp sound
        envelope.gain.exponentialRampToValueAtTime(
          0.001,
          context.currentTime + 0.03
        );

        // Start and stop
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.03);
      };

      playTick(); // Play immediately when starting
      metronomeIntervalRef.current = window.setInterval(playTick, interval);
      setMetronomeActive(true);
    }
  };

  const handleTempoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTempo = parseInt(e.target.value, 10);
    setTempo(newTempo);

    // Update running metronome if active
    if (metronomeActive && metronomeIntervalRef.current) {
      clearInterval(metronomeIntervalRef.current);
      const interval = 60000 / newTempo;
      metronomeIntervalRef.current = window.setInterval(() => {
        if (audioContextRef.current) {
          const oscillator = audioContextRef.current.createOscillator();
          const envelope = audioContextRef.current.createGain();

          // Connect the nodes
          oscillator.connect(envelope);
          envelope.connect(audioContextRef.current.destination);

          // Set a higher frequency for a clearer "click" sound
          oscillator.frequency.value = 1800; // Higher frequency for a sharper click

          // Start with silence and quickly attack to full volume
          envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime);
          envelope.gain.linearRampToValueAtTime(
            0.3,
            audioContextRef.current.currentTime + 0.001
          );

          // Quick decay for a crisp sound
          envelope.gain.exponentialRampToValueAtTime(
            0.001,
            audioContextRef.current.currentTime + 0.03
          );

          // Start and stop
          oscillator.start(audioContextRef.current.currentTime);
          oscillator.stop(audioContextRef.current.currentTime + 0.03);
        }
      }, interval);
    }
  };

  // Toggle a specific pattern
  const togglePattern = (pattern: PatternPosition) => {
    if (selectedPatterns.includes(pattern)) {
      setSelectedPatterns(selectedPatterns.filter((p) => p !== pattern));
    } else {
      setSelectedPatterns([...selectedPatterns, pattern]);
    }
  };

  return (
    <div className="pt-6 pb-8 bg-gray-900 text-white min-h-screen">
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

        <h1 className="text-2xl md:text-3xl font-bold mb-5 text-center text-white">
          Pentatonic Scale Shape Connector
        </h1>

        <div className="fretboard-container mb-6">
          {displayNotes.length > 0 ? (
            <ResponsiveFretboard
              numberOfFrets={fretLength}
              notes={displayNotes}
              scale={isMobile ? 0.8 : 0.9}
            />
          ) : (
            <div className="p-8 text-center bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-lg text-gray-300">
                Select at least one pattern to visualize the scale
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-white">
                  Key
                </label>
                <select
                  value={rootNote}
                  onChange={(e) => setRootNote(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[
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
                  ].map((note) => (
                    <option key={note} value={note}>
                      {note}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-white">
                  Scale Type
                </label>
                <select
                  value={scaleType}
                  onChange={(e) => setScaleType(e.target.value as ScaleType)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="minor">Minor Pentatonic</option>
                  <option value="major">Major Pentatonic</option>
                </select>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-white">
                    Scale Patterns
                  </label>
                  <button
                    onClick={() =>
                      selectedPatterns.length === 5
                        ? setSelectedPatterns([])
                        : setSelectedPatterns([1, 2, 3, 4, 5])
                    }
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    {selectedPatterns.length === 5
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {([1, 2, 3] as PatternPosition[]).map((pattern) => (
                    <button
                      key={pattern}
                      className={`py-3 px-2 rounded font-medium transition-colors text-sm ${
                        selectedPatterns.includes(pattern)
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                      onClick={() => togglePattern(pattern)}
                    >
                      Shape{pattern}
                    </button>
                  ))}

                  {/* Shape 4 with dropdown option if in B-D# keys */}
                  <div className="relative">
                    <button
                      className={`py-3 px-2 rounded font-medium transition-colors text-sm w-full ${
                        selectedPatterns.includes(4)
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                      onClick={() => togglePattern(4)}
                    >
                      Shape4
                    </button>

                    {selectedPatterns.includes(4) &&
                      showShape4LowerOption() && (
                        <select
                          value={shape4Position}
                          onChange={(e) => setShape4Position(e.target.value)}
                          className="absolute top-full left-0 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 z-10"
                        >
                          <option value="standard">Standard Position</option>
                          <option value="lower">Lower Position</option>
                        </select>
                      )}
                  </div>

                  {/* Shape 5 with dropdown option (hidden for E, F, F#, G) */}
                  <div className="relative">
                    <button
                      className={`py-3 px-2 rounded font-medium transition-colors text-sm w-full ${
                        selectedPatterns.includes(5)
                          ? "bg-green-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                      onClick={() => togglePattern(5)}
                    >
                      Shape5
                    </button>

                    {selectedPatterns.includes(5) &&
                      !hideShape5PositionSelect() && (
                        <select
                          value={shape5Position}
                          onChange={(e) => setShape5Position(e.target.value)}
                          className="absolute top-full left-0 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 z-10"
                        >
                          <option value="low">Low Position (3rd fret)</option>
                          <option value="high">
                            High Position (15th fret)
                          </option>
                        </select>
                      )}
                  </div>
                </div>
              </div>

              <div className="metronome-controls">
                <label className="block text-sm font-medium mb-1 text-white">
                  Metronome: {tempo} BPM
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="60"
                    max="160"
                    value={tempo}
                    onChange={handleTempoChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                        ((tempo - 60) / 100) * 100
                      }%, #374151 ${
                        ((tempo - 60) / 100) * 100
                      }%, #374151 100%)`,
                    }}
                  />
                  <button
                    onClick={toggleMetronome}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      metronomeActive
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {metronomeActive ? "Stop" : "Start"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Understanding Pentatonic Shapes
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              <strong className="text-white">Pentatonic scales</strong> are
              five-note scales widely used across many genres of music,
              especially in blues, rock, and jazz.
            </p>
            <p>
              The five shapes shown here connect across the entire fretboard.
              For A minor pentatonic:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Shape 1:</strong> Frets 5-8 with root on low E string
                (5th fret)
              </li>
              <li>
                <strong>Shape 2:</strong> Frets 7-10 with root on D string (7th
                fret)
              </li>
              <li>
                <strong>Shape 3:</strong> Frets 9-13 with root on G string (9th
                fret)
              </li>
              <li>
                <strong>Shape 4:</strong> Frets 12-15 with root on G string
                (12th fret)
                {showShape4LowerOption() && (
                  <span>
                    {" "}
                    - Can be shown in lower position for keys B through D#
                  </span>
                )}
              </li>
              <li>
                <strong>Shape 5:</strong> Position varies by key:
                <ul className="list-disc pl-5 mt-1">
                  {!["F", "F#", "G"].includes(rootNote) && (
                    <li>
                      Low position (frets 2-5) with root on D string{" "}
                      {["E", "F", "F#", "G"].includes(rootNote)
                        ? "- Default for key " + rootNote
                        : ""}
                    </li>
                  )}
                  {!hideShape5PositionSelect() ||
                  ["F", "F#", "G"].includes(rootNote) ? (
                    <li>
                      High position (frets 14-17) with root on D string{" "}
                      {["F", "F#", "G"].includes(rootNote)
                        ? "- Default for key " + rootNote
                        : ""}
                    </li>
                  ) : null}
                </ul>
              </li>
            </ul>

            <p>
              <strong className="text-white">How to use this tool:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Select your root note and scale type (major or minor pentatonic)
              </li>
              <li>Choose which patterns you want to visualize (1-5)</li>
              <li>
                For Shape 5, position options vary by key (some keys
                automatically use high position)
              </li>
              {showShape4LowerOption() && (
                <li>
                  For Shape 4, you can select a lower position option for
                  certain keys
                </li>
              )}
              <li>Use the metronome to practice at your desired tempo</li>
              <li>
                Practice the shapes individually, then work on connecting them
              </li>
            </ul>
            <p>
              With consistent practice, you'll be able to navigate the entire
              fretboard fluidly, opening up new possibilities for your playing
              and improvisation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PentatonicShapeConnector;

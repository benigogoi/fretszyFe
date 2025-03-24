import React from 'react';
import { NoteData } from './NoteMarkers';

type MobileFretboardProps = {
    numberOfFrets: number;
    numberOfStrings?: number;
    tuning?: string[];
    notes?: NoteData[];
    onNoteClick?: (note: NoteData) => void;
    gameActive?: boolean;
    targetNote?: NoteData | null;
    guessResult?: boolean | null;
    scale?: number;
};

const MobileFretboard: React.FC<MobileFretboardProps> = ({
    numberOfFrets = 12,
    numberOfStrings = 6,
    // tuning = ['E', 'A', 'D', 'G', 'B', 'E'],
    notes = [],
    onNoteClick,
    // gameActive = false,
    targetNote = null,
    guessResult = null,
    scale = 1.0
}) => {
    // Constants for dimensions
    const fretHeight = 50 * scale; // Height of each fret space
    const noteSize = 32 * scale; // Larger note size for touch

    // For mobile view, limit to max 12 frets
    const visibleFrets = Math.min(numberOfFrets, 12);

    // Filter notes to only show those on the visible fretboard
    const displayNotes = notes.filter(note =>
        note.fretNumber > 0 &&
        note.fretNumber <= visibleFrets &&
        note.stringNumber <= numberOfStrings
    );

    // Function to get note color based on state
    const getNoteColor = (note: NoteData) => {
        const isTarget = targetNote &&
            note.stringNumber === targetNote.stringNumber &&
            note.fretNumber === targetNote.fretNumber;

        if (isTarget) {
            if (guessResult === true) return '#22c55e'; // Green for correct
            if (guessResult === false) return '#ef4444'; // Red for wrong
            return '#ff1493'; // Pink for target
        }

        return note.color || '#4f46e5';
    };

    // Fret numbers to display
    const fretNumbers = [3, 5, 7, 9, 12].filter(fret => fret <= visibleFrets);

    // Standard guitar tuning from low E (6th) to high e (1st)
    // We're displaying strings left to right: low E, A, D, G, B, high E
    const standardTuning = ['E', 'A', 'D', 'G', 'B', 'E'];

    return (
        <div className="w-full pb-4">
            {/* String labels aligned with strings */}
            <div className="flex pl-6">
                {standardTuning.map((note, idx) => (
                    <div
                        key={`string-label-${idx}`}
                        className="font-bold flex-1 text-center"
                    >
                        {note}
                    </div>
                ))}
            </div>

            <div className="flex">
                {/* Main fretboard with absolute positioned fret numbers */}
                <div className="relative flex-grow p-4">
                    {/* Fret numbers - absolute positioned next to notes */}
                    {fretNumbers.map(fretNum => {
                        const notePosition = (fretNum - 0.3) * fretHeight;

                        return (
                            <div
                                key={`fret-num-${fretNum}`}
                                className="absolute font-bold text-sm text-right z-30"
                                style={{
                                    top: `${notePosition}px`,
                                    transform: 'translate(-100%, -1%)' // Center vertically and keep right-aligned
                                }}
                            >
                                {fretNum}
                            </div>
                        );
                    })}

                    {/* Fretboard itself */}
                    <div
                        className="w-full relative bg-gray-900 rounded-sm overflow-hidden shadow-md"
                        style={{
                            height: `${fretHeight * visibleFrets}px`,
                            marginLeft: '10px',
                            // Add a darker edge gradient at the right
                            background: 'linear-gradient(to right, #1f1f1f 98%, #111111 100%)'
                        }}
                    >
                        {/* Right edge shadow effect */}
                        <div
                            className="absolute top-0 right-0 h-full w-2 z-5"
                            style={{
                                background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.3))',
                                boxShadow: 'inset -1px 0 3px rgba(0,0,0,0.2)'
                            }}
                        />

                        {/* Subtle end line that matches low E string color */}
                        <div
                            className="absolute bottom-0 left-0 right-0 bg-gray-400 z-10"
                            style={{
                                height: '1px',
                                boxShadow: '0 0 2px rgba(0,0,0,0.2)'
                            }}
                        />

                        {/* Fret lines */}
                        {Array.from({ length: visibleFrets }).map((_, idx) => (
                            <div
                                key={`fret-${idx}`}
                                className="absolute w-full bg-gray-600"
                                style={{
                                    height: '2px',
                                    top: `${(idx + 1) * fretHeight}px`,
                                    zIndex: 5
                                }}
                            />
                        ))}

                        {/* Strings - properly aligned with string labels */}
                        {Array.from({ length: numberOfStrings }).map((_, idx) => {
                            // Calculate string thickness (thicker for lower strings)
                            // Low E (idx 0) = thickest, High E (idx 5) = thinnest
                            const thickness = (1 + ((numberOfStrings - idx - 1) / numberOfStrings) * 3) * scale;

                            // Calculate position to align with string labels
                            const position = (idx + 0.5) * (100 / numberOfStrings);

                            return (
                                <div
                                    key={`string-${idx}`}
                                    className="absolute top-0 bottom-0 bg-gray-400"
                                    style={{
                                        width: `${thickness}px`,
                                        left: `${position}%`,
                                        transform: 'translateX(-50%)',
                                        zIndex: 4
                                    }}
                                />
                            );
                        })}

                        {/* Fret markers (dots) */}
                        {[3, 5, 7, 9].filter(fret => fret <= visibleFrets).map(fretNum => (
                            <div
                                key={`marker-${fretNum}`}
                                className="absolute w-full flex justify-center"
                                style={{
                                    top: `${(fretNum - 0.5) * fretHeight}px`,
                                    zIndex: 6
                                }}
                            >
                                <div className="rounded-full bg-gray-500 opacity-70 h-4 w-4" />
                            </div>
                        ))}

                        {/* Double dots for 12th fret - only show if visible */}
                        {visibleFrets >= 12 && (
                            <div
                                key="marker-12"
                                className="absolute w-full"
                                style={{
                                    top: `${(12 - 0.7) * fretHeight}px`,
                                    zIndex: 6
                                }}
                            >
                                <div className="flex justify-around px-8">
                                    <div className="rounded-full bg-gray-500 opacity-70 h-4 w-4" />
                                    <div className="rounded-full bg-gray-500 opacity-70 h-4 w-4" />
                                </div>
                            </div>
                        )}

                        {/* Nut (top of fretboard) */}
                        <div className="absolute top-0 left-0 right-0 h-3 bg-blue-400 z-10" />

                        {/* Note markers with corrected positioning */}
                        {displayNotes.map((note, idx) => {
                            // Convert from UI string numbering (1-6) to display index (0-5)
                            // In our display, string 6 (low E) is at index 0, string 1 (high E) is at index 5
                            // This is a crucial conversion to ensure the notes appear on the correct strings visually
                            const displayStringIndex = 6 - note.stringNumber;

                            return (
                                <div
                                    key={`note-${idx}`}
                                    className="absolute rounded-full flex items-center justify-center cursor-pointer"
                                    style={{
                                        width: `${noteSize}px`,
                                        height: `${noteSize}px`,
                                        backgroundColor: getNoteColor(note),
                                        // Position based on the display index instead of stringNumber directly
                                        left: `${(displayStringIndex + 0.5) * (100 / numberOfStrings)}%`,
                                        top: `${(note.fretNumber - 0.5) * fretHeight}px`,
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 20
                                    }}
                                    onClick={() => onNoteClick && onNoteClick(note)}
                                >
                                    <span className="text-white font-bold">
                                        {note.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileFretboard;
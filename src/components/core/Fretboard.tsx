import React from 'react';
// import StringLabels from './StringLabels';
import Frets from './Frets';
import FretMarkers from './FretMarkers';
import FretboardStrings from './FretboardStrings';
import FretNumbers from './FretNumbers';
import NoteMarkers, { NoteData } from './NoteMarkers';

type FretboardProps = {
    numberOfFrets: number;
    numberOfStrings?: number;
    tuning?: string[];
    notes?: NoteData[];
    onNoteClick?: (note: NoteData) => void;
    gameActive?: boolean;
    targetNote?: NoteData | null;
    guessResult?: boolean | null;
    scale?: number; // Add scale prop instead of just height
};

const Fretboard: React.FC<FretboardProps> = ({
    numberOfFrets = 21,
    numberOfStrings = 6,
    tuning = ['E', 'A', 'D', 'G', 'B', 'E'], // Standard tuning from low to high
    notes = [], // Default to empty array of notes
    onNoteClick,
    gameActive = false,
    targetNote = null,
    guessResult = null,
    scale = 1.0 // Default scale factor (1.0 = 100%)
}) => {
    // Base dimensions that will be scaled
    const baseHeight = 220;
    const scaledHeight = baseHeight * scale;
    const noteSize = 26 * scale;
    const markerSize = 5 * scale;
    const fretWidth = 2 * scale;
    const nutWidth = 3 * scale;
    const stringLabelFontSize = 1 * scale; // em units

    // Reverse tuning for display (low E at bottom, high e at top)
    const reversedTuning = [...tuning].reverse();

    // Desktop view (horizontal layout) only
    return (
        <div className="w-full flex items-center justify-center mt-2" style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
            <div className="w-full">
                {/* Container with relative positioning for proper label placement */}
                <div className="relative w-full pl-10">
                    {/* String labels - with the reversed order */}
                    <div className="string-labels absolute left-4 top-0 h-full flex flex-col justify-between py-2">
                        {/* Display strings from high e (top) to low E (bottom) */}
                        {reversedTuning.map((note, index) => (
                            <div
                                key={`string-label-${index}`}
                                className="flex items-center justify-end font-bold text-black"
                                style={{
                                    position: 'absolute',
                                    top: `${((index + 0.5) * 100) / numberOfStrings}%`,
                                    transform: 'translateY(-50%)',
                                    left: 0,
                                    right: 0,
                                    fontSize: `${stringLabelFontSize}em`
                                }}
                            >
                                {note}
                            </div>
                        ))}
                    </div>

                    {/* Fretboard */}
                    <div className="fretboard relative w-full bg-[#1f1f1f]" style={{ height: `${scaledHeight}px` }}>
                        <Frets numberOfFrets={numberOfFrets} orientation="horizontal" fretWidth={fretWidth} />
                        <FretMarkers numberOfFrets={numberOfFrets} orientation="horizontal" markerSize={markerSize} />
                        <FretboardStrings
                            numberOfStrings={numberOfStrings}
                            orientation="horizontal"
                            reversed={true} // Use reversed order for desktop
                            scale={scale}
                        />
                        <FretNumbers numberOfFrets={numberOfFrets} orientation="horizontal" scale={scale} />

                        {/* Note markers */}
                        <NoteMarkers
                            notes={notes}
                            numberOfStrings={numberOfStrings}
                            numberOfFrets={numberOfFrets}
                            onNoteClick={onNoteClick}
                            showOpenNotes={false}
                            gameActive={gameActive}
                            targetNote={targetNote}
                            guessResult={guessResult}
                            noteSize={noteSize}
                        />

                        {/* Nut (the blue piece at the top of the fretboard) */}
                        <div className="absolute top-0 left-0 bg-blue-400" style={{ width: `${nutWidth}px`, height: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fretboard;
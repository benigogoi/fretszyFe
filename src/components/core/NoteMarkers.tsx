import React from 'react';
import NoteMarker from './NoteMarker';

// Define the structure for note data
export type NoteData = {
    stringNumber: number;
    fretNumber: number;
    label?: string;
    color?: string;
    actualNote?: string; // Add actual note for comparison
};

type NoteMarkersProps = {
    notes: NoteData[];
    numberOfStrings: number;
    numberOfFrets: number;
    onNoteClick?: (note: NoteData) => void;
    showOpenNotes?: boolean;
    gameActive?: boolean;
    targetNote?: NoteData | null;
    guessResult?: boolean | null;
    noteSize?: number;
};

const NoteMarkers: React.FC<NoteMarkersProps> = ({
    notes,
    numberOfStrings,
    numberOfFrets,
    onNoteClick,
    showOpenNotes = false,
    gameActive = false,
    targetNote = null,
    guessResult = null,
    noteSize = 26
}) => {
    // First filter out open string notes if needed
    const filteredByOpenNotes = showOpenNotes
        ? notes
        : notes.filter(note => note.fretNumber > 0);

    // Then filter based on game state
    const notesToDisplay = gameActive && !targetNote
        ? [] // No notes to display when game is active but no target
        : filteredByOpenNotes;

    return (
        <div className="absolute inset-0 pointer-events-none">
            {notesToDisplay.map((note, index) => {
                const isTarget = targetNote &&
                    note.stringNumber === targetNote.stringNumber &&
                    note.fretNumber === targetNote.fretNumber;

                return (
                    <NoteMarker
                        key={`note-${index}`}
                        stringNumber={note.stringNumber}
                        fretNumber={note.fretNumber}
                        label={note.label}
                        color={note.color}
                        size={noteSize}
                        numberOfStrings={numberOfStrings}
                        numberOfFrets={numberOfFrets}
                        onClick={() => onNoteClick && onNoteClick(note)}
                        isTarget={isTarget}
                        isCorrect={isTarget ? guessResult : null}
                    />
                );
            })}
        </div>
    );
};

export default NoteMarkers;
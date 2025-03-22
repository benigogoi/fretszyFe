import React from 'react';

type NoteSelectorProps = {
    onSelectNote: (noteName: string, correctNote: string) => void;
    isCorrect: boolean | null;
};

const NoteSelector: React.FC<NoteSelectorProps> = ({ onSelectNote, isCorrect }) => {
    // All possible notes
    const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    // Correct note would be passed down from the parent
    // For demonstration, we'll use a hard-coded value (in real implementation, this would come from props)
    const correctNote = 'C';

    // Get feedback class based on isCorrect state
    const getFeedbackClass = () => {
        if (isCorrect === null) return '';
        return isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
    };

    return (
        <div className={`note-selector mt-4 p-4 border rounded ${getFeedbackClass()}`}>
            <h3 className="text-lg font-bold mb-3">Select the correct note:</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {allNotes.map((note) => (
                    <button
                        key={note}
                        className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
                        onClick={() => onSelectNote(note, correctNote)}
                    >
                        {note}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NoteSelector;
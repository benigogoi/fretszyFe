import React from 'react';

type NoteSelectorProps = {
    onSelectNote: (noteName: string, correctNote: string) => void;
    isCorrect: boolean | null;
    variant?: 'light' | 'dark'; // Add variant prop
};

const NoteSelector: React.FC<NoteSelectorProps> = ({ 
    onSelectNote, 
    isCorrect, 
    variant = 'light' // Default to light
}) => {
    // All possible notes
    const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    // Correct note would be passed down from the parent
    // For demonstration, we'll use a hard-coded value (in real implementation, this would come from props)
    const correctNote = 'C';

    // Get feedback class based on isCorrect state and variant
    const getFeedbackClass = () => {
        if (isCorrect === null) {
            return variant === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300';
        }
        
        if (isCorrect) {
            return 'bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-500';
        }
        
        return 'bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-500';
    };
    
    // Get text color based on variant
    const getTextColor = () => {
        return variant === 'dark' ? 'text-white' : 'text-gray-900';
    };
    
    // Get button styles based on variant
    const getButtonStyles = (note: string) => {
        // Basic button styles
        let baseStyles = "py-2 px-3 font-bold rounded text-white transition-colors";
        
        // For regular notes
        let colorStyles = "bg-blue-500 hover:bg-blue-600";
        
        // Special highlighting for sharps to make them visually distinct
        if (note.includes('#')) {
            colorStyles = "bg-indigo-600 hover:bg-indigo-700";
        }
        
        return `${baseStyles} ${colorStyles}`;
    };

    return (
        <div className={`note-selector mt-4 p-4 border rounded-lg shadow-inner ${getFeedbackClass()}`}>
            <h3 className={`text-lg font-bold mb-3 ${getTextColor()}`}>Select the correct note:</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {allNotes.map((note) => (
                    <button
                        key={note}
                        className={getButtonStyles(note)}
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
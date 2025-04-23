// Component for selecting the root note

import React from 'react';

type RootNoteSelectorProps = {
  selectedNote: string;
  onChange: (note: string) => void;
  variant?: 'light' | 'dark';
};

const RootNoteSelector: React.FC<RootNoteSelectorProps> = ({
  selectedNote,
  onChange,
  variant = 'light'
}) => {
  // All possible notes in western music (using sharps notation)
  const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

  // Get button styles based on variant and selection state
  const getButtonStyles = (note: string) => {
    // Base styles
    let baseStyles = "py-2 px-3 font-bold rounded text-sm md:text-base transition-colors";
    
    // Selected state styles
    const isSelected = note === selectedNote;
    
    // Color variations based on note type (natural vs sharp)
    const isSharp = note.includes('#');
    
    if (isSelected) {
      return `${baseStyles} ${isSharp ? 'bg-indigo-700 text-white' : 'bg-blue-700 text-white'}`;
    }
    
    if (variant === 'dark') {
      return `${baseStyles} ${isSharp ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`;
    }
    
    return `${baseStyles} ${isSharp ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-900' : 'bg-blue-100 hover:bg-blue-200 text-blue-900'}`;
  };

  return (
    <div className="root-note-selector">
      <label className={`block text-sm font-medium mb-1 ${variant === 'dark' ? 'text-white' : 'text-gray-700'}`}>
        Root Note
      </label>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-1">
        {allNotes.map((note) => (
          <button
            key={note}
            className={getButtonStyles(note)}
            onClick={() => onChange(note)}
            aria-pressed={selectedNote === note}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RootNoteSelector;
// UI for selecting scale patterns

import React from 'react';
import { PatternPosition } from '../types/PentatonicTypes';
import { getPatternName } from '../utils/PentatonicUtils';

type ScalePatternSelectorProps = {
  selectedPatterns: PatternPosition[];
  onChange: (patterns: PatternPosition[]) => void;
  variant?: 'light' | 'dark';
};

const ScalePatternSelector: React.FC<ScalePatternSelectorProps> = ({
  selectedPatterns,
  onChange,
  variant = 'light'
}) => {
  // Available patterns (1-5)
  const availablePatterns: PatternPosition[] = [1, 2, 3, 4, 5];

  // Toggle a pattern selection
  const togglePattern = (pattern: PatternPosition) => {
    if (selectedPatterns.includes(pattern)) {
      // Remove the pattern if it's already selected
      onChange(selectedPatterns.filter(p => p !== pattern));
    } else {
      // Add the pattern
      onChange([...selectedPatterns, pattern]);
    }
  };

  // Select/deselect all patterns
  const toggleAll = () => {
    if (selectedPatterns.length === availablePatterns.length) {
      // Deselect all if all are currently selected
      onChange([]);
    } else {
      // Select all
      onChange([...availablePatterns]);
    }
  };

  // Get button styles based on selection state
  const getButtonStyles = (pattern: PatternPosition) => {
    const isSelected = selectedPatterns.includes(pattern);
    const baseStyles = "py-2 px-3 rounded font-medium transition-colors";
    
    if (isSelected) {
      return variant === 'dark'
        ? `${baseStyles} bg-green-600 text-white`
        : `${baseStyles} bg-green-600 text-white`;
    }
    
    return variant === 'dark'
      ? `${baseStyles} bg-gray-700 text-gray-300 hover:bg-gray-600`
      : `${baseStyles} bg-gray-200 text-gray-800 hover:bg-gray-300`;
  };

  // Main section color based on theme
  const getSectionClass = () => {
    return variant === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white'
      : 'bg-white border-gray-300 text-gray-900';
  };

  return (
    <div className="scale-pattern-selector">
      <div className="flex items-center justify-between mb-1">
        <label className={`block text-sm font-medium ${variant === 'dark' ? 'text-white' : 'text-gray-700'}`}>
          Scale Patterns
        </label>
        <button
          onClick={toggleAll}
          className={`text-xs ${variant === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
        >
          {selectedPatterns.length === availablePatterns.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>
      
      <div className={`p-3 border rounded-md shadow-sm ${getSectionClass()}`}>
        <div className="grid grid-cols-5 gap-2">
          {availablePatterns.map((pattern) => (
            <button
              key={pattern}
              className={getButtonStyles(pattern)}
              onClick={() => togglePattern(pattern)}
              aria-pressed={selectedPatterns.includes(pattern)}
            >
              {pattern}
            </button>
          ))}
        </div>
        
        <div className="mt-2 grid grid-cols-1 gap-2">
          {selectedPatterns.map((pattern) => (
            <div key={`label-${pattern}`} className="text-sm">
              <span className="inline-block w-6 h-6 bg-green-600 text-white rounded-full text-center mr-2">
                {pattern}
              </span>
              <span>{getPatternName(pattern)}</span>
            </div>
          ))}
          
          {selectedPatterns.length === 0 && (
            <p className="text-sm italic opacity-75">No patterns selected. Select at least one pattern to visualize.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScalePatternSelector;

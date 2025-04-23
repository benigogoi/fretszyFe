// Toggle between major/minor pentatonic

import React from 'react';
import { ScaleType } from '../types/PentatonicTypes';

type ScaleTypeSelectorProps = {
  selectedType: ScaleType;
  onChange: (type: ScaleType) => void;
  variant?: 'light' | 'dark';
};

const ScaleTypeSelector: React.FC<ScaleTypeSelectorProps> = ({
  selectedType,
  onChange,
  variant = 'light'
}) => {
  // Get the background and text color based on theme
  const getContainerClass = () => {
    return variant === 'dark'
      ? 'bg-gray-800 border-gray-700'
      : 'bg-white border-gray-300';
  };

  // Get text color based on theme
  const getTextClass = () => {
    return variant === 'dark' ? 'text-white' : 'text-gray-900';
  };

  // Get button styles based on selection state
  const getButtonStyles = (type: ScaleType) => {
    const isSelected = type === selectedType;
    const baseStyles = "py-2 px-4 rounded font-medium transition-colors";
    
    if (isSelected) {
      return variant === 'dark'
        ? `${baseStyles} bg-blue-600 text-white`
        : `${baseStyles} bg-blue-600 text-white`;
    }
    
    return variant === 'dark'
      ? `${baseStyles} bg-gray-700 text-gray-300 hover:bg-gray-600`
      : `${baseStyles} bg-gray-200 text-gray-800 hover:bg-gray-300`;
  };

  return (
    <div className="scale-type-selector">
      <label className={`block text-sm font-medium mb-1 ${variant === 'dark' ? 'text-white' : 'text-gray-700'}`}>
        Scale Type
      </label>
      <div className={`scale-toggle flex rounded-md shadow-sm border ${getContainerClass()}`}>
        <button
          className={getButtonStyles('minor')}
          onClick={() => onChange('minor')}
          style={{ flexGrow: 1 }}
          aria-pressed={selectedType === 'minor'}
        >
          <span className={getTextClass()}>Minor Pentatonic</span>
        </button>
        <button
          className={getButtonStyles('major')}
          onClick={() => onChange('major')}
          style={{ flexGrow: 1 }}
          aria-pressed={selectedType === 'major'}
        >
          <span className={getTextClass()}>Major Pentatonic</span>
        </button>
      </div>
    </div>
  );
};

export default ScaleTypeSelector;
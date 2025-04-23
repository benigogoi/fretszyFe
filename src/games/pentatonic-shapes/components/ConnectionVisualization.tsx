// Optional component to show connections between patterns
import React from 'react';
import { ConnectionType } from '../types/PentatonicTypes';

type ConnectionVisualizationProps = {
  connectionType: ConnectionType;
  onChange: (type: ConnectionType) => void;
  variant?: 'light' | 'dark';
};

const ConnectionVisualization: React.FC<ConnectionVisualizationProps> = ({
  connectionType,
  onChange,
  variant = 'light'
}) => {
  // Connection options
  const options: { value: ConnectionType; label: string }[] = [
    { value: 'none', label: 'No Connections' },
    { value: 'horizontal', label: 'Horizontal Connections' },
    { value: 'vertical', label: 'Vertical Connections' },
    { value: 'both', label: 'All Connections' }
  ];

  // Get the background and text color based on theme
  const getLabelClass = () => {
    return variant === 'dark' ? 'text-white' : 'text-gray-700';
  };

  // Get button styles based on selection state
  const getOptionClass = (value: ConnectionType) => {
    const isSelected = value === connectionType;
    const baseClass = "flex items-center p-2 border rounded-md cursor-pointer transition-colors";
    
    if (isSelected) {
      return variant === 'dark'
        ? `${baseClass} bg-blue-800 border-blue-600 text-white`
        : `${baseClass} bg-blue-100 border-blue-500 text-blue-800`;
    }
    
    return variant === 'dark'
      ? `${baseClass} bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600`
      : `${baseClass} bg-white border-gray-300 text-gray-700 hover:bg-gray-50`;
  };

  return (
    <div className="connection-visualization">
      <label className={`block text-sm font-medium mb-1 ${getLabelClass()}`}>
        Connection Options
      </label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <div
            key={option.value}
            className={getOptionClass(option.value)}
            onClick={() => onChange(option.value)}
          >
            <div className="flex-1">
              <div className="font-medium text-sm text-center">{option.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionVisualization;
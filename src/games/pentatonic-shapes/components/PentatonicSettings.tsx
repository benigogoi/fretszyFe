// Container for all settings controls
import React from 'react';
import { ScaleType, PatternPosition, ConnectionType } from '../types/PentatonicTypes';
import RootNoteSelector from './RootNoteSelector';
import ScaleTypeSelector from './ScaleTypeSelector';
import ScalePatternSelector from './ScalePatternSelector';
import ConnectionVisualization from './ConnectionVisualization';
import Select from '../../../components/common/Select';

type PentatonicSettingsProps = {
  rootNote: string;
  scaleType: ScaleType;
  selectedPatterns: PatternPosition[];
  connectionType: ConnectionType;
  startFret: number;
  showAllPositions: boolean;
  onRootNoteChange: (note: string) => void;
  onScaleTypeChange: (type: ScaleType) => void;
  onPatternsChange: (patterns: PatternPosition[]) => void;
  onConnectionTypeChange: (type: ConnectionType) => void;
  onStartFretChange: (fret: number) => void;
  onShowAllPositionsChange: (show: boolean) => void;
  variant?: 'light' | 'dark';
};

const PentatonicSettings: React.FC<PentatonicSettingsProps> = ({
  rootNote,
  scaleType,
  selectedPatterns,
  connectionType,
  startFret,
  showAllPositions,
  onRootNoteChange,
  onScaleTypeChange,
  onPatternsChange,
  onConnectionTypeChange,
  onStartFretChange,
  onShowAllPositionsChange,
  variant = 'light'
}) => {
  // Get the background and text color based on theme
  const getContainerClass = () => {
    return variant === 'dark'
      ? 'bg-gray-800 text-white'
      : 'bg-gray-100 text-gray-900';
  };

  // Options for start fret selector
  const fretOptions = [
    { value: 0, label: 'Auto Position' },
    { value: 1, label: 'Start at Fret 1' },
    { value: 3, label: 'Start at Fret 3' },
    { value: 5, label: 'Start at Fret 5' },
    { value: 7, label: 'Start at Fret 7' },
    { value: 9, label: 'Start at Fret 9' }
  ];

  return (
    <div className={`pentatonic-settings p-4 rounded-lg shadow-sm ${getContainerClass()}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <RootNoteSelector
            selectedNote={rootNote}
            onChange={onRootNoteChange}
            variant={variant}
          />
          
          <ScaleTypeSelector
            selectedType={scaleType}
            onChange={onScaleTypeChange}
            variant={variant}
          />
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-sm font-medium mb-1 ${variant === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                Start Fret
              </label>
              <Select
                options={fretOptions}
                value={startFret}
                onChange={(e) => onStartFretChange(Number(e.target.value))}
                variant={variant === 'dark' ? 'dark' : 'light'}
              />
            </div>
            
            <div className="flex items-end">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={showAllPositions}
                  onChange={(e) => onShowAllPositionsChange(e.target.checked)}
                />
                <span className={`ml-2 text-sm ${variant === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                  Show All Positions
                </span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <ScalePatternSelector
            selectedPatterns={selectedPatterns}
            onChange={onPatternsChange}
            variant={variant}
          />
          
          <ConnectionVisualization
            connectionType={connectionType}
            onChange={onConnectionTypeChange}
            variant={variant}
          />
        </div>
      </div>
    </div>
  );
};

export default PentatonicSettings;
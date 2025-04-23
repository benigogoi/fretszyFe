// Type definitions for pentatonic scale components

// Basic note representation
export type NoteData = {
  stringNumber: number;   // 1 = high E, 6 = low E
  fretNumber: number;     // 0 = open string
  label: string;          // Note name or symbol
  color: string;          // Visual color 
  isRoot?: boolean;       // Whether this note is a root note
  isConnector?: boolean;  // Notes that connect between patterns
  patternId?: number;     // Which pattern this note belongs to (1-5)
};

// Scale types
export type ScaleType = "minor" | "major";

// Scale pattern positions (1-5, corresponding to CAGED shapes, plus special variants)
export type PatternPosition = 1 | 2 | 3 | 4 | 5 | '4-low' | '5-alt';

// Shape connection option
export type ConnectionType = "none" | "horizontal" | "vertical" | "both";

// Configuration for the scale visualization
export type ScaleConfig = {
  rootNote: string;              // Root note (e.g., "A", "C#")
  scaleType: ScaleType;          // Minor or major pentatonic
  visiblePatterns: number[];     // Array of visible pattern IDs
  connectionType: ConnectionType;// How patterns should be connected
  startFret: number;             // Starting fret for display
  showAllPositions: boolean;     // Whether to show all positions of the scale
};
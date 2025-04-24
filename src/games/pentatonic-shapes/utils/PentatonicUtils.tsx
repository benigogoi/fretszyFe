// Core utilities for pentatonic scales
import { ScaleType, NoteData, PatternPosition } from "../types/PentatonicTypes";
import { getNoteAtPosition } from "../../fretboard-notefinder/utils/FretboardUtils";
import { 
  PENTATONIC_PATTERNS, 
  CONNECTOR_POSITIONS, 
  PATTERN_NAMES 
} from "./ScalePatternData";

/**
 * Generate all notes for a pentatonic pattern
 */
export const generatePentatonicPattern = (
  rootNote: string,
  pattern: PatternPosition,
  scaleType: ScaleType,
  startFret: number = 0
): NoteData[] => {
  const notes: NoteData[] = [];
  
  // Get the pattern definition for the requested scale type
  const patternDef = PENTATONIC_PATTERNS[scaleType][pattern];
  
  // If no pattern is found, return empty notes
  if (!patternDef) {
    console.error(`Pattern not found: ${pattern} for ${scaleType}`);
    return [];
  }
  
  // Calculate the key offset - separate handling for minor and major
  let keyOffset: number;
  
  if (scaleType === 'minor') {
    // Keep existing minor pentatonic offset calculation
    switch (rootNote) {
      case 'A': keyOffset = 0; break;      // A minor - 5th fret (no offset from the reference)
      case 'A#': keyOffset = 1; break;     // A# minor - 6th fret
      case 'B': keyOffset = 2; break;      // B minor - 7th fret
      case 'C': keyOffset = 3; break;      // C minor - 8th fret
      case 'C#': keyOffset = 4; break;     // C# minor - 9th fret
      case 'D': keyOffset = 5; break;      // D minor - 10th fret
      case 'D#': keyOffset = 6; break;     // D# minor - 11th fret
      case 'E': keyOffset = 7; break;      // E minor - 12th fret
      case 'F': keyOffset = -4; break;     // F minor - starts at 1st fret (5-4=1)
      case 'F#': keyOffset = -3; break;    // F# minor - starts at 2nd fret (5-3=2)
      case 'G': keyOffset = -2; break;     // G minor - starts at 3rd fret (5-2=3)
      case 'G#': keyOffset = -1; break;    // G# minor - starts at 4th fret (5-1=4)
      default: keyOffset = 0; break;       // Default to A minor position
    }
  } else { // Major pentatonic offset calculation
    switch (rootNote) {
      case 'A': keyOffset = 0; break;      // A major - keep reference
      case 'A#': keyOffset = 1; break;     // A# major - up one semitone
      case 'B': keyOffset = 2; break;      // B major - up two semitones
      case 'C': keyOffset = 3; break;      // C major - up three semitones
      case 'C#': keyOffset = 4; break;     // C# major - up four semitones
      case 'D': keyOffset = 5; break;      // D major - up five semitones
      case 'D#': keyOffset = 6; break;     // D# major - up six semitones
      case 'E': keyOffset = 7; break;      // E major - up seven semitones
      case 'F': keyOffset = -4; break;     // F major - starts at 1st fret
      case 'F#': keyOffset = -3; break;    // F# major - starts at 2nd fret
      case 'G': keyOffset = -2; break;     // G major - starts at 3rd fret
      case 'G#': keyOffset = -1; break;    // G# major - starts at 4th fret
      default: keyOffset = 0; break;       // Default to A major
    }
  }
  
  // Add each note from the pattern definition, positioned correctly
  for (const stringData of patternDef) {
    const stringNumber = stringData.string;
    
    // Add each fret for this string
    for (const fret of stringData.frets) {
      // Calculate the actual fret position based on key
      let actualFret: number;
      
      if ((rootNote === 'A' && scaleType === 'minor') || 
          (rootNote === 'A' && scaleType === 'major')) {
        // For A minor/major, use the absolute values defined in the pattern
        actualFret = fret;
      } else {
        // For other keys, transpose up or down based on the key offset
        actualFret = fret + keyOffset;
      }
      
      // Handle octave adjustment if needed
      if (actualFret < 0) {
        actualFret += 12; // Move up an octave if we got a negative fret
      }
      
      // If startFret is specified, adjust based on octave
      if (startFret > 0 && actualFret < startFret) {
        // Find how many octaves we need to move up
        const octavesToShift = Math.ceil((startFret - actualFret) / 12);
        actualFret += octavesToShift * 12;
      }
      
      // Get the actual note at this position
      const noteAtPosition = getNoteAtPosition(stringNumber, actualFret);
      
      // Check if this is a root note
      const isRoot = noteAtPosition === rootNote;
      
      // Add the note to our collection
      notes.push({
        stringNumber,
        fretNumber: actualFret,
        label: isRoot ? noteAtPosition : "", // Only show label for root notes
        color: isRoot ? "#ff8c00" : "#ffffff", // Orange for roots, white for other notes
        isRoot,
        patternId: typeof pattern === 'string' ? parseInt(pattern) : pattern
      });
    }
  }
  
  return notes;
};

/**
 * Generate connector notes between two patterns
 */
export const generateConnectorNotes = (
  rootNote: string,
  pattern1: PatternPosition,
  pattern2: PatternPosition,
  scaleType: ScaleType,
  startFret: number = 0
): NoteData[] => {
  // Key for looking up connector positions
  const connectorKey = `${pattern1}-${pattern2}`;
  
  // Get connector positions
  const connectors = CONNECTOR_POSITIONS[connectorKey as keyof typeof CONNECTOR_POSITIONS];
  if (!connectors) return [];
  
  const notes: NoteData[] = [];
  
  // Calculate the key offset - using the same approach as in generatePentatonicPattern
  let keyOffset: number;
  
  if (scaleType === 'minor') {
    // Keep existing minor pentatonic offset calculation
    switch (rootNote) {
      case 'A': keyOffset = 0; break;      // A minor - reference
      case 'A#': keyOffset = 1; break;     // A# minor - up one semitone
      case 'B': keyOffset = 2; break;      // B minor - up two semitones
      case 'C': keyOffset = 3; break;      // C minor - up three semitones
      case 'C#': keyOffset = 4; break;     // C# minor - up four semitones
      case 'D': keyOffset = 5; break;      // D minor - up five semitones
      case 'D#': keyOffset = 6; break;     // D# minor - up six semitones
      case 'E': keyOffset = 7; break;      // E minor - up seven semitones
      case 'F': keyOffset = -4; break;     // F minor - starts at 1st fret (5-4=1)
      case 'F#': keyOffset = -3; break;    // F# minor - starts at 2nd fret (5-3=2)
      case 'G': keyOffset = -2; break;     // G minor - starts at 3rd fret (5-2=3)
      case 'G#': keyOffset = -1; break;    // G# minor - starts at 4th fret (5-1=4)
      default: keyOffset = 0; break;       // Default to A minor
    }
  } else { // Major pentatonic offset calculation 
    switch (rootNote) {
      case 'A': keyOffset = 0; break;      // A major - keep reference
      case 'A#': keyOffset = 1; break;     // A# major - up one semitone
      case 'B': keyOffset = 2; break;      // B major - up two semitones
      case 'C': keyOffset = 3; break;      // C major - up three semitones
      case 'C#': keyOffset = 4; break;     // C# major - up four semitones
      case 'D': keyOffset = 5; break;      // D major - up five semitones
      case 'D#': keyOffset = 6; break;     // D# major - up six semitones
      case 'E': keyOffset = 7; break;      // E major - up seven semitones
      case 'F': keyOffset = -4; break;     // F major - starts at 1st fret
      case 'F#': keyOffset = -3; break;    // F# major - starts at 2nd fret
      case 'G': keyOffset = -2; break;     // G major - starts at 3rd fret
      case 'G#': keyOffset = -1; break;    // G# major - starts at 4th fret
      default: keyOffset = 0; break;       // Default to A major
    }
  }
  
  // Add each connector note, adjusted for key
  for (const connector of connectors) {
    const { string, fret } = connector;
    
    // Calculate actual fret position by transposing
    let actualFret: number;
    
    if ((rootNote === 'A' && scaleType === 'minor') ||
        (rootNote === 'A' && scaleType === 'major')) {
      // For A minor/major, use the absolute values defined 
      actualFret = fret;
    } else {
      // For other keys, transpose up or down based on the key offset
      actualFret = fret + keyOffset;
    }
    
    // Handle octave adjustment if needed
    if (actualFret < 0) {
      actualFret += 12; // Move up an octave if we got a negative fret
    }
    
    // Handle octave adjustment for startFret
    if (startFret > 0 && actualFret < startFret) {
      const octavesToShift = Math.ceil((startFret - actualFret) / 12);
      actualFret += octavesToShift * 12;
    }
    
    // Add the connector note
    notes.push({
      stringNumber: string,
      fretNumber: actualFret,
      label: "", // No label for connector notes
      color: "", // Purple for connectors
      isConnector: true
    });
  }
  
  return notes;
};

/**
 * Generate all notes for multiple pentatonic patterns
 */
export const generateMultiplePentatonicPatterns = (
  rootNote: string,
  patterns: PatternPosition[],
  scaleType: ScaleType,
  showConnectors: boolean = false,
  startFret: number = 0
): NoteData[] => {
  let allNotes: NoteData[] = [];
  
  // Handle empty patterns
  if (!patterns || patterns.length === 0) {
    return [];
  }
  
  // Generate notes for each pattern
  for (const pattern of patterns) {
    const patternNotes = generatePentatonicPattern(
      rootNote, 
      pattern, 
      scaleType,
      startFret
    );
    
    allNotes = [...allNotes, ...patternNotes];
  }
  
  // Generate connector notes if requested
  if (showConnectors && patterns.length > 1) {
    // Sort patterns to ensure we connect them in order
    // Convert any string patterns to numbers for sorting
    const sortedPatterns = [...patterns].sort((a, b) => {
      // Handle special pattern strings
      const getPatternValue = (pattern: PatternPosition): number => {
        if (pattern === '4-low') return 3.5; // Place between 3 and 4
        if (pattern === '5-alt') return 5.5; // Place after 5
        return typeof pattern === 'string' ? parseInt(pattern) : pattern;
      };
      
      return getPatternValue(a) - getPatternValue(b);
    });
    
    for (let i = 0; i < sortedPatterns.length - 1; i++) {
      const connectorNotes = generateConnectorNotes(
        rootNote,
        sortedPatterns[i],
        sortedPatterns[i + 1],
        scaleType,
        startFret
      );
      
      allNotes = [...allNotes, ...connectorNotes];
    }
    
    // Connect last pattern to first pattern to complete the circle if we have more than 2 patterns
    if (sortedPatterns.length > 2) {
      // Check for pattern 1 and any of the pattern 5 variants
      const hasPattern1 = sortedPatterns.includes(1 as PatternPosition) || sortedPatterns.includes('1' as any);
      const hasPattern5 = sortedPatterns.includes(5 as PatternPosition) || 
                          sortedPatterns.includes('5' as any) || 
                          sortedPatterns.includes('5-alt' as any);
      
      // Connect pattern 5 (or 5-alt) to pattern 1
      if (hasPattern1 && hasPattern5) {
        // Figure out which variant of pattern 5 we're using
        const pattern5Variant = sortedPatterns.includes('5-alt' as any) 
          ? '5-alt' 
          : 5;
        
        const connectorNotes = generateConnectorNotes(
          rootNote,
          pattern5Variant as PatternPosition,
          1 as PatternPosition,
          scaleType,
          startFret
        );
        
        allNotes = [...allNotes, ...connectorNotes];
      }
      
      // Connect pattern 4-low to pattern 1 if both are present
      const hasPattern4Low = sortedPatterns.includes('4-low' as any);
      if (hasPattern1 && hasPattern4Low) {
        const connectorNotes = generateConnectorNotes(
          rootNote,
          '4-low' as PatternPosition,
          1 as PatternPosition,
          scaleType,
          startFret
        );
        
        allNotes = [...allNotes, ...connectorNotes];
      }
    }
  }
  
  return allNotes;
};

/**
 * Get the name of a pentatonic pattern
 */
export const getPatternName = (pattern: PatternPosition): string => {
  return PATTERN_NAMES[pattern] || `Pattern ${pattern}`;
};
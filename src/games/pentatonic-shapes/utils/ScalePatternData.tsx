// Data definitions for all scale patterns
import { PatternPosition } from "../types/PentatonicTypes";

// Pattern definitions with ABSOLUTE fret positions for A minor
// These will be transposed to other keys as needed
const A_MINOR_PATTERNS = {
  // Pattern 1 (Position 1)
  1: [
    { string: 1, frets: [5, 8] },         // High E string
    { string: 2, frets: [5, 8] },         // B string
    { string: 3, frets: [5, 7] },         // G string
    { string: 4, frets: [5, 7] },         // D string
    { string: 5, frets: [5, 7] },         // A string
    { string: 6, frets: [5, 8] },         // Low E string - Root
  ],
  // Pattern 2 (Position 2)
  2: [
    { string: 1, frets: [8, 10] },        // High E string
    { string: 2, frets: [8, 10] },        // B string
    { string: 3, frets: [7, 9] },         // G string
    { string: 4, frets: [7, 10] },        // D string
    { string: 5, frets: [7, 10] },        // A string - Root
    { string: 6, frets: [8, 10] },        // Low E string
  ],
  // Pattern 3 (Position 3)
  3: [
    { string: 1, frets: [10, 12] },       // High E string
    { string: 2, frets: [10, 13] },       // B string
    { string: 3, frets: [9, 12] },        // G string
    { string: 4, frets: [10, 12] },       // D string
    { string: 5, frets: [10, 12] },       // A string
    { string: 6, frets: [10, 12] },       // Low E string
  ],
  // Pattern 4 (Position 4)
  4: [
    { string: 1, frets: [12, 15] },       // High E string
    { string: 2, frets: [13, 15] },       // B string
    { string: 3, frets: [12, 14] },       // G string - Root
    { string: 4, frets: [12, 14] },       // D string
    { string: 5, frets: [12, 15] },       // A string
    { string: 6, frets: [12, 15] },       // Low E string
  ],
  // Pattern 4 (Lower Position) - For B to D# keys
  "4-low": [
    { string: 1, frets: [0, 3] },         // High E string
    { string: 2, frets: [1, 3] },         // B string
    { string: 3, frets: [0, 2] },         // G string - Root
    { string: 4, frets: [0, 2] },         // D string
    { string: 5, frets: [0, 3] },         // A string
    { string: 6, frets: [0, 3] },         // Low E string
  ],
  // Pattern 5 (Position 5) - Low position (around 3rd fret)
  5: [
    { string: 1, frets: [3, 5] },         // High E string
    { string: 2, frets: [3, 5] },         // B string
    { string: 3, frets: [2, 5] },         // G string
    { string: 4, frets: [2, 5] },         // D string - Root
    { string: 5, frets: [3, 5] },         // A string
    { string: 6, frets: [3, 5] },         // Low E string
  ],
  // Pattern 5 Alt (Position 5) - High position (15th fret)
  "5-alt": [
    { string: 1, frets: [15, 17] },       // High E string
    { string: 2, frets: [15, 17] },       // B string
    { string: 3, frets: [14, 17] },       // G string
    { string: 4, frets: [14, 17] },       // D string - Root
    { string: 5, frets: [15, 17] },       // A string
    { string: 6, frets: [15, 17] },       // Low E string
  ],
};

// Define A Major Pentatonic patterns correctly matching the diagram
// A major pentatonic: A, B, C#, E, F#
const A_MAJOR_PATTERNS = {
  // Position 1 - As shown in diagram (appears to be working)
  1: [
    { string: 1, frets: [5, 7] },         // High E string (A, B)
    { string: 2, frets: [5, 7] },         // B string (E, F#)
    { string: 3, frets: [4, 6] },         // G string (C#, E)
    { string: 4, frets: [4, 7] },            // D string (A)
    { string: 5, frets: [4, 7] },         // A string (C#, F#)
    { string: 6, frets: [5, 7] },         // Low E string (A, B)
  ],
  // Position 2 - Match frets with diagram
  2: [
    { string: 1, frets: [7, 9] },         // High E string (B, C#)
    { string: 2, frets: [7, 10] },        // B string (F#, A)
    { string: 3, frets: [6, 9] },         // G string (E, F#)
    { string: 4, frets: [7, 9] },         // D string (A, B)
    { string: 5, frets: [7, 9] },         // A string (F#, G#/A♭)
    { string: 6, frets: [7, 9] },         // Low E string (B, C#)
  ],
  // Position 3 - Match frets with diagram
  3: [
    { string: 1, frets: [9, 12] },        // High E string (C#, E)
    { string: 2, frets: [10, 12] },       // B string (A, B)
    { string: 3, frets: [9, 11] },        // G string (F#, A)
    { string: 4, frets: [9, 11] },        // D string (B, C#)
    { string: 5, frets: [9, 12] },        // A string (G#/A♭, B)
    { string: 6, frets: [9, 12] },        // Low E string (C#, E)
  ],
  // Position 4 - Match frets with diagram
  4: [
    { string: 1, frets: [12, 14] },       // High E string (E, F#)
    { string: 2, frets: [12, 14] },       // B string (B, C#)
    { string: 3, frets: [11, 14] },       // G string (A, B)
    { string: 4, frets: [11, 14] },       // D string (C#, E)
    { string: 5, frets: [12, 14] },       // A string (B, C#)
    { string: 6, frets: [12, 14] },       // Low E string (E, F#)
  ],
  // Position 5 - Match frets with diagram
  5: [
    { string: 1, frets: [2, 5] },         // High E string (E, A)
    { string: 2, frets: [2, 5] },         // B string (B, C#)
    { string: 3, frets: [2, 4] },         // G string (G#/A♭, B)
    { string: 4, frets: [2, 4] },         // D string (E, F#)
    { string: 5, frets: [2, 4] },         // A string (B, C#)
    { string: 6, frets: [2, 5] },         // Low E string (E, A)
  ],
  // Position 4 (Lower Position)
  "4-low": [
    { string: 1, frets: [0, 2] },         // High E string (E, F#)
    { string: 2, frets: [0, 2] },         // B string (B, C#)
    { string: 3, frets: [1, 4] },         // G string (G#/A♭, B)
    { string: 4, frets: [2, 4] },         // D string (E, F#)
    { string: 5, frets: [0, 2] },         // A string (A, B)
    { string: 6, frets: [0, 2] },         // Low E string (E, F#)
  ],
  // Position 5 (High Position)
  "5-alt": [
    { string: 1, frets: [14, 17] },       // High E string (E, A)
    { string: 2, frets: [14, 17] },       // B string (B, C#)
    { string: 3, frets: [14, 16] },       // G string (G#/A♭, B)
    { string: 4, frets: [14, 16] },       // D string (E, F#)
    { string: 5, frets: [14, 16] },       // A string (B, C#)
    { string: 6, frets: [14, 17] },       // Low E string (E, A)
  ],
};

// Special cases for positioning on the fretboard
const _SPECIAL_SCALE_POSITIONS = {
  minor: {
    // E minor should be at 12th fret, not 0th fret
    'E': 12,
    // F, F#, G, G# should be at their respective fret positions on low E
    'F': 1,
    'F#': 2,
    'G': 3,
    'G#': 4
  },
  major: {
    // Similar special cases for major scales
    'E': 12,
    'F': 1,
    'F#': 2,
    'G': 3,
    'G#': 4
  }
};

// Create pentatonic pattern exports with both minor and major
export const PENTATONIC_PATTERNS = {
  minor: A_MINOR_PATTERNS,
  major: A_MAJOR_PATTERNS
};

// Root note positions within each pattern
export const ROOT_POSITIONS = {
  minor: {
    1: [{ string: 6, fret: 5 }],                // Low E string, 5th fret for A minor
    2: [{ string: 5, fret: 7 }],                // A string, 7th fret
    3: [{ string: 3, fret: 9 }],                // G string, 9th fret
    4: [{ string: 3, fret: 12 }],               // G string, 12th fret
    "4-low": [{ string: 3, fret: 0 }],          // G string, open (low position for Shape 4)
    5: [{ string: 4, fret: 2 }],                // D string, 2nd fret
    "5-alt": [{ string: 4, fret: 14 }]          // D string, 14th fret
  },
  major: {
    // Root notes for A major pentatonic patterns
    1: [{ string: 1, fret: 5 }, { string: 4, fret: 7 }, { string: 6, fret: 5 }],  // Position 1 roots (A notes)
    2: [{ string: 2, fret: 7 }, { string: 4, fret: 7 }],                          // Position 2 roots (F# and A)
    3: [{ string: 1, fret: 12 }, { string: 5, fret: 9 }],                         // Position 3 roots (E and A)
    4: [{ string: 3, fret: 14 }, { string: 6, fret: 12 }],                        // Position 4 roots (B and E)
    5: [{ string: 1, fret: 5 }, { string: 6, fret: 5 }],                          // Position 5 roots (A and A)
    "4-low": [{ string: 3, fret: 4 }, { string: 6, fret: 0 }],                    // Position 4-low roots (B and E)
    "5-alt": [{ string: 1, fret: 17 }, { string: 6, fret: 17 }]                   // Position 5-alt roots (A and A)
  }
};

// Connector positions between adjacent patterns (for A minor/major)
// These will need to be transposed for other keys
export const CONNECTOR_POSITIONS = {
  // Pattern 1 to Pattern 2
  "1-2": [
    { string: 1, fret: 7 },  // High E
    { string: 3, fret: 6 },  // G
    { string: 5, fret: 7 }   // A
  ],
  // Pattern 2 to Pattern 3
  "2-3": [
    { string: 1, fret: 9 },  // High E
    { string: 3, fret: 9 },  // G
    { string: 5, fret: 9 }   // A
  ],
  // Pattern 3 to Pattern 4
  "3-4": [
    { string: 1, fret: 12 }, // High E
    { string: 3, fret: 11 }, // G
    { string: 5, fret: 12 }  // A
  ],
  // Pattern 3 to Pattern 4-low
  "3-4-low": [
    { string: 1, fret: 0 },  // High E
    { string: 3, fret: 1 },  // G
    { string: 5, fret: 0 }   // A
  ],
  // Pattern 4 to Pattern 5
  "4-5": [
    { string: 1, fret: 0 },  // High E
    { string: 3, fret: 4 },  // G
    { string: 5, fret: 2 }   // A
  ],
  // Pattern 4-low to Pattern 5
  "4-low-5": [
    { string: 1, fret: 0 },  // High E
    { string: 3, fret: 4 },  // G
    { string: 5, fret: 2 }   // A
  ],
  // Pattern 4 to Pattern 5-alt
  "4-5-alt": [
    { string: 1, fret: 12 }, // High E
    { string: 3, fret: 16 }, // G
    { string: 5, fret: 14 }  // A
  ],
  // Pattern 5 to Pattern 1
  "5-1": [
    { string: 1, fret: 5 },  // High E
    { string: 3, fret: 6 },  // G
    { string: 5, fret: 4 }   // A
  ],
  // Pattern 5-alt to Pattern 1
  "5-alt-1": [
    { string: 1, fret: 5 },  // High E (will be transposed)
    { string: 3, fret: 6 },  // G (will be transposed)
    { string: 5, fret: 4 }   // A (will be transposed)
  ],
  // Pattern 4-low to Pattern 1
  "4-low-1": [
    { string: 1, fret: 5 },  // High E
    { string: 3, fret: 6 },  // G
    { string: 5, fret: 4 }   // A
  ]
};

// Names for each pattern position
export const PATTERN_NAMES = {
  1: "Pattern 1 (Position 1)",
  2: "Pattern 2 (Position 2)",
  3: "Pattern 3 (Position 3)",
  4: "Pattern 4 (Position 4 - Standard)",
  "4-low": "Pattern 4 (Position 4 - Lower)",
  5: "Pattern 5 (Position 5 - Low)",
  "5-alt": "Pattern 5 (Position 5 - High)"
};

// Intervals for pentatonic scales (half steps)
export const PENTATONIC_INTERVALS = {
  minor: [0, 3, 5, 7, 10], // Root, minor 3rd, 4th, 5th, minor 7th
  major: [0, 2, 4, 7, 9]   // Root, major 2nd, major 3rd, 5th, major 6th
};
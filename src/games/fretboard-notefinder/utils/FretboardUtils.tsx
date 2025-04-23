// Utility functions for the fretboard app

import { NoteData } from '../components/core/NoteMarkers';

// All possible notes in western music (using sharps notation)
const ALL_NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

// Standard tuning open string notes (from low E to high e)
const STANDARD_TUNING = ['E', 'A', 'D', 'G', 'B', 'E'];

// Reversed tuning (from high e to low E) - for display purposes
export const REVERSED_STANDARD_TUNING = [...STANDARD_TUNING].reverse();

// Color map for each note (using Tailwind-like colors)
export const NOTE_COLORS: Record<string, string> = {
    'A': '#3b82f6',  // Blue
    'A#': '#3b82f6', // Blue
    'B': '#22c55e',  // Green
    'C': '#f97316',  // Orange
    'C#': '#f97316', // Orange
    'D': '#ef4444',  // Red
    'D#': '#ef4444', // Red
    'E': '#8b5cf6',  // Purple
    'F': '#eab308',  // Yellow
    'F#': '#eab308', // Yellow
    'G': '#14b8a6',  // Teal
    'G#': '#14b8a6', // Teal
};

/**
 * Get the note at a specific string and fret position
 * @param stringNumber - 1 to 6 (1 = high E, 6 = low E)
 * @param fretNumber - 0 to 24 (0 = open string)
 * @returns Note name (e.g., 'A', 'C#')
 */
export const getNoteAtPosition = (stringNumber: number, fretNumber: number): string => {
    // Get open string note (account for string numbering)
    // For standard tuning in our UI:
    // String 1 = high E, String 6 = low E
    let openStringNote;

    // String numbering is consistent in both desktop and mobile views
    // 1 = high E (index 5), 6 = low E (index 0)
    openStringNote = STANDARD_TUNING[6 - stringNumber];

    // Find the index of the open string note
    const openNoteIndex = ALL_NOTES.indexOf(openStringNote);

    // Calculate the note index at the given fret
    const noteIndex = (openNoteIndex + fretNumber) % ALL_NOTES.length;

    // Return the note name
    return ALL_NOTES[noteIndex];
};

/**
 * Generate all notes for the entire fretboard
 * @param numberOfStrings - Number of strings (usually 6)
 * @param numberOfFrets - Number of frets (typically 12-24)
 * @param startFret - First fret to include (default: 1, skipping open strings)
 * @returns Array of note data objects
 */
export const generateAllFretboardNotes = (
    numberOfStrings: number = 6,
    numberOfFrets: number = 21,
    startFret: number = 1
): NoteData[] => {
    const notes: NoteData[] = [];

    // Loop through each string and fret
    for (let stringNum = 1; stringNum <= numberOfStrings; stringNum++) {
        for (let fretNum = startFret; fretNum <= numberOfFrets; fretNum++) {
            const noteName = getNoteAtPosition(stringNum, fretNum);

            notes.push({
                stringNumber: stringNum,
                fretNumber: fretNum,
                label: noteName,
                color: NOTE_COLORS[noteName]
            });
        }
    }

    return notes;
};
import React, { useState, useEffect } from 'react';
import Fretboard from './Fretboard';
import MobileFretboard from './MobileFretboard';
import { NoteData } from './NoteMarkers';

type ResponsiveFretboardProps = {
    numberOfFrets: number;
    numberOfStrings?: number;
    tuning?: string[];
    notes?: NoteData[];
    onNoteClick?: (note: NoteData) => void;
    gameActive?: boolean;
    targetNote?: NoteData | null;
    guessResult?: boolean | null;
    scale?: number;
};

const ResponsiveFretboard: React.FC<ResponsiveFretboardProps> = (props) => {
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile screen size
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Check on initial render
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Conditionally render either the mobile or desktop fretboard
    return isMobile ? (
        <MobileFretboard {...props} />
    ) : (
        <Fretboard {...props} />
    );
};

export default ResponsiveFretboard;
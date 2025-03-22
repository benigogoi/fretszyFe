import React from 'react';

type NoteMarkerProps = {
    stringNumber: number;
    fretNumber: number;
    label?: string;
    color?: string;
    size?: number;
    onClick?: () => void;
    numberOfStrings: number;
    numberOfFrets: number;
    isTarget?: boolean;
    isCorrect?: boolean | null;
};

const NoteMarker: React.FC<NoteMarkerProps> = ({
    stringNumber,
    fretNumber,
    label,
    color = '#4f46e5',
    size = 26,
    onClick,
    numberOfStrings,
    numberOfFrets,
    isTarget = false,
    isCorrect = null
}) => {
    // Determine the marker color
    const getMarkerColor = () => {
        if (isTarget) {
            if (isCorrect === true) {
                return '#22c55e'; // Green if correct
            } else if (isCorrect === false) {
                return '#ef4444'; // Red if wrong
            } else {
                return '#ff1493'; // Hot pink as target
            }
        } else {
            return color; // Default color
        }
    };

    // Calculate position based on string and fret number
    const getPositionStyle = () => {
        // For desktop (horizontal) layout
        const stringPos = ((stringNumber - 0.5) * 100) / numberOfStrings;

        // Improved fret position calculation for better alignment
        const fretWidth = 100 / numberOfFrets;
        let fretPos = 0;

        if (fretNumber === 0) {
            // We shouldn't display these anyway, but just in case
            fretPos = fretWidth / 4; // Close to the nut
        } else {
            // Place dot exactly in the center of the fret space
            // First fret is special because there's the nut
            fretPos = fretNumber === 1
                ? fretWidth / 2 // Center of first fret space
                : ((fretNumber - 0.5) * fretWidth); // Center of other fret spaces
        }

        return {
            top: `${stringPos}%`,
            left: `${fretPos}%`,
            transform: 'translate(-50%, -50%)'
        };
    };

    return (
        <div
            className="absolute flex items-center justify-center rounded-full cursor-pointer"
            style={{
                ...getPositionStyle(),
                backgroundColor: getMarkerColor(),
                width: `${size}px`,
                height: `${size}px`,
                zIndex: 30, // Increased z-index to ensure notes appear above everything
                fontSize: size > 20 ? '14px' : '12px' // Adjust font size based on note size
            }}
            onClick={onClick}
        >
            {label && (
                <span className="text-white font-extrabold">
                    {label}
                </span>
            )}
        </div>
    );
};

export default NoteMarker;
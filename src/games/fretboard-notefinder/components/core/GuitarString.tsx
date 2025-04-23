import React from 'react';

type GuitarStringProps = {
    stringNumber: number;
    totalStrings?: number;
    isHighlighted?: boolean;
    isPlaying?: boolean;
};

const GuitarString: React.FC<GuitarStringProps> = ({
    stringNumber,
    totalStrings = 6,
    isHighlighted = false,
    isPlaying = false,
}) => {
    // Calculate thickness based on string number (thicker for bass strings)
    // For a 6-string guitar: 6=thickest (low E), 1=thinnest (high e)
    const getStringThickness = () => {
        const baseThickness = 1;
        const thicknessMultiplier = 0.4;
        return baseThickness + (stringNumber / totalStrings) * thicknessMultiplier * 6;
    };

    // Calculate color based on string properties
    const getStringColor = () => {
        if (isPlaying) return 'bg-green-400';
        if (isHighlighted) return 'bg-white';
        return 'bg-gray-400';
    };

    // Calculate string shadows for visual effect
    const getStringShadow = () => {
        if (isPlaying) return 'shadow-lg shadow-green-400/50';
        if (isHighlighted) return 'shadow-md shadow-white/30';
        return '';
    };

    return (
        <div
            className={`guitar-string absolute w-full ${getStringColor()} ${getStringShadow()}`}
            style={{
                height: `${getStringThickness()}px`,
                // Position string based on string number (1=top, 6=bottom for standard guitar)
                top: `${((stringNumber - 0.5) * 100) / totalStrings}%`,
                transform: 'translateY(-50%)'
            }}
        />
    );
};

export default GuitarString;
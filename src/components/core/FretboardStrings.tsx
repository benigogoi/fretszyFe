import React from 'react';
import GuitarString from './GuitarString';

type FretboardStringsProps = {
    numberOfStrings: number;
    reversed?: boolean; // Add this prop to control string order
    scale?: number;
};

const FretboardStrings: React.FC<FretboardStringsProps> = ({
    numberOfStrings,
    reversed = false,
    scale = 1.0
}) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: numberOfStrings }).map((_, index) => {
                let stringIndex = index;
                let thicknessIndex;

                // If reversed is true, reverse the string order
                if (reversed) {
                    // For desktop with reversed=true:
                    // - String order: high e (top) to low E (bottom)
                    // - Thickness: thin at top, thick at bottom
                    stringIndex = numberOfStrings - index - 1;
                    thicknessIndex = index; // Thicker as index increases (bottom strings)
                } else {
                    // For desktop with reversed=false:
                    // - String order: low E (top) to high e (bottom)
                    // - Thickness: thick at top, thin at bottom
                    thicknessIndex = numberOfStrings - index - 1;
                }

                // Calculate thickness - thicker for lower strings
                const thickness = (1 + ((thicknessIndex + 1) / numberOfStrings) * 0.4 * 6) * scale;

                return (
                    <div
                        key={`string-${index + 1}`}
                        className="guitar-string absolute w-full bg-gray-400"
                        style={{
                            height: `${thickness}px`,
                            top: `${((index + 0.5) * 100) / numberOfStrings}%`,
                            transform: 'translateY(-50%)',
                            zIndex: 10
                        }}
                    />
                );
            })}
        </div>
    );
};

export default FretboardStrings;
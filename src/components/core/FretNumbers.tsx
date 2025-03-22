import React from 'react';

type FretNumbersProps = {
    numberOfFrets: number;
    showAll?: boolean;
    scale?: number;
    orientation?: string;
};

const FretNumbers: React.FC<FretNumbersProps> = ({
    numberOfFrets,
    showAll = false,
    scale = 1.0
}) => {
    // Define which fret numbers to show
    const fretNumbersToShow = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

    return (
        <div className="absolute -bottom-4 left-0 w-full">
            {Array.from({ length: numberOfFrets + 1 }).map((_, index) => {
                // Skip if not in our list and we're not showing all
                if (!showAll && !fretNumbersToShow.includes(index)) return null;

                // Position at the center of the fret space
                const position = index === 0
                    ? 0 // Special case for the first position (nut)
                    : (index - 0.5) * (100 / numberOfFrets);

                return (
                    <div
                        key={`fret-num-${index}`}
                        className="absolute text-lg font-bold text-black"
                        style={{
                            left: `${position}%`,
                            transform: 'translateX(-50%)',
                            fontSize: `${1 * scale}rem`
                        }}
                    >
                        {index}
                    </div>
                );
            })}
        </div>
    );
};

export default FretNumbers;
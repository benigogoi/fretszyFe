import React from 'react';

type FretsProps = {
    numberOfFrets: number;
    fretWidth?: number;
    orientation?: string;
};

const Frets: React.FC<FretsProps> = ({
    numberOfFrets,
    fretWidth = 2
}) => {
    return (
        <div className="relative w-full h-full">
            {Array.from({ length: numberOfFrets }).map((_, index) => (
                <div
                    key={`fret-${index}`}
                    className="absolute top-0 h-full bg-gray-400 shadow-md"
                    style={{
                        left: `${((index + 1) * 100) / numberOfFrets}%`,
                        width: `${fretWidth}px`,
                        transform: 'translateX(-50%)'
                    }}
                />
            ))}
        </div>
    );
};

export default Frets;
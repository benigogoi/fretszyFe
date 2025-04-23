import React from 'react';

type StringLabelsProps = {
    numberOfStrings?: number;
    tuning?: string[];
    labelPosition?: 'left' | 'right';
    scale?: number;
};

const StringLabels: React.FC<StringLabelsProps> = ({
    numberOfStrings = 6,
    tuning = ['E', 'A', 'D', 'G', 'B', 'E'], // Standard tuning for 6-string guitar
    labelPosition = 'left',
    scale = 1.0
}) => {
    // Ensure we have the right number of string labels
    const stringLabels = [...tuning].slice(0, numberOfStrings);

    // For non-standard number of strings, we need to handle that
    if (stringLabels.length < numberOfStrings) {
        // Fill with placeholder labels if needed
        const missingLabels = numberOfStrings - stringLabels.length;
        for (let i = 0; i < missingLabels; i++) {
            stringLabels.push(`String ${i + stringLabels.length + 1}`);
        }
    }

    return (
        <div
            className={`string-labels absolute ${labelPosition === 'left' ? '-left-0' : '-right-8'} top-0 h-full flex flex-col justify-between py-2`}
        >
            {stringLabels.map((label, index) => (
                <div
                    key={`string-label-${index}`}
                    className={`flex items-center ${labelPosition === 'left' ? 'justify-end' : 'justify-start'} 
                               text-xl font-bold text-black`}
                    style={{
                        // Calculate the vertical position to match the strings
                        position: 'absolute',
                        top: `${((index + 0.5) * 100) / numberOfStrings}%`,
                        transform: 'translateY(-50%)',
                        left: 0,
                        right: 0,
                        fontSize: `${scale}em`
                    }}
                >
                    {label}
                </div>
            ))}
        </div>
    );
};

export default StringLabels;
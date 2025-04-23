import React from 'react';
import Select from './Select';

interface StringSelectionProps {
    startString: number;
    endString: number;
    onStartStringChange: (value: number) => void;
    onEndStringChange: (value: number) => void;
    variant?: 'light' | 'dark'; // Add variant prop
}

const StringSelection: React.FC<StringSelectionProps> = ({
    startString,
    endString,
    onStartStringChange,
    onEndStringChange,
    variant = 'light' // Default to light
}) => {
    // Guitar strings in standard tuning (from 6th/low E to 1st/high E)
    const guitarStrings = [
        { value: 6, label: '6th (low E)' },
        { value: 5, label: '5th (A)' },
        { value: 4, label: '4th (D)' },
        { value: 3, label: '3rd (G)' },
        { value: 2, label: '2nd (B)' },
        { value: 1, label: '1st (high E)' }
    ];

    const handleStartStringChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = parseInt(e.target.value);
        onStartStringChange(newValue);

        // If end string is higher than start string (meaning a lower string number), 
        // update end string to match start string
        if (newValue < endString) {
            onEndStringChange(newValue);
        }
    };

    const handleEndStringChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = parseInt(e.target.value);
        onEndStringChange(newValue);

        // If end string is lower than start string (meaning a higher string number), 
        // update start string to match end string
        if (newValue > startString) {
            onStartStringChange(newValue);
        }
    };

    // Determine if we're on mobile based on viewport width
    const isMobile = window.innerWidth < 768;
    
    // Get the text color based on variant
    const getLabelTextColor = () => {
        return variant === 'dark' ? 'text-white' : 'text-gray-700';
    };

    return (
        <div className={isMobile ? "grid grid-cols-2 gap-2" : "flex flex-col sm:flex-row gap-4 items-center justify-center"}>
            <div>
                <label className={`block mb-2 font-medium text-sm sm:text-base ${getLabelTextColor()}`}>From String</label>
                <Select
                    id="start-string"
                    options={guitarStrings.map(string => ({ value: string.value, label: string.label }))}
                    value={startString}
                    onChange={(e) => handleStartStringChange(e)}
                    className="text-sm sm:text-base"
                    variant={variant}
                />
            </div>

            <div>
                <label className={`block mb-2 font-medium text-sm sm:text-base ${getLabelTextColor()}`}>To String</label>
                <Select
                    id="end-string"
                    options={guitarStrings
                        .filter((string) => string.value <= startString)
                        .map(string => ({ value: string.value, label: string.label }))}
                    value={endString}
                    onChange={(e) => handleEndStringChange(e)}
                    className="text-sm sm:text-base"
                    variant={variant}
                />
            </div>
        </div>
    );
};

export default StringSelection;
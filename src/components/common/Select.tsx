import React, { SelectHTMLAttributes } from 'react';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
    label?: string;
    variant?: 'light' | 'dark'; // Add variant prop for different backgrounds
}

const Select: React.FC<SelectProps> = ({
    options,
    label,
    className = '',
    id,
    variant = 'light', // Default to light
    ...props
}) => {
    // Define styles based on variant
    const getSelectStyles = () => {
        if (variant === 'dark') {
            return 'bg-gray-800 text-white border-gray-700 focus:ring-blue-500 focus:border-blue-500';
        }
        return 'bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500';
    };
    
    const getLabelStyles = () => {
        if (variant === 'dark') {
            return 'text-white';
        }
        return 'text-gray-700';
    };

    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={id} className={`font-medium ${getLabelStyles()}`}>
                    {label}
                </label>
            )}
            <select
                id={id}
                className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${getSelectStyles()} ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
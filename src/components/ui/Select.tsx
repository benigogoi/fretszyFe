import React, { SelectHTMLAttributes } from 'react';

interface Option {
    value: string | number;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
    label?: string;
}

const Select: React.FC<SelectProps> = ({
    options,
    label,
    className = '',
    id,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label htmlFor={id} className="font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select
                id={id}
                className={`px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
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
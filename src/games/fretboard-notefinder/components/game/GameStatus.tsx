import React from 'react';
import Button from '../../../../components/common/Button';

type GameStatusProps = {
    score: number;
    attempts: number;
    maxAttempts: number;
    onEndGame: () => void;
    variant?: 'light' | 'dark'; // Add variant prop
};

const GameStatus: React.FC<GameStatusProps> = ({
    score,
    attempts,
    maxAttempts,
    onEndGame,
    variant = 'light' // Default to light
}) => {
    // Get the appropriate background color and text color based on variant
    const getStatusStyles = () => {
        if (variant === 'dark') {
            return 'bg-gray-800 text-white';
        }
        return 'bg-gray-100 text-gray-900';
    };

    return (
        <div className={`game-status flex items-center justify-between mb-4 p-4 ${getStatusStyles()} rounded-lg shadow-md`}>
            <div className="flex items-center space-x-10">
                <div className="score flex items-center">
                    <span className="font-bold mr-2">Score:</span> 
                    <span className="text-xl font-semibold">{score}</span>
                </div>
                <div className="attempts flex items-center">
                    <span className="font-bold mr-2">Attempts:</span> 
                    <div className="flex space-x-1">
                        {Array.from({ length: maxAttempts }).map((_, i) => (
                            <span 
                                key={i} 
                                className={`w-3 h-3 rounded-full ${i < attempts ? 'bg-red-500' : 'bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Button 
                variant="danger" 
                size="sm" 
                onClick={onEndGame}
                className="font-semibold"
            >
                End Game
            </Button>
        </div>
    );
};

export default GameStatus;
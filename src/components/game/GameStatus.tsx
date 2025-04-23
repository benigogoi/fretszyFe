import React from 'react';
import Button from '../ui/Button';

type GameStatusProps = {
    score: number;
    attempts: number;
    maxAttempts: number;
    onEndGame: () => void;
};

const GameStatus: React.FC<GameStatusProps> = ({
    score,
    attempts,
    maxAttempts,
    onEndGame
}) => {
    return (
        <div className="game-status flex items-center justify-between mb-4 p-4 bg-gray-100 rounded">
            <div className="flex items-center space-x-6">
                <div className="score">
                    <span className="font-bold">Score:</span> {score}
                </div>
                <div className="attempts">
                    <span className="font-bold">Attempts:</span> {attempts}/{maxAttempts}
                </div>
            </div>
            <Button variant="danger" size="sm" onClick={onEndGame}>
                End Game
            </Button>
        </div>
    );
};

export default GameStatus;
import React, { useState, useEffect } from 'react';
import { NoteData } from '../core/NoteMarkers';
import NoteSelector from './NoteSelector';
import GameStatus from './GameStatus';

type GameControllerProps = {
    fretLength: number;
    startString: number;
    endString: number;
    onEndGame: () => void;
};

const GameController: React.FC<GameControllerProps> = ({
    fretLength,
    startString,
    endString,
    onEndGame
}) => {
    // Game state
    // const [currentNote, setCurrentNote] = useState<NoteData | null>(null);
    const [_, setCurrentNote] = useState<NoteData | null>(null);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [maxAttempts] = useState(3);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    // Generate a random note position
    const generateRandomNote = () => {
        // Random string between startString and endString
        const stringNumber = Math.floor(
            Math.random() * (startString - endString + 1) + endString
        );

        // Random fret between 1 and fretLength
        const fretNumber = Math.floor(Math.random() * fretLength) + 1;

        // We'll get the actual note value in the Fretboard component
        return {
            stringNumber,
            fretNumber
        };
    };

    // Initialize game with first random note
    useEffect(() => {
        setCurrentNote(generateRandomNote());
    }, []);

    // Handle user's note selection
    const handleNoteGuess = (guessedNote: string, correctNote: string) => {
        if (guessedNote === correctNote) {
            // Correct guess
            setIsCorrect(true);
            setScore(score + 1);

            // Move to next note after a brief delay
            setTimeout(() => {
                setCurrentNote(generateRandomNote());
                setAttempts(0);
                setIsCorrect(null);
            }, 1000);
        } else {
            // Wrong guess
            setIsCorrect(false);
            setAttempts(attempts + 1);

            // Move to next note if max attempts reached
            if (attempts + 1 >= maxAttempts) {
                setTimeout(() => {
                    setCurrentNote(generateRandomNote());
                    setAttempts(0);
                    setIsCorrect(null);
                }, 1000);
            }
        }
    };

    return (
        <div className="game-controller">
            <GameStatus
                score={score}
                attempts={attempts}
                maxAttempts={maxAttempts}
                onEndGame={onEndGame}
            />
            <NoteSelector onSelectNote={handleNoteGuess} isCorrect={isCorrect} />

            {/* We'll pass currentNote to Fretboard in the App component */}
        </div>
    );
};

export default GameController;
import React, { createContext, useState, ReactNode } from 'react';

// Game state with context types
interface GameState {
    board: ( number | null ) [][]; // 9x9 board array
    setBoard: (board: ( number | null ) [][]) => void;
    fixedCells: boolean[][];
    setFixedCells: (fixedCells: boolean[][]) => void;
    selectedCell: { row: number; col: number } | null;
    isDifficultySet: boolean;
    setIsDifficultySet: (value: boolean) => void;
    difficulty: string;
    setDifficulty: (value: string) => void;
  }

export const GameContext = createContext<GameState | undefined>(undefined);

export default function GameContextProvider( { children }: { children: ReactNode } ) {

    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
    const [difficulty, setDifficulty] = useState<string>('');
    const [isDifficultySet, setIsDifficultySet] = useState<boolean>(false);
    const [board, setBoard] = useState<( number | null )[][]>([]);
    const [fixedCells, setFixedCells] = useState<boolean[][]>([]);
    
    return (
        <GameContext.Provider value={{ board, setBoard, fixedCells, setFixedCells, selectedCell, isDifficultySet, setIsDifficultySet, difficulty, setDifficulty}}>
            {children}
        </GameContext.Provider>
    );

};


import { useContext, useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';

import { GameContext } from '../context/GameContext';
import { generateSudoku, createPuzzle } from '../utils/generateSudoku';
import createTimer from '../utils/Timer';

export default function useSudokuLogic() {

    const gamecontext = useContext(GameContext);

    if (!gamecontext) {
        Alert.alert('Sudoku Logic Failed!!!');
        throw new Error('useSudokuLogic must be used within a GameContextProvider');
    }

    const { board, setBoard, fixedCells, setFixedCells, difficulty, setDifficulty, setIsDifficultySet } = gamecontext;
    
    // Loading state to control visibility
    const [loading, setLoading] = useState<boolean>(false);

    // Timer integration
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const timer = useRef(
        createTimer((currentTime) => setElapsedTime(currentTime))
    ).current;

    useEffect(() => {

      // Only generate the puzzle if the difficulty is set to a valid value
      if (difficulty) {

        timer.reset(); // Reset the timer  
        timer.start(); // Start the timer automatically

        setLoading(true); // Start loading
        const timeout = setTimeout(() => {

        const completeBoard = generateSudoku(); // Generate a complete board and then create a puzzle based on difficulty
        const puzzleBoard = createPuzzle(completeBoard, difficulty); // Adjust difficulty here

        setBoard(puzzleBoard);
        setFixedCells( puzzleBoard.map(row => row.map(cell => cell !== 0)) ); //Mark fixed cells
        setLoading(false); // Stop loading
        

        // Debugging: Check board and fixedCells initialization
        console.log('Complete Board Initialized:', completeBoard);
        console.log('Puzzle Board Initialized:', puzzleBoard);
        console.log('Fixed Cells Initialized:', puzzleBoard.map(row => row.map(cell => cell !== 0)));
        console.log('Difficulty:', difficulty);

        }, 500); // Adjust the delay (in milliseconds)

        return () => {
          clearTimeout(timeout); // Cleanup timeout
        };

      };

      return () => {
        timer.pause(); // Stop the timer if difficulty is cleared
      };

    }, [difficulty, setBoard, setFixedCells]);

    // Update a cell only if it's not fixed
    const updateCell = (row: number, col: number, value: number | null) => {
      if (fixedCells[row][col]) {
        Alert.alert("Can't change a fixed cell!");
        return;
      }
      const newBoard = board.map((new_row_array, rowIndex) => //The outer .map() iterates over each row and board.map() creates a new numbers array by applying a function to each row 
        new_row_array.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell)) //The inner .map() iterates over each cell in the row
      ); 
      
      setBoard(newBoard); // Update board in the context

      // Debugging: Check the updated board state
      console.log('Updated Board:', newBoard);
  };

  const resetGame = () => {
    setIsDifficultySet(false); // Clear the difficulty selection
    setDifficulty(''); // Clear the difficulty itself
    setBoard([]); // Reset the board
    setFixedCells([]); // Clear fixed cells
    
    timer.reset(); // Reset the timer
  };

  // Validate the entire Sudoku Board
  const validateBoard = () => {

    const isValidSudoku = (board: ( number | null ) [][]): boolean => {
        const rows = new Set();
        const cols = new Set();
        const grids = new Set();

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const num = board[row][col];
                if (num === 0) return false; // Incomplete board

                const rowKey = `row-${row}-${num}`;
                const colKey = `col-${col}-${num}`;
                const gridKey = `grid-${Math.floor(row / 3)}-${Math.floor(col / 3)}-${num}`;

                if (rows.has(rowKey) || cols.has(colKey) || grids.has(gridKey)) {
                    return false; // Duplicate number in row, column, or grid
                }

                rows.add(rowKey);
                cols.add(colKey);
                grids.add(gridKey);
            }
        }
        return true;
    };

    // Check the board and show a message
    if (isValidSudoku(board)) {
        Alert.alert('Congratulations!', 'The Sudoku puzzle is solved correctly!', [{ text: 'OK' }]);
    } else {
        Alert.alert('Not There Yet!', 'The puzzle is incorrect or incomplete.', [{ text: 'Try Again' }]);
    }

};

  return { board, fixedCells, updateCell, resetGame, loading, validateBoard, elapsedTime };

};




import { useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { GameContext } from '../context/GameContext';
import { generateSudoku, createPuzzle } from '../utils/generateSudoku';

export default function useSudokuLogic() {

    const gamecontext = useContext(GameContext);

    if (!gamecontext) {
        Alert.alert('Sudoku Logic Failed!!!');
        throw new Error('useSudokuLogic must be used within a GameContextProvider');
    }

    const { board, setBoard, fixedCells, setFixedCells, difficulty, setDifficulty, setIsDifficultySet } = gamecontext;

    // Loading state to control visibility
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

      // Only generate the puzzle if the difficulty is set to a valid value
      if (difficulty) {

      setLoading(true); // Start loading
      const timeout = setTimeout(() => {

        const completeBoard = generateSudoku(); // Generate a complete board and then create a puzzle based on difficulty
        const puzzleBoard = createPuzzle(completeBoard, difficulty); // Adjust difficulty here

        setBoard(puzzleBoard);
        setFixedCells(puzzleBoard.map(row => row.map(cell => cell !== 0))); //Mark fixed cells
        setLoading(false); // Stop loading

        // Debugging: Check board and fixedCells initialization
        console.log('Puzzle Board Initialized:', puzzleBoard);
        console.log('Fixed Cells Initialized:', puzzleBoard.map(row => row.map(cell => cell !== 0)));
        console.log('Difficulty:', difficulty);

      }, 500); // Adjust the delay (in milliseconds)

      return () => clearTimeout(timeout); // Cleanup timeout

      }

    }, [difficulty, setBoard, setFixedCells]);

    // Update a cell only if it's not fixed
    const updateCell = (row: number, col: number, value: number) => {
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
  };

  return { board, fixedCells, updateCell, resetGame, loading };

};


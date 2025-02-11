import { useContext, useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';

import { GameContext } from '../context/GameContext';
import { generateSudoku, createPuzzle } from '../utils/generateSudoku';
import isValidSudoku from '../utils/ValidateSudoku';
import createTimer from '../utils/Timer';
import { playSound } from '../utils/SoundPlayer';
import SoundManager from '../utils/SoundManager';

export default function useSudokuLogic() {

    const gamecontext = useContext(GameContext);

    if (!gamecontext) {
        Alert.alert('Sudoku Logic Failed!!!');
        throw new Error('useSudokuLogic must be used within a GameContextProvider');
    }

    const { board, setBoard, fixedCells, setFixedCells, difficulty, setDifficulty, setIsDifficultySet } = gamecontext;
    
    // Complete board state to store the solution
    const [CompleteBoard, setCompleteBoard] = useState<( number )[][]>([]);

    // Loading state to control visibility
    const [loading, setLoading] = useState<boolean>(false);

    // Confetti visibility state to control visibility
    const [confettiVisible, setConfettiVisible] = useState(false);

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

          setCompleteBoard(completeBoard); 
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

  const autofillNextEmptyCell = () => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] === 0) {
          const newBoard = board.map((rowArray, rowIndex) =>
            rowArray.map((cell, colIndex) => (rowIndex === row && colIndex === col ? CompleteBoard[row][col] : cell))
          );
          setBoard(newBoard);
          return;
        }
      }
    }
  };

  const autocompleteGrid = () => {
    const newBoard = board.map((row, rowIndex) =>
      row.map((cell, colIndex) => (cell === 0 ? CompleteBoard[rowIndex][colIndex] : cell))
    );
    setBoard(newBoard);
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

    // Check the board and show a message
    if (isValidSudoku(board)) {
        setConfettiVisible(true); // Trigger confetti animation
        setTimeout(() => setConfettiVisible(false), 3000); // Stop confetti after 3 seconds
        timer.pause(); // Pause the timer
        const sound = SoundManager.getValidSolutionClick();
        if (sound) {
          playSound(sound); // Play valid solution sound
        } 
        Alert.alert('Congratulations!', 'The Sudoku puzzle is solved correctly!', [{ text: 'OK' }]);
    } else {
      const sound = SoundManager.getInvalidSolutionClick();
      if (sound) {
        playSound(sound); // Play invalid solution sound
      } 
      Alert.alert('Not There Yet!', 'The puzzle is incorrect or incomplete.', [{ text: 'Try Again' }]);
    }

  };

  return { board, fixedCells, updateCell, autofillNextEmptyCell, autocompleteGrid, resetGame, loading, validateBoard, confettiVisible, elapsedTime };

};




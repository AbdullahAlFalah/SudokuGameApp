
// Function to check if placing a number is valid
const isValid = (board: number[][], row: number, col: number, num: number): boolean => {

    // Check row: Loop through the columns of the given row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }
    
    // Check column: Loop through the rows of the given column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }
    
    // Check 3x3 subgrid (Box): Loop through the cells in the 3x3 box
    const startRow = Math.floor(row / 3) * 3; // Start of the subgrid row
    const startCol = Math.floor(col / 3) * 3; // Start of the subgrid column
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false; // If num already exists in the 3x3 subgrid, it's invalid
            }
        }
    }
    
    return true; // If no conflicts, return true indicating placement is valid
};

// Utility function to shuffle an array
const shuffleArray = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Backtracking function to generate the Sudoku board
const generateBoard = (board: number[][]): boolean => {

    // Loop through each cell in the board (row by row, column by column)
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) { // Find an empty cell (value is 0)

                // Try numbers 1 to 9 that are ordered randomly
                const shufflednumbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                for (let num of shufflednumbers) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num; // Place the number
                        
                        // Recurse to fill the next cell and try solving the board with this number
                        if (generateBoard(board)) {
                            return true; // If the board is filled, return true
                        }

                        // Backtrack to the previous recursive call: reset the previous cell if no valid number is found in the current cell
                        board[row][col] = 0;
                        
                    }
                }
                
                return false; // No valid number found for this cell... so backtrack
            }

        }
    }
    
    return true; // Board is completely filled
};

// Function to generate a complete Sudoku board
export const generateSudoku = (): number[][] => {
    const board: number[][] = Array(9).fill(null).map(() => Array(9).fill(0)); // Create a 9x9 empty board for the initial state
    generateBoard(board); // Generate the board using backtracking
    return board;
};

// Optional: Function to remove numbers from the board to create a puzzle
export const createPuzzle = (board: number[][], difficulty: string): number[][] => {

    // Create a deep copy of the board
    const puzzle = board.map(row => [...row]);

    // const numCellsToRemove = difficulty === 'easy' ? 35 : difficulty === 'medium' ? 45 : difficulty === 'hard' ? 55 : 65; // Issue here is I have to have an else for a 4th option that I don't need now so I will use a switch...
    let numCellsToRemove;
    switch (difficulty) {
        case 'easy':
            numCellsToRemove = 35;
            break;
        case 'medium':
            numCellsToRemove = 45;
            break;
        case 'hard':
            numCellsToRemove = 55;
            break;
        default:
            numCellsToRemove = 45; // Added this bc this variable cannot be undefined    
    }

    // Track removed cells to avoid re-selection
    const removedCells = new Set<string>(); // A Set to track unique removed cells

    while (removedCells.size < numCellsToRemove) {

        const row = Math.floor(Math.random() * 9); // Random row index
        const col = Math.floor(Math.random() * 9); // Random column index

        const cellkey = `${row}-${col}`; // Create a unique identifier for the cell

        if (!removedCells.has(cellkey)) {
            puzzle[row][col] = 0; // Remove the number at that position
            removedCells.add(cellkey); // Add this cell to the removed set
        }
        
    }

    return puzzle;
    
};


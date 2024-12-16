export default function isValidSudoku (board: number[][]): boolean {

    // Initialize sets for rows, columns, and grids  
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

    return true; // Valid Sudoku

}


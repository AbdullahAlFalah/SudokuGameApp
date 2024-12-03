import React from 'react';
import { View, StyleSheet } from 'react-native';
import SudokuCell from './SudokuCell';

interface GridProps {
  board: ( number | null ) [][];
  fixedCells: boolean[][];
  onCellChange: (row: number, col: number, value: number | null) => void;
}

export default function Grid ( { board, fixedCells, onCellChange } : GridProps) {

    return (
        <View style={styles.grid}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={[ styles.row,
              (rowIndex + 1) % 3 === 0 && rowIndex !== 8 && styles.subgridRow, // Bold bottom border for subgrids
              rowIndex === 8 && styles.lastRow, // Skip borderBottom for the last row
            ]}>
              {row.map((cellValue, colIndex) => (
                <View key={`${rowIndex}-${colIndex}`} style={[styles.cell,
                  (colIndex + 1) % 3 === 0 && colIndex !== 8 && styles.subgridCol, // Bold right border for subgrids
                  colIndex === 8 && styles.lastCol, // Skip borderRight for the last column
                ]}>
                  <SudokuCell
                    value={cellValue}
                    onChange={(value) => onCellChange(rowIndex, colIndex, value)}
                    isFixed={fixedCells[rowIndex][colIndex]} // Set readonly for fixed cells
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      );
};

const styles = StyleSheet.create({
    grid: {
      width: 367 , // 9 cells * 39 px each = 351 + 16 considering the borders
      height: 367 , // 9 cells * 39 px each = 351 + 16 considering the borders
      borderWidth: 2,
      borderColor: '#000000', // Outer grid bold border
    },
    row: {
      flexDirection: 'row', // Place cells in each row in a single line
      borderBottomWidth: 1,
      borderColor: '#deb887', // Default thin row borders
    },
    // Apply bold row borders for subgrid boundaries
    subgridRow: {
      borderBottomWidth: 3,
      borderColor: '#4682b4',
    },
    // Apply bold column borders for subgrid boundaries
    subgridCol: {
      borderRightWidth: 3,
      borderColor: '#4682b4',
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    // Skip right border for the last column
    lastCol: {
      borderRightWidth: 0,
    },
    cell: {
      borderRightWidth: 1,
      borderColor: '#deb887', // Default thin column borders
    },
  });

  
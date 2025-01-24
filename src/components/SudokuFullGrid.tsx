import React from 'react';
import { View, StyleSheet } from 'react-native';

import SudokuCell from './SudokuCell';
import { useTheme } from '../context/ThemeContext';
import { getThemeStyles } from '../Theme/ThemeStyles';

interface GridProps {
  board: ( number ) [][];
  fixedCells: boolean[][];
  onCellChange: ( row: number, col: number, value: number ) => void;
}

export default function Grid ( { board, fixedCells, onCellChange } : GridProps) {

  const {theme, background} = useTheme();
  const Themestyles = getThemeStyles(theme, background);

    return (
        <View style={[styles.grid, Themestyles.boarderColor]}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={[ styles.row,
              (rowIndex + 1) % 3 === 0 && rowIndex !== 8 && styles.subgridRow, // Bold bottom border for subgrids
              rowIndex === 8 && styles.lastRow, // Skip borderBottom for the last row
              Themestyles.boarderColor,
            ]}>
              {row.map((cellValue, colIndex) => (
                <View key={`${rowIndex}-${colIndex}`} style={[styles.cell,
                  (colIndex + 1) % 3 === 0 && colIndex !== 8 && styles.subgridCol, // Bold right border for subgrids
                  colIndex === 8 && styles.lastCol, // Skip borderRight for the last column
                  Themestyles.boarderColor,
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
      borderBottomWidth: 1, // Default thin row borders
      borderColor: '#deb887', // burlywood for row borders for debugging
    },
    // Apply bold row borders for subgrid boundaries
    subgridRow: {
      borderBottomWidth: 3,
      borderColor: '#4682b4', // Steel Blue for subgrid boundaries for debugging
    },
    // Apply bold column borders for subgrid boundaries
    subgridCol: {
      borderRightWidth: 3,
      borderColor: '#4682b4', // Steel Blue for subgrid boundaries for debugging
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    // Skip right border for the last column
    lastCol: {
      borderRightWidth: 0,
    },
    cell: {
      borderRightWidth: 1, // Default thin column borders
      borderColor: '#deb887', // burlywood for column borders for debugging
    },
  });

  
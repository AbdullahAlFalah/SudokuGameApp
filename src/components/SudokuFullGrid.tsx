import React from 'react';
import { View, StyleSheet } from 'react-native';
import SudokuCell from './SudokuCell';

interface GridProps {
  board: number[][];
  fixedCells: boolean[][];
  onCellChange: (row: number, col: number, value: number) => void;
}

export default function Grid ( { board, fixedCells, onCellChange } : GridProps) {
    return (
        <View style={styles.grid}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cellValue, colIndex) => (
                <SudokuCell
                  key={`${rowIndex}-${colIndex}`}
                  value={cellValue}
                  onChange={(value) => onCellChange(rowIndex, colIndex, value)}
                  isFixed={fixedCells[rowIndex][colIndex]} // Set readonly for fixed cells
                />
              ))}
            </View>
          ))}
        </View>
      );
};

const styles = StyleSheet.create({
    grid: {
      width: 350,
      height: 350,
    },
    row: {
      flexDirection: 'row', // Place cells in each row in a single line
    },
  });

  
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SudokuCellProps {
  value: number;
  isFixed: boolean;
  rowIndex: number; // Add row index for subgrid styling
  colIndex: number; // Add column index for subgrid styling
  onChange: (value: number) => void;
}

export default function SudokuCell ({ value, isFixed, rowIndex, colIndex, onChange }: SudokuCellProps) {

  const isBoldRow = (rowIndex + 1) % 3 === 0 && rowIndex !== 8; // Highlight bottom border for every 3rd row, except for the outer grid
  const isBoldCol = (colIndex + 1) % 3 === 0 && colIndex !== 8; // Highlight right border for every 3rd column, except for the outer grid
  const isTopRow = rowIndex === 0; // Add border to the topmost row
  const isLeftCol = colIndex === 0; // Add border to the leftmost column


  return (
    <View style={[styles.Normalcell,
      isBoldRow && styles.boldBottomBorder, // Apply bold bottom border for subgrid
      isBoldCol && styles.boldRightBorder, // Apply bold right border for subgrid
      isTopRow && styles.topBorder, // Add border to topmost row
      isLeftCol && styles.leftBorder, // Add border to leftmost column
    ]}>
      <TextInput
        style={ [styles.input, isFixed && styles.Fixedcell] } // Apply different style if the cell is fixed/readonly
        keyboardType="numeric"
        maxLength={1}
        value={value === 0 ? '' : String(value)}
        onChangeText={ (text) => onChange(parseInt(text) || 0) }
        editable={!isFixed} // Disable input if fixed/readonly is true
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Normalcell: {
    width: 40,
    height: 40,
    borderBottomWidth: 1, // Default thin border
    borderRightWidth: 1, // Default thin border   
    borderColor: '#deb887',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldBottomBorder: {
    borderBottomWidth: 3, // Bold border for subgrid
    borderColor: '#4682b4', // Different color for subgrid borders
  },
  boldRightBorder: {
    borderRightWidth: 3, // Bold border for subgrid
    borderColor: '#4682b4',
  },
  topBorder: {
    borderTopWidth: 1, // Thin border for top row
    borderColor: '#deb887',
  },
  leftBorder: {
    borderLeftWidth: 1, // Thin border for left column
    borderColor: '#deb887',
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ff0000',
  },
  Fixedcell: {
    color: '#000000', 
  }
});



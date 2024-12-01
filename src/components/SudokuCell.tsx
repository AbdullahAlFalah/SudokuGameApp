import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SudokuCellProps {
  value: number;
  isFixed: boolean;
  onChange: (value: number) => void;
}

export default function SudokuCell ({ value, isFixed, onChange }: SudokuCellProps) {

  return (
    <View style={[ styles.Normalcell ]}>
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
    width: 39,
    height: 39,
    justifyContent: 'center',
    alignItems: 'center',
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



import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';

import NumberPickerModal from './NumberPicker';

interface SudokuCellProps {
  value: number; 
  isFixed: boolean;
  onChange: (value: number) => void; 
}

export default function SudokuCell ({ value, isFixed, onChange }: SudokuCellProps) {

  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number>(0);

  const handleNumberSelect = ( number: number ) => {
    setPickerVisible(false); // Close the modal
    setSelectedNumber(number); // Update local state
    onChange(number); // Update the cell value
  };

  return (
    <>

      {/* Cell */}
      {isFixed ? (
        <View style={[styles.Normalcell, styles.fixedCell]}>
          <Text style={styles.fixedText}>{value}</Text>
        </View>
      ) : ( 
        <TouchableOpacity style={styles.Normalcell} onPress={() => setPickerVisible(true)}>
          <Text style={styles.input}>{value || ''}</Text>
        </TouchableOpacity>
      )}

      {/* Number Picker Modal */}
      <NumberPickerModal
        isPickerVisible={isPickerVisible}
        selectedNumber={selectedNumber}
        onClose={() => setPickerVisible(false)}
        onNumberSelect={handleNumberSelect}
      />

    </>
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
  fixedCell: {
    backgroundColor: '#f0f0f0', // Light gray for fixed cells
  },
  fixedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
});



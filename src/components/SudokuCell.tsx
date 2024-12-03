import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';

interface SudokuCellProps {
  value: number; 
  isFixed: boolean;
  onChange: (value: number) => void; 
}

export default function SudokuCell ({ value, isFixed, onChange }: SudokuCellProps) {

  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);

  const handleNumberSelect = ( number: number ) => {
    setPickerVisible(false); // Close the modal
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

      {/* Modal Number Picker */}
      <Modal
        transparent={true}
        visible={isPickerVisible}
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Number</Text>
            <View style={styles.numberGrid}>
              {[...Array(9)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.numberButton}
                  onPress={() => handleNumberSelect(index + 1)}
                >
                  <Text style={styles.numberText}>{index + 1}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[styles.numberButton, styles.clearButton]}
                onPress={() => handleNumberSelect(0)}
              >
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0, // Ensures the overlay covers the entire screen
  },
  modalContainer: {
    width: Dimensions.get('window').width * 0.8, // Modal takes 80% of screen width
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  numberButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#4682b4',
    borderRadius: 25,
  },
  numberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF6347',
  },
  clearText: {
    color: '#fff',
    fontSize: 16,
  },
});



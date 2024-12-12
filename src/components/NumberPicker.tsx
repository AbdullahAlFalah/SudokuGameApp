import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';

interface NumberPickerModalProps {
  isPickerVisible: boolean;
  selectedNumber: number;
  onClose: () => void;
  onNumberSelect: (number: number) => void;
}

export default function NumberPickerModal({
  isPickerVisible,
  selectedNumber,
  onClose,
  onNumberSelect,
}: NumberPickerModalProps) {
    return (

        // Modal Number Picker  
        <Modal
            transparent={true}
            visible={isPickerVisible}
            animationType="fade"
            onRequestClose={onClose}
        >

            <View style={styles.modalOverlay}>

                <View style={styles.modalContainer}>

                    <Text style={styles.modalTitle}>Select a Number</Text>
                    <View style={styles.numberGrid}>

                        {/* Number Buttons */}
                        {[...Array(9)].map((_, index) => (

                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.numberButton, 
                                selectedNumber === index + 1 && styles.selectedNumberButton, // Highlight selected number
                            ]}
                            onPress={() => onNumberSelect(index + 1)}
                        >

                            <Text style={[
                                styles.numberText,
                                selectedNumber === index + 1 && styles.selectedNumberText, // Change text color for selected
                                ]}
                            >
                                {index + 1}
                            </Text>

                        </TouchableOpacity>

                        ))}

                        {/* Clear Button */}
                        <TouchableOpacity
                        style={[styles.numberButton, styles.clearButton]}
                        onPress={() => onNumberSelect(0)}
                        >
                        <Text style={styles.clearText}>Clear</Text>
                        </TouchableOpacity>

                    </View>
        
                    {/* Cancel Button */}
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={onClose}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>  

                </View>

            </View>

        </Modal>

    );    
}

const styles = StyleSheet.create({
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
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',

      // Glassmorphism Effect
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      elevation: 5, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 4,
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
      backgroundColor: '#4682b4',  
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      borderRadius: 25,
    },
    numberText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    selectedNumberButton: { // Highlighted button color
      backgroundColor: '#dc143c', 
      borderWidth: 2,
      borderColor: '#fff',
    },
    selectedNumberText: { // Highlighted button text
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
    cancelButton: {
      marginTop: 15,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#616161',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancelButtonText: {
      color: '#fff',
      fontSize: 16,
    },
  });

  

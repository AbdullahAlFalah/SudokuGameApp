import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable, Text } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Grid from '../components/SudokuFullGrid';
import useSudokuLogic from '../hooks/useSudokuLogic';
import { GameContext } from '../context/GameContext';
import DifficultySelector from '../components/DifficultySelector';

export default function GameScreen() {
    
    const gameContext = useContext(GameContext);

    if (!gameContext) {
        throw new Error('GameScreen must be used within a GameContextProvider');
      }

    const { isDifficultySet } = gameContext;
    const { board, fixedCells, updateCell, resetGame, loading } = useSudokuLogic();

    return (
        <View style={styles.container}>

            {loading && (
                <View style={styles.loadingcontainer}>
                    {/* Show loading spinner while the board is being generated */}
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}

            {isDifficultySet && (
                <Pressable style={styles.resetButtoncontainer} onPress={resetGame}>
                    <SimpleLineIcons name="reload" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Reset</Text>
                </Pressable>
            )}

            {isDifficultySet ? (
                <Grid board={board} fixedCells={fixedCells} onCellChange={updateCell} />
            ) : (
                <DifficultySelector />
            )}

        </View>
    );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingcontainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    resetButtoncontainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#2e8b57', 
        padding: 10,
        borderRadius: 20, // Circular button
        elevation: 2, // Adds a shadow (Android)
        shadowColor: '#000', // For iOS shadow
        zIndex: 1, // Ensure the button appears on top
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        flexDirection: 'row',
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'medium',
        color: '#f0f8ff',
      },
  });


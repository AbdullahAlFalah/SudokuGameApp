import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

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
    const { board, fixedCells, updateCell } = useSudokuLogic();

    return (
        <View style={styles.container}>
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
  });


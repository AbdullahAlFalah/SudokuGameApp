
import React, { useContext } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GameContext } from '../context/GameContext';

export default function DifficultySelector() {
  
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    throw new Error('DifficultySelector must be used within a GameContextProvider');
  }

  const { setDifficulty, setIsDifficultySet } = gameContext;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty</Text>
      <Pressable style={styles.buttonContainer} onPress={() => { setDifficulty('easy'); setIsDifficultySet(true); } }>
        <Text style={styles.buttonText}>Easy</Text>
      </Pressable>
      <Pressable style={styles.buttonContainer} onPress={() => { setDifficulty('medium'); setIsDifficultySet(true); } }>
        <Text style={styles.buttonText}>Medium</Text>
      </Pressable>
      <Pressable style={styles.buttonContainer} onPress={() => { setDifficulty('hard'); setIsDifficultySet(true);} }>
        <Text style={styles.buttonText}>Hard</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    buttonContainer: {
      marginBottom: 15,
      borderRadius: 5,
      backgroundColor: '#2e8b57',
      width: 200,
      height: 50,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 24,
      fontStyle: 'italic',
      fontWeight: 'medium',
      color: '#f0f8ff',
      textAlign: 'center',
      justifyContent: 'center',
    },
  });


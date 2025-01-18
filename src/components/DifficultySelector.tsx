import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Animated } from 'react-native';

import { GameContext } from '../context/GameContext';
import { playSound } from '../utils/SoundPlayer';
import SoundManager from '../utils/SoundManager';

export default function DifficultySelector() {
  
  const gameContext = useContext(GameContext);

  if (!gameContext) {
    throw new Error('DifficultySelector must be used within a GameContextProvider');
  }

  const { setDifficulty, setIsDifficultySet } = gameContext;

  const translateX = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Difficulty</Text>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Pressable style={styles.buttonContainer} 
          onPressIn={() => {
            const sound = SoundManager.getMainClick();
            if (sound) {
              playSound(sound);
            }
          }}
          onPress={() => { setDifficulty('easy'); setIsDifficultySet(true); } }
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Easy</Text>
        </Pressable>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Pressable style={styles.buttonContainer} 
          onPressIn={() => {
            const sound = SoundManager.getMainClick();
            if (sound) {
              playSound(sound);
            }
          }}
          onPress={() => { setDifficulty('medium'); setIsDifficultySet(true); } }
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Medium</Text>
        </Pressable>
      </Animated.View>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Pressable style={styles.buttonContainer} 
          onPressIn={() => {
            const sound = SoundManager.getMainClick();
            if (sound) {
              playSound(sound);
            }
          }}
          onPress={() => { setDifficulty('hard'); setIsDifficultySet(true);} }
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Hard</Text>
        </Pressable>
      </Animated.View>
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


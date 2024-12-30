import React from 'react';
import { View, Text, StyleSheet, NativeModules, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HomeScreenNavigationProp } from '../navigation/ScreenTypeProps';

const { ExitApp } = NativeModules; // For closing the app

export default function HomeScreen () {

    const navigation = useNavigation<HomeScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Sudoku</Text>
            <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('Game')}>
              <Text style={styles.buttonText}>Start Game</Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('Theme')}>
              <Text style={styles.buttonText}>Theme</Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={() => ExitApp.exit()}>
              <Text style={styles.buttonText}>Exit</Text>
            </Pressable>
        </View>
    );
};

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


import React from 'react';
import { Text, StyleSheet, Pressable, ImageBackground, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HomeScreenNavigationProp } from '../navigation/ScreenTypeProps';
import { useTheme } from '../context/ThemeContext';
import { getThemeStyles } from '../Theme/ThemeStyles';
import { playSound } from '../utils/SoundPlayer';
import SoundManager from '../utils/SoundManager';

const handleExit = () => {
  SoundManager.releaseAll(); // Release all sounds before exiting
  BackHandler.exitApp(); // For closing the app on Android only
}; 

export default function HomeScreen () {

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const {theme, background} = useTheme();
    const Themestyles = getThemeStyles(theme, background);

    return (
        <ImageBackground
          source= {Themestyles.backgroundImage}
          style={[styles.container, Themestyles.container]}
          resizeMode='cover' // Enable this to stretch the background image to fill the screen
          >
            <Text style={[styles.title, Themestyles.text]}>Welcome to Sudoku</Text>           
            <Pressable style={styles.buttonContainer} 
              onPressIn={() => {
                const sound = SoundManager.getMainClick();
                if (sound) {
                  playSound(sound);
                }
              }}
              onPress={() =>  navigation.navigate('Game')}
              android_disableSound={true} // Suppress default Android click sound
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
            >
              <Text style={styles.buttonText}>Start Game</Text>
            </Pressable>      
            <Pressable style={styles.buttonContainer} 
              onPressIn={() => {
                const sound = SoundManager.getMainClick();
                if (sound) {
                  playSound(sound);
                }
              }}
              onPress={() => navigation.navigate('Theme')}
              android_disableSound={true}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
            >
              <Text style={styles.buttonText}>Theme</Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} 
              onPressIn={() => {
                const sound = SoundManager.getMainClick();
                if (sound) {
                  playSound(sound);
                }
              }}
              onPress={() => navigation.navigate('Facts')}
              android_disableSound={true}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
            >
              <Text style={styles.buttonText}>Fact Of The Day</Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} 
              onPressIn={() => {
                const sound = SoundManager.getMainClick();
                if (sound) {
                  playSound(sound);
                }
              }}
              onPress={handleExit}
              android_disableSound={true}
              android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
            >
              <Text style={styles.buttonText}>Exit</Text>
            </Pressable>
        </ImageBackground>
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


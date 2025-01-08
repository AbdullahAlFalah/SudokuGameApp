import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

import { useTheme } from '../context/ThemeContext';
import { getThemeStyles } from '../Theme/ThemeStyles';
import { playSound } from '../utils/SoundPlayer';

// Preload sound effect
const mainclick = new Sound(require('../assets/Sounds/MainClick.wav'), Sound.MAIN_BUNDLE, (error) => {
  if (!error) {
    mainclick.setVolume(1); // Set the volume to maximum
  }
});

export default function ThemeToggle() {

  const { theme, background, toggleTheme, setBackground } = useTheme();
  const Themestyles = getThemeStyles(theme, background);

  // Clean up sounds when the component is unmounted
  useEffect(() => {
    return () => {
      mainclick.release();
    };
  }, []);

  return (
    <View>
        <Text style={[styles.text, Themestyles.text]}>Current Theme: {theme}</Text>
        <Pressable style={styles.button}
          onPressIn={() => playSound(mainclick)} 
          onPress={toggleTheme}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Toggle Theme</Text>
        </Pressable>
        <Text style={[styles.text, Themestyles.text]}>Current Background: {background}</Text>
        <Pressable style={styles.button} 
          onPressIn={() => playSound(mainclick)}
          onPress={() => setBackground('Default')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Default</Text>
        </Pressable>
        <Pressable style={styles.button} 
          onPressIn={() => playSound(mainclick)}
          onPress={() => setBackground('Light Wood')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Light Wood</Text>
        </Pressable>
        <Pressable style={styles.button} 
          onPressIn={() => playSound(mainclick)}
          onPress={() => setBackground('Dark Wood')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Dark Wood</Text>
        </Pressable>
        <Pressable style={styles.button} 
          onPressIn={() => playSound(mainclick)}
          onPress={() => setBackground('White Marble')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>White Marble</Text>
        </Pressable>
        <Pressable style={styles.button} 
          onPressIn={() => playSound(mainclick)}
          onPress={() => setBackground('Black Marble')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Black Marble</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#2e8b57',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#f0f8ff',
  },
});


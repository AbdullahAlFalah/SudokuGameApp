import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { useTheme } from '../context/ThemeContext';
import { getThemeStyles } from '../Theme/ThemeStyles';
import { playSound } from '../utils/SoundPlayer';
import SoundManager from '../utils/SoundManager';

export default function ThemeToggle() {

  const { theme, background, toggleTheme, setBackground } = useTheme();
  const Themestyles = getThemeStyles(theme, background);

  const isDarkTheme = theme === 'Dark';
  const isLightTheme = theme === 'Light';

  return (

    <View>
        <Text style={[styles.text, Themestyles.text]}>Current Theme: {theme}</Text>
        <Pressable style={styles.button}
          onPressIn={() => {
            const sound = SoundManager.getMainClick();
            if (sound) {
              playSound(sound);
            }
          }} 
          onPress={toggleTheme}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Toggle Theme</Text>
        </Pressable>
        <Text style={[styles.text, Themestyles.text]}>Current Background: {background}</Text>
        <Pressable style={[styles.button]} 
          onPressIn={() => {
            const sound = SoundManager.getMainClick();
            if (sound) {
              playSound(sound);
            }
          }}
          onPress={() => setBackground('Default')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          >
          <Text style={styles.buttonText}>Default</Text>
        </Pressable>
        <Pressable style={[styles.button, isDarkTheme && styles.disabledButton]} 
          onPressIn={() => {
            const sound = SoundManager.getMainClick();
            if (sound) {
              playSound(sound);
            }
          }}
          onPress={() => setBackground('Light Wood')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          disabled={isDarkTheme}
          >
          <Text style={styles.buttonText}>Light Wood</Text>
        </Pressable>
        <Pressable style={[styles.button, isLightTheme && styles.disabledButton]} 
          onPressIn={() => {
            const sound = SoundManager.getMainClick();
            if (sound) {
              playSound(sound);
            }
          }}
          onPress={() => setBackground('Dark Wood')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          disabled={isLightTheme}
          >
          <Text style={styles.buttonText}>Dark Wood</Text>
        </Pressable>
        <Pressable style={[styles.button, isDarkTheme && styles.disabledButton]} 
          onPressIn={() => {
            const sound = SoundManager.getMainClick();
            if (sound) {
              playSound(sound);
            }
          }}
          onPress={() => setBackground('White Marble')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          disabled={isDarkTheme}
          >
          <Text style={styles.buttonText}>White Marble</Text>
        </Pressable>
        <Pressable style={[styles.button, isLightTheme && styles.disabledButton]} 
          onPressIn={() => {
            const sound = SoundManager.getMainClick();
            if (sound) {
              playSound(sound);
            }
          }}
          onPress={() => setBackground('Black Marble')}
          android_disableSound={true}
          android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: false }}
          disabled={isLightTheme}
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
  disabledButton: {
    padding: 10,
    backgroundColor: '#808080',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#f0f8ff',
  },
});


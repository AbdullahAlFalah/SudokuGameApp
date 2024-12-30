import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, background, toggleTheme, setBackground } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Theme: {theme}</Text>
      <Pressable style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Toggle Theme</Text>
      </Pressable>
      <Text style={styles.text}>Current Background: {background}</Text>
      <Pressable style={styles.button} onPress={() => setBackground('Default')}>
        <Text style={styles.buttonText}>Default</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setBackground('Light Wood')}>
        <Text style={styles.buttonText}>Light Wood</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setBackground('Dark Wood')}>
        <Text style={styles.buttonText}>Dark Wood</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setBackground('White Marble')}>
        <Text style={styles.buttonText}>White Marble</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => setBackground('Black Marble')}>
        <Text style={styles.buttonText}>Black Marble</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});
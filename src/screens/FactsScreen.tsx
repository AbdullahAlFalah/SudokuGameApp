import React, { useEffect, useState } from "react";
import { ImageBackground, View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { FactsScreenNavigationProp } from "../navigation/ScreenTypeProps";

import { playSound } from '../utils/SoundPlayer';
import SoundManager from '../utils/SoundManager';

import { useTheme } from '../context/ThemeContext';
import { getThemeStyles } from '../Theme/ThemeStyles';

import useFetchFact from "../hooks/useFetchFact";

export default function FactsScreen () {

    const navigation = useNavigation<FactsScreenNavigationProp>();

    const {theme, background} = useTheme();
    const Themestyles = getThemeStyles(theme, background);

    const { fact, loading, error } = useFetchFact();

    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
      if (fact) {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
          setDisplayedText((prev) => {
            const nextChar = fact[currentIndex];
            currentIndex++;        
            if (currentIndex === fact.length) {
              clearInterval(intervalId);
            }
            return prev + nextChar;
          });
        }, 50); // Adjust typing speed here
        return () => clearInterval(intervalId);
      }
    }, [fact]);

    const combinedFactBoxStyle = StyleSheet.flatten([styles.factcontentBox, Themestyles.shadowColor]); // Combined styling for the fact box

    return (

        <ImageBackground
          source= {Themestyles.backgroundImage}
          style={[styles.container, Themestyles.container]}
          resizeMode='cover' // Enable this to stretch the background image to fill the screen
          >
            <View style={combinedFactBoxStyle}>
                {loading ? (
                    <ActivityIndicator size='large' color='#0000ff' />
                ) : error ? (
                    <Text style={[styles.factText, Themestyles.text]}>{error}</Text>
                ) : (
                    <Text style={[styles.factText, Themestyles.text]}>{displayedText}</Text>
                )
                }
            </View>
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
        </ImageBackground>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    factcontentBox: {
        padding: 20,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 100,
        borderRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 3,
    },
    factText: {
        fontSize: 20,
        fontWeight: 'normal',
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



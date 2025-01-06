import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable, Text, ImageBackground } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ConfettiCannon from 'react-native-confetti-cannon';

import Grid from '../components/SudokuFullGrid';
import useSudokuLogic from '../hooks/useSudokuLogic';
import { GameContext } from '../context/GameContext';
import DifficultySelector from '../components/DifficultySelector';
import { takeScreenshot } from '../utils/Screenshot';
import Timer from '../components/Timer';
import { useTheme } from '../context/ThemeContext';
import { getThemeStyles } from '../Theme/ThemeStyles';

export default function GameScreen() {
    
    const gameContext = useContext(GameContext);

    if (!gameContext) {
        throw new Error('GameScreen must be used within a GameContextProvider');
      }

    const { isDifficultySet } = gameContext;
    const { board, fixedCells, updateCell, resetGame, loading, validateBoard, confettiVisible } = useSudokuLogic();

    const {theme, background} = useTheme();
    const Themestyles = getThemeStyles(theme, background);

    return (

        <ImageBackground 
            source={Themestyles.backgroundImage}
            style={[styles.container, Themestyles.container]}
            resizeMode='cover'
            >

            {loading && (
                <View style={styles.loadingcontainer}>
                    {/* Show loading spinner while the board is being generated */}
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}

            {confettiVisible && (
                <ConfettiCannon
                    count={40}         // Reduce the particle count
                    origin={{ x: 0, y: 0 }} // Optimize the animation's origin
                    fadeOut={true}     // Enable fade-out for smoother visuals
                    autoStart={true}   // Ensure animation starts automatically
                    explosionSpeed={200}  // Adjust animation speed (default is 350)
                    fallSpeed={1000}   // Adjust how fast particles fall
                />
            )}

            {isDifficultySet ? (
                <View style={styles.container}>
                    <Timer />
                    <Pressable style={styles.resetButtoncontainer} onPress={resetGame}>
                        <SimpleLineIcons name="reload" size={24} color="#FFFFFF" />
                    </Pressable>
                    <Pressable style={styles.screenshotButtoncontainer} onPress={takeScreenshot}>
                        <SimpleLineIcons name="camera" size={24} color="#FFFFFF" />
                    </Pressable>
                    <Grid board={board} fixedCells={fixedCells} onCellChange={updateCell} />
                    <Pressable style={styles.validateButtonContainer} onPress={validateBoard}>
                        <Text style={styles.buttonText}>Validate</Text>
                    </Pressable>
                </View>
            ) : (
                <DifficultySelector />
            )}

        </ImageBackground>

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
    screenshotButtoncontainer: {
        position: 'absolute',
        top: 70,
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
    validateButtonContainer: {
        position: 'absolute',
        bottom: 20, // Adjust this value to control the distance from the bottom of the screen
        alignSelf: 'center', // Centers the button horizontally
        backgroundColor: '#2e8b57',
        padding: 10,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000',
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


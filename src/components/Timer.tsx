import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimerProps {
    elapsedTime: number; // Time in seconds
}

export default function Timer ({elapsedTime}: TimerProps) {

        // Format time as MM:SS
        const formatTime = (totalSeconds: number): string => {
            const minutes = Math.floor(totalSeconds / 60);
            const secs = totalSeconds % 60;
            return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        };

    return (
        <View style={styles.Timercontainer}>
            <Text style={styles.timerText}>{formatTime(elapsedTime)}</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    Timercontainer: {
        position: 'absolute',
        top: 10,
        backgroundColor: '#2e8b57', 
        padding: 10,
        borderRadius: 20, // Circular button
        elevation: 2, // Adds a shadow (Android)
        shadowColor: '#000', // For iOS shadow
        zIndex: 1, // Ensure the button appears on top
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#f0f8ff',
    },
});


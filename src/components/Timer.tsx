import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimerProps {
    onTimeUpdate?: (time: number) => void; // Optional callback to pass elapsed time
}

// Expose methods through the ref
export interface TimerRef {
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
}

const Timer = forwardRef<TimerRef, TimerProps>(({ onTimeUpdate }, ref) => {

    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Start or resume the timer
    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
    };

    // Pause the timer
    const pauseTimer = () => {
            if (isRunning) {
            setIsRunning(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    // Reset the timer
    const resetTimer = () => {
        pauseTimer(); // Ensure the timer stops
        setSeconds(0); // Reset the timer to 0
    };

    // Update elapsed time via callback (if provided)
    useEffect(() => {
        if (onTimeUpdate) {
            onTimeUpdate(seconds);
        }
    }, [seconds, onTimeUpdate]);

    // Cleanup on component unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    // Expose methods via the ref
    useImperativeHandle(ref, () => ({
        startTimer,
        pauseTimer,
        resetTimer,
    }));

    // Format time as MM:SS
    const formatTime = (totalSeconds: number): string => {
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <View style={styles.Timercontainer}>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
    );

});

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

export default Timer;


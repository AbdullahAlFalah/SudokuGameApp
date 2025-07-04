// src/utils/timer.ts

type TimerReturn = {
    start: () => void;
    pause: () => void;
    reset: () => void;
    getTime: () => number;
};

export default function createTimer(callback: (time: number) => void): TimerReturn {
    
    let intervalId: NodeJS.Timeout | null = null;
    let currentTime = 0;

    const start = () => {
        if (intervalId) return; // Prevent multiple intervals
        console.log('TIMER STARTED');
        intervalId = setInterval(() => {
            currentTime += 1;
            console.log('TIMER: TICK', currentTime);
            callback(currentTime);
        }, 1000); // Update every second
    };

    const pause = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            console.log('TIMER PAUSED');
        }
    };

    const reset = () => {
        pause();
        currentTime = 0;
        callback(currentTime); // Reset to 0
        console.log('TIMER RESET');
    };

    const getTime = () => currentTime;

    return { start, pause, reset, getTime };

}


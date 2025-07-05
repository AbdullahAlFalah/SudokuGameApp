import { useRef, useEffect, useState } from 'react';
import createTimer from '../utils/Timer';

export default function useTimer(startImmediately = false) { // this parameter is optional, defaults to false and can be used to control when the timer starts
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof createTimer> | null>(null);

  if (!timerRef.current) {
    timerRef.current = createTimer((time) => setElapsedTime(time));
    console.log('🕒 TIMER INSTANCE CREATED');
  }

  useEffect(() => {
    
    if (startImmediately) {
      timerRef.current?.start();
      console.log('▶️ Timer START (from useTimer)');
    }
    return () => {
      timerRef.current?.pause();
      console.log('⏸️ Timer PAUSED (on unmount)');
    };
  }, [startImmediately]);

  return {
    elapsedTime,
    start: () => timerRef.current?.start(),
    pause: () => timerRef.current?.pause(),
    reset: () => {
        timerRef.current?.reset(); // pause + clear + set to 0
        setElapsedTime(0); // just to force React state update immediately   
    },
    getTime: () => timerRef.current?.getTime() ?? 0,
  };
}



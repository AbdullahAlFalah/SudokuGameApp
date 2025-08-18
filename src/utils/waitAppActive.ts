import { AppState } from 'react-native';

async function waitForAppActiveOnce(): Promise<void> {
  return new Promise((resolve) => {
    if (AppState.currentState === 'active') { return resolve(); }
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        sub.remove();
        resolve();
      }
    });
  });
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms)); // Small delay of x milliseconds before re-check
}

export { waitForAppActiveOnce, sleep };

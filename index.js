/**
 * @format
 */

import {AppRegistry, AppState} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native';

const currentAppState = {
  state: AppState.currentState,
  setState(newState) {
    this.state = newState;
  },
};

// Handle app state changes
async function handleAppStateChange(nextAppState) {

  if (currentAppState.state === nextAppState) {
    return; // Prevent unnecessary state changes
  }
  currentAppState.setState(nextAppState);

  if (nextAppState === 'active') {
    console.log('App is in the foreground');
  } else if (nextAppState === 'background') {
    console.log('App is in the background');
  }

}

// Set the foreground event handler
notifee.onForegroundEvent(async ({ type, detail }) => {

  const { notification, pressAction } = detail;

  // Notification delivered while the app is on foreground
  if (type === EventType.DELIVERED) {
    console.log('Notification delivered in foreground to be cancelled:', notification);
    // Cancel the notification if the app is in the foreground
    await notifee.cancelTriggerNotification(notification.id);
  }

});

// Set the background event handler
notifee.onBackgroundEvent(async ({ type, detail }) => {

    const { notification, pressAction } = detail;

    // Check the type of event that was received
    if (type === EventType.ACTION_PRESS) {
      // Handle the action press:
      if (pressAction.id === 'open') {
        // Open the app
        console.log('Opening app from notification...');
      } else if (pressAction.id === 'dismiss') {
        await notifee.cancelDisplayedNotification(notification.id);
        console.log('Dismiss button pressed in background. Cancelling notification.');
      }
    }

    // Notification delivered while the app is on background
    if (type === EventType.DELIVERED) {
      console.log('Notification delivered in background to be kept:', notification);
      // Force display for devices that might suppress it
      await notifee.displayNotification(notification);
    }

});

// Listen for app state changes
AppState.addEventListener('change', handleAppStateChange);

AppRegistry.registerComponent(appName, () => {
    return App;
});


/**
 * @format
 */

import {AppRegistry, AppState} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import { scheduleNotification } from './src/services/NotifyService';

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

  if (nextAppState === 'background') {
    await scheduleNotification();
    console.log('App is in the background, scheduling background notifications!!!');
  } else if (nextAppState === 'active') {
    await notifee.cancelTriggerNotifications();
    await notifee.cancelDisplayedNotifications();
    console.log('App is in the foreground, canceling all background notifications!!!');
  }

}

// Set the foreground event handler
notifee.onForegroundEvent(async ({ type, detail }) => {

  const { notification, pressAction } = detail;

  

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

    // Notification Delivered
    if (type === EventType.DELIVERED) {
      console.log('Notification delivered in background:', notification);
      // Cancel the notification if the app is in the foreground
      if (currentAppState.state === 'active' || currentAppState.state !== 'background') {
        await notifee.cancelTriggerNotification(notification.id);
      }
    }

});

// Listen for app state changes
AppState.addEventListener('change', handleAppStateChange);

AppRegistry.registerComponent(appName, () => { 
    return App
});


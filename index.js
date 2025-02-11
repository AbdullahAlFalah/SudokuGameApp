/**
 * @format
 */

import {AppRegistry, AppState} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import { scheduleNotification } from './src/services/NotifyService';

// Handle app state changes
function handleAppStateChange(nextAppState) {

  if (nextAppState === 'background') {
    console.log('App is in the background, scheduling periodic notifications...');
    scheduleNotification(1); // Schedule 1 minute in the future
  }

}

// Set the background event handler
notifee.onBackgroundEvent(async ({ type, detail }) => {

    const { notification, pressAction } = detail;

    // Check the type of event that was received
    if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
      // Handle the action press
      console.log('Notification action pressed!!!');
      // Open the app
      await notifee.openNotification(notification.id);
      // Remove the notification
      await notifee.cancelDisplayedNotification(notification.id);
    }

    // Notification Delivered
    if (type === EventType.DELIVERED) {
      console.log('Notification delivered:', notification);
      scheduleNotification(1); // Schedule the next one
    }

    // Trigger Notification
    if (type === EventType.TRIGGER_NOTIFICATION_CREATED) {
      console.log('Re-triggering notification...');     
    }

});

// Listen for app state changes
AppState.addEventListener('change', handleAppStateChange);

AppRegistry.registerComponent(appName, () => { 
    return App
});


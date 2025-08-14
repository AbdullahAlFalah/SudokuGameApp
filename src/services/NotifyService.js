import notifee, { AndroidImportance, RepeatFrequency, TriggerType } from '@notifee/react-native';
import { ensureNotificationPermission } from '../utils/notificationsPermission';

export async function scheduleNotification() {

  try {

    // Ensure the proper permission is given (required for all devices)
    const granted = await ensureNotificationPermission();
    if (!granted) {
      console.log('Permission not granted, skipping notification schedule this time!');
      return;
    }

    // Ensure the channel is created (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Background Notification Channel',
      sound: 'notification_sound',
      vibration: true,
      bypassDnd: true,
      importance: AndroidImportance.DEFAULT,
    });

    // Set trigger time for the notification
    // const triggerTime = new Date( Date.now() + (3600 * 1000) ); // 1 hour from now
    const triggerTime = new Date( Date.now() + (10 * 1000) ); // 10 seconds for testing

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerTime.getTime(), // number timestamp
      repeatFrequency: RepeatFrequency.HOURLY, // Repeat once an hour
      alarmManager: {
        allowWhileIdle: true,
      },
    };

    const actions = [
      {
        // Button to open the app from notification
        title: 'Open',
        pressAction: {
          id: 'open',
          launchActivity: 'default', // Opens the app when tapped
        },
      },
      {
        // Button to dismiss notification
        title: 'Dismiss',
        pressAction: {
          id: 'dismiss',
        },
      },
    ];

    // Schedule the notification
    await notifee.createTriggerNotification(
      {
        title: 'Periodic Notification',
        body: `Hourly Reminder ${triggerTime.toLocaleTimeString(undefined, {hour12: true, hour: 'numeric', minute: 'numeric'})}.`,
        android: {
          channelId: 'default',
          smallIcon: 'ic_sudoku_32x32',
          color: '#9c27b0',
          largeIcon: 'ic_sudoku_64x64',
          circularLargeIcon: true,
          actions: actions,
          autoCancel: false,
          asForegroundService: false,
        },
      },
      trigger
    );

    console.log('Notification scheduled at:', triggerTime);

  } catch (error) {

    console.error('Failed to schedule notification:', error);

  }

}


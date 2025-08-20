import notifee, { AndroidImportance, AndroidVisibility, RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { ensureNotificationPermission } from '../utils/notificationsPermission';

export async function scheduleNotification() {

  try {

    // Cancel any existing notifications (optional for testing)
    await notifee.cancelAllNotifications();

    // Ensure the proper permission is given (required for all devices)
    const granted = await ensureNotificationPermission();
    if (!granted) {
      console.log('Permission not granted, skipping notification schedule this time!');
      return;
    }

    // Ensure the channel is created (required for Android)
    const channelId = await notifee.createChannel({
      id: 'hourly_notification_channel',
      name: 'background_notification_channel',
      sound: 'notification_sound',
      vibration: true,
      bypassDnd: true,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });

    // Set trigger time for the notification
    const triggerTime = new Date( Date.now() + (3600 * 1000) ); // 1 hour from now

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerTime.getTime(), // number timestamp
      repeatFrequency: RepeatFrequency.HOURLY, // repeat once an hour
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
          channelId,
          smallIcon: 'ic_notification',
          color: '#9c27b0',
          largeIcon: 'ic_sudukoicon',
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

export async function displayNotificationTest() {

  try {

    const channelId = await notifee.createChannel({
      id: 'debug_channel',
      name: 'Debug Notifications',
      importance: 4, // HIGH importance
    });

    await notifee.displayNotification({
      title: 'Debug',
      body: 'If you see this, the channel is fine',
      android: {
        channelId,
        smallIcon: 'ic_notification',
      },
    });

    const channel = await notifee.getChannel(channelId);

    if (!channel) {
      console.log(`Channel "${channelId}" does not exist`);
      return;
    }

    console.log('Channel info:', channel);

    if (channel.blocked) {
      console.log(`Channel "${channelId}" is BLOCKED at the system level.`);
    } else {
      console.log(`Channel "${channelId}" is enabled with importance = ${channel.importance}`);
    }

  } catch (error) {
    console.error('Failed to display testing notification:', error);
  }
}

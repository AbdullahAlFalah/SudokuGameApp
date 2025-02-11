import notifee, { TriggerType } from '@notifee/react-native';

export async function scheduleNotification( minutes = 1 ) {

  try {

    // Ensure the channel is created (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Background Notification Channel',
    });

    // Set trigger time for the notification
    const triggerDate = new Date(Date.now());
    triggerDate.setMinutes(triggerDate.getMinutes() + minutes);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerDate.getTime(),
    };

    // Schedule the notification
    await notifee.createTriggerNotification(
      {
        title: 'Periodic Notification',
        body: `Reminder ${triggerDate.toLocaleTimeString()}.`,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
            launchActivity: 'default',
          },
        },
      },
      trigger
    );

    console.log('Notification scheduled at:', triggerDate);

  } catch (error) {

    console.error('Failed to schedule notification:', error);

  }

}


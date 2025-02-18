
import notifee, { RepeatFrequency, TriggerType } from '@notifee/react-native';


export async function scheduleNotification( minutes = 1) {

  try {

    // Ensure the channel is created (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Background Notification Channel',
      sound: 'notification_sound',
      vibration: true,
      bypassDnd: true,      
    });

    // Set trigger time for the notification
    const triggerDate = new Date(Date.now());
    triggerDate.setMinutes(triggerDate.getMinutes() + minutes);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: triggerDate.getTime(),
      // repeatFrequency: RepeatFrequency.DAILY, // Repeat once a day but this needs additional changes with the code
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
                
    ]

    // Schedule the notification
    await notifee.createTriggerNotification(
      {
        title: 'Periodic Notification',
        body: `Daily Reminder ${triggerDate.toLocaleTimeString()}.`,
        android: {
          channelId: 'default',
          smallIcon: 'ic_sudoku_32x32',
          color: '#9c27b0',
          largeIcon: 'ic_sudoku_64x64', 
          circularLargeIcon: true,                         
          actions: actions,  
          autoCancel: false,                            
        },
      },
      trigger
    );

    console.log('Notification scheduled at:', triggerDate);

  } catch (error) {

    console.error('Failed to schedule notification:', error);

  }

}


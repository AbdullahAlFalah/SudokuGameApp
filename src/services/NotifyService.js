import * as Notifications from 'expo-notifications';

export const configureNotificationHandler = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: false, // Suppress notifications when the app is open
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

// Request permission for notifications
export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission for notifications not granted!');
    return false;
  } else {
    return true;
  }
};

// Schedule a notification
export const scheduleAppNotification = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync(); // Clear existing notifications
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Reminder",
      body: "Time to tease your mind with a puzzle!",
      sound: true,
    },
    trigger: {
      seconds: 60, // Repeat every 60 seconds
      repeats: true,
    },
  });
};


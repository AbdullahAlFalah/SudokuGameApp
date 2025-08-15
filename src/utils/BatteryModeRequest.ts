import { Alert, Platform } from 'react-native';
import notifee from '@notifee/react-native';

/**
 * Checks if battery optimization is enabled for the app.
 * If enabled, shows an alert prompting the user to open settings.
 * Returns true if no optimization or user confirmed, false otherwise.
 */
export default async function checkBackgroundRestrictions(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    // iOS doesn’t have battery optimization, skip
    return true;
  }

  try {
    const isBatteryOptimized = await notifee.isBatteryOptimizationEnabled();

    if (!isBatteryOptimized) {
      // No restriction, all good
      return true;
    }

    // Battery optimization is enabled, prompt user
    return new Promise((resolve) => {
      Alert.alert(
        'Battery Optimization Detected',
        'To ensure notifications work properly, please disable battery optimization for this app.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(false),
          },
          {
            text: 'Open Settings',
            onPress: async () => {
              await notifee.openBatteryOptimizationSettings();
              resolve(false); // Permission not yet granted, will check next app start
            },
          },
        ],
        { cancelable: false },
      );
    });
  } catch (err) {
    console.error('Error checking background restrictions:', err);
    return false;
  }
}

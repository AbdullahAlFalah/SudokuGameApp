import { Alert, Platform } from 'react-native';
import notifee from '@notifee/react-native';
import { waitForAppActiveOnce, sleep } from './waitAppActive';

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
    let isBatteryOptimized = await notifee.isBatteryOptimizationEnabled();
    if (!isBatteryOptimized) {
      // No restriction, all good
      return true;
    }

    // Battery optimization is enabled, prompt user
    await new Promise<void>((resolve) => {
      Alert.alert(
        'Battery Optimization Detected',
        'To ensure notifications work properly, please disable battery optimization for this app.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => resolve(), // Don't wait for app resume if they cancelled
          },
          {
            text: 'Open Settings',
            onPress: async () => {
              await notifee.openBatteryOptimizationSettings();
              await waitForAppActiveOnce(); // Only resolve after app comes back
              await sleep(1200); // Small buffer
              resolve(); // continue after user leaves app
            },
          },
        ],
        { cancelable: false },
      );
    });

    // Re-check battery optimization status
    isBatteryOptimized = await notifee.isBatteryOptimizationEnabled();
    return !isBatteryOptimized;

  } catch (err) {
    console.error('Error checking background restrictions:', err);
    return false;
  }
}

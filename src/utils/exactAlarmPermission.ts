import notifee, { AndroidNotificationSetting } from '@notifee/react-native';
import { Alert, Platform } from 'react-native';
import { waitForAppActiveOnce, sleep } from './waitAppActive';

/**
 * Checks if the app has the "Use Exact Alarm" permission (Android 13+)
 * If not, shows an alert prompting the user to open settings.
 * Returns true if permission is granted, false otherwise.
 */
export default async function ensureExactAlarmPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    // iOS doesn’t have exact alarms, skip
    return true;
  }
  try {
    let settings = await notifee.getNotificationSettings();
    if (settings.android?.alarm === AndroidNotificationSetting.ENABLED) {
      return true; // Permission already granted
    }

    // Permission not granted
    await new Promise<void>((resolve) => {
      Alert.alert(
        'Exact Alarm Permission Needed',
        'To ensure notifications are delivered on time, please allow exact alarms in settings.',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => resolve() }, // Don't wait for app resume if they cancelled
          { text: 'Open Settings', onPress: async () => {
              await notifee.openAlarmPermissionSettings();
              await waitForAppActiveOnce(); // Only resolve after app comes back
              await sleep(1200); // Small buffer
              resolve(); // Permission not yet granted, wait for next app start
          }},
        ],
        { cancelable: false }
      );
    });

    // Re-check permission
    settings = await notifee.getNotificationSettings();
    return settings.android?.alarm === AndroidNotificationSetting.ENABLED;

  } catch (err) {
    console.error('Error checking exact alarm permission:', err);
    return false;
  }
}

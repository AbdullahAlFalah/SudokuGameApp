import notifee, { AndroidNotificationSetting } from '@notifee/react-native';
import { Alert, Platform } from 'react-native';

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
    const settings = await notifee.getNotificationSettings();
    if (settings.android?.alarm !== AndroidNotificationSetting.ENABLED) {
      // Permission not granted
      return new Promise((resolve) => {
        Alert.alert(
          'Exact Alarm Permission Needed',
          'To ensure notifications are delivered on time, please allow exact alarms in settings.',
          [
            { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
            { text: 'Open Settings', onPress: async () => {
                await notifee.openAlarmPermissionSettings();
                resolve(false); // Permission not yet granted, wait for next app start
            } },
          ],
          { cancelable: false }
        );
      });
    }
    // Permission granted
    return true;
  } catch (err) {
    console.error('Error checking exact alarm permission:', err);
    return false;
  }
}

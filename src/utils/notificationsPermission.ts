import notifee from '@notifee/react-native';
import { Platform, PermissionsAndroid, Linking, Alert } from 'react-native';

const APP_PACKAGE = 'com.sudokugameapp';

// Helper to open app settings
async function openAppSettings() {
    console.log("Opening app's settings for user to grant notification permission...");
    if (Platform.OS === 'android') {
        try {
            // Direct intent to your app's settings page
            await Linking.openURL(`intent://settings/applications/package/${APP_PACKAGE}#Intent;scheme=package;end`);
        } catch {
            // Fallback: generic settings page
            await Linking.openSettings();
        }
    } else {
        await Linking.openSettings();
    }
}

export async function ensureNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {

    // Android 13+ (API 33+): runtime POST_NOTIFICATIONS permission is required
    const sdkVersion = Number(Platform.Version);

    if (sdkVersion >= 33) {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (!hasPermission) {
        const permissionStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        console.log('Notification permission result:', permissionStatus);
        if (permissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
            return true; // All good
        } else if (permissionStatus !== PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission not granted on Android; grant them via settings to receive notifications later!');
            return new Promise((resolve) => {
                Alert.alert(
                    'Android notification Permission Needed',
                    'To receive notifications, please enable notification permission in settings.',
                    [
                        {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => resolve(false),
                        },
                        {
                        text: 'Open Settings',
                        onPress: async () => {
                            await openAppSettings();
                            resolve(false);
                        },
                        },
                    ],
                    { cancelable: false }
                );
            });
        }
      }
    }
  } else {
    // iOS: Request authorization permission via Notifee
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus < 1) {
        console.log('iOS notification permission is not granted; grant them via settings to receive notifications later!');
        return new Promise((resolve) => {
            Alert.alert(
                'iOS notification Permission Needed',
                'To receive notifications, please enable notification permission in settings.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => resolve(false),
                    },
                    {
                        text: 'Open Settings',
                        onPress: async () => {
                            await openAppSettings(); // Force user to app settings, but can't wait for result
                            resolve(false); // permission NOT currently granted, don't schedule now, wait for next time
                        },
                    },
                ],
                { cancelable: false }
            );
        });
    }
  }
  return true;
}


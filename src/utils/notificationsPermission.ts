import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { Platform, Linking, Alert } from 'react-native';

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

/**
 * Ensures that notification permissions are granted.
 * Works for both Android and iOS.
 */
export async function ensureNotificationPermission(): Promise<boolean> {
    try {
        // Request permissions using Notifee on both platforms
        const settings = await notifee.requestPermission();
        if (
        (Platform.OS === 'ios' && settings.authorizationStatus < 1) ||
        (Platform.OS === 'android' && settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED)
        ) {
            // Permission not granted
            console.log('Notification permission not granted; user needs to enable it in settings.');

            return new Promise((resolve) => {
                Alert.alert(
                'Notification Permission Needed',
                'To receive notifications, please enable notification permission in settings.',
                [
                    { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
                    { text: 'Open Settings', onPress: async () => { await openAppSettings(); resolve(false); } },
                ],
                { cancelable: false }
                );
            });
        }
        // Permissions granted
        return true;
    } catch (err) {
        console.error('Error while requesting notification permissions:', err);
        return false;
    }
}


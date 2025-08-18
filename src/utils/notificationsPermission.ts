import notifee, { AuthorizationStatus } from '@notifee/react-native';
import { Platform, Linking, Alert } from 'react-native';
import { waitForAppActiveOnce, sleep } from './waitAppActive';

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
        let settings = await notifee.requestPermission();
        const isGranted =
            (Platform.OS === 'ios' && settings.authorizationStatus >= 1) ||
            (Platform.OS === 'android' && settings.authorizationStatus === AuthorizationStatus.AUTHORIZED);
        if (isGranted) { return true; } // Permission already granted

        // Permission not granted
        console.log('Notification permission not granted; user needs to enable it in settings.');
        await new Promise<void>((resolve) => {
            Alert.alert(
                'Notification Permission Needed',
                'To receive notifications, please enable notification permission in settings.',
                [
                    { text: 'Cancel', style: 'cancel', onPress: () => resolve() }, // Don't wait for app resume if they cancelled
                    { text: 'Open Settings', onPress: async () => {
                        await openAppSettings();
                        await waitForAppActiveOnce(); // Only resolve after app comes back
                        await sleep(1200); // Small buffer
                        resolve();
                    }},
                ],
                { cancelable: false }
            );
        });

        // Re-check permissions
        settings = await notifee.getNotificationSettings();
        const nowGranted =
            (Platform.OS === 'ios' && settings.authorizationStatus >= 1) ||
            (Platform.OS === 'android' && settings.authorizationStatus === AuthorizationStatus.AUTHORIZED);
        return nowGranted;

    } catch (err) {
        console.error('Error while requesting notification permissions:', err);
        return false;
    }
}


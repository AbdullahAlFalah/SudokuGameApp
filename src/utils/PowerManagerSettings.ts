import { Alert, Platform } from 'react-native';
import notifee from '@notifee/react-native';
import { waitForAppActiveOnce, sleep } from './waitAppActive';

export default async function checkPowerManagementRestrictions(): Promise<boolean> {
    if (Platform.OS !== 'android') {
        // iOS doesn’t have power management optimization, skip
        return true;
    }

    try {
        let powerManagerInfo = await notifee.getPowerManagerInfo();
        console.log('Power Manager Info:', powerManagerInfo);

        // If restriction exists, prompt user
        if (powerManagerInfo.activity) {
            await new Promise<void>((resolve) => {
                Alert.alert(
                    'Restrictions Detected',
                    'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => resolve(), // Don't wait for app resume if they cancelled
                        },
                        {
                            text: 'Open Power Settings',
                            onPress: async () => {
                                await notifee.openPowerManagerSettings();
                                await waitForAppActiveOnce(); // Only resolve after app comes back
                                await sleep(1200); // Small buffer
                                resolve(); // continue after user leaves app
                            },
                        },
                    ],
                    { cancelable: false },
                );
            });
        }

        // Re-check power management status
        powerManagerInfo = await notifee.getPowerManagerInfo();
        console.log('Rechecked Power Manager Info:', powerManagerInfo);

        // If still restricted, log warning — but return true to keep chain alive
        if (powerManagerInfo.activity) {
            console.warn('[SoftCheck] Power Management restrictions may still apply.');
            return true;
        }

        return true; // return true in all conditions

    } catch (err) {
        console.error('Error checking power management restrictions:', err);
        // Soft fail → keep chain alive
        return true;
    }
}

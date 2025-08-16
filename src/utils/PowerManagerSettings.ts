import { Alert, Platform } from 'react-native';
import notifee from '@notifee/react-native';

export default async function checkPowerManagementRestrictions(): Promise<boolean> {
    if (Platform.OS !== 'android') {
        // iOS doesn’t have power management optimization, skip
        return true;
    }

    try {
        const powerManagerInfo = await notifee.getPowerManagerInfo();

        if (powerManagerInfo.activity) {
            return new Promise((resolve) => {
                Alert.alert(
                    'Restrictions Detected',
                    'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => resolve(false),
                        },
                        {
                            text: 'Open Power Settings',
                            onPress: async () => {
                                await notifee.openPowerManagerSettings();
                                resolve(false); // Permission not yet granted, will check next app start
                            },
                        },
                    ],
                    { cancelable: false },
                );
            });
        }
        // No restrictions found
        return true;
    } catch (err) {
        console.error('Error checking power management restrictions:', err);
        return false;
    }
}

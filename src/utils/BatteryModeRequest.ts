import { Alert } from 'react-native';
import notifee from '@notifee/react-native';

// Notifee's helper function to check and request the necessary permissions
export default async function checkBackgroundRestrictions() {
  const isBatteryOptimized = await notifee.isBatteryOptimizationEnabled();
  if (isBatteryOptimized) {
    Alert.alert(
      'Battery Optimization Detected',
      'To ensure notifications work properly, please disable battery optimization for this app.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: async () => await notifee.openBatteryOptimizationSettings() },
      ],
      { cancelable: false }
    );
  }
}

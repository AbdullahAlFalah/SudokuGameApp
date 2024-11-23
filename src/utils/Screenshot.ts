import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

async function requestStoragePermission(): Promise<boolean> {

    if (Platform.OS === 'android') {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Storage Permission Required',
                    message: 'This app needs access to your storage to save screenshots.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.log('Permission error:', err);
            return false;
        }

    } else {
        // Request PHOTO_LIBRARY permission for iOS
        const permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
        const result = await request(permission);
    
        // Return true if permission is granted
        if (result === RESULTS.GRANTED) {
            return true;
        } else {
            console.log('Permission denied for iOS:', result);
            return false;
        }
    }

}

export async function takeScreenshot(): Promise<void> {

    const hasPermission = await requestStoragePermission();

    if (!hasPermission) {
        Alert.alert(
            'Permission Denied',
            'You need to grant storage permission to take a screenshot.'
        );
        return;
    }

    try {
        const uri = await captureScreen({
            format: 'jpg',
            quality: 0.8,
        });

        console.log('Screenshot URI:', uri);

        const fileName = `screenshot_${Date.now()}.jpg`;
        const destinationPath = `${RNFS.PicturesDirectoryPath}/${fileName}`;

        await RNFS.moveFile(uri, destinationPath);

        Alert.alert('Screenshot Saved', 'Your screenshot has been saved to the gallery!');
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        Alert.alert('Error', 'Failed to take a screenshot. Please try again.');
    }

}


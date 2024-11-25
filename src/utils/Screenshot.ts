import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';

function showPermissionAlert() {
    Alert.alert(
        'Permission Required',
        'Android Storage permission is required to take screenshots. Please enable it in the app settings.',
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]
    );
}

async function requestStoragePermission(): Promise<boolean> {

    if (Platform.OS === 'android') {

        try {

            if (Platform.Version <= 29) {

                // For Android 10 and below (Scoped Storage)
                const PermissionStatusNewAndroid = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
                console.log('Scoped Storage Permission:', PermissionStatusNewAndroid);

                if ( PermissionStatusNewAndroid === RESULTS.GRANTED ) {
                    console.log('New Android permission granted!!!');
                    return true;
                } else {
                    showPermissionAlert();
                    return false;
                }

            }

            return  true;
            
        } catch (err) {
            console.log('Permission request error:', err);
            return false;
        }
    
    } else {
        // Request PHOTO_LIBRARY permission for iOS
        const iosLibrary = PERMISSIONS.IOS.PHOTO_LIBRARY;
        const iosPermission = await request(iosLibrary);
        console.log('iOS Permission:', iosPermission);
        
        // Return true if permission is granted
        if (iosPermission === RESULTS.GRANTED) {
            console.log('iOS Permission accepted!!!');
            return true;
        } else {
            console.log('iOS Permission denied!!!');
            return false;
        }
    }

}

export async function takeScreenshot(): Promise<void> {

    // const hasPermission = await requestStoragePermission();

    // if (!hasPermission) {
    //     Alert.alert(
    //         'Permission Denied',
    //         'You need to grant storage permission to take a screenshot.'
    //     );
    //     return;
    // }

    try {
        // Capture the screenshot
        const uri = await captureScreen({
            format: 'jpg',
            quality: 0.8,
        });

        console.log('Screenshot URI:', uri);

        // Create the file name
        const fileName = `screenshot_${Date.now()}.jpg`;

        if (Platform.OS === 'android') {

            // Save using MediaStore for Android 10+
            const filePath = `${RNFS.PicturesDirectoryPath}/${fileName}`;
            console.log('File path: ', filePath);
            await RNFS.copyFile(uri, filePath);

            Alert.alert('Screenshot Saved', 'Your screenshot has been saved to the gallery!');
            console.log('Screenshot saved at:', filePath);

        } else if (Platform.OS === 'ios') {

            try {

                const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
                await RNFS.copyFile(uri, filePath);
               
                Alert.alert('Screenshot Saved', `Your screenshot has been saved to: ${filePath}`);
            } catch (error) {
                console.error('Failed to save screenshot on iOS:', error);
                Alert.alert('Error', 'Failed to save screenshot on iOS. Please try again.');

            }

        }

    } catch (error) {
        console.error('Error capturing screenshot:', error);
        Alert.alert('Error', 'Failed to take a screenshot. Please try again.');
    }

}


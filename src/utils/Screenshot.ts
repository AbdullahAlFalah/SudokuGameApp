import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { request, PERMISSIONS, RESULTS, PermissionStatus } from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';

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

            if (Platform.Version >= 29) {
                // For Android 10+ (Scoped Storage)
                const PermissionStatusNewAndroid = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                console.log('Scoped Storage Permission:', PermissionStatusNewAndroid);

                if ( PermissionStatusNewAndroid === RESULTS.GRANTED ) {
                    console.log('New Android permission granted!!!');
                    return true;
                } else {
                    showPermissionAlert();
                    return false;
                }

            } else {
                // For Android 9 and below               
                const PermissionStatusOldAndroid = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'This app needs access to your storage to save screenshots.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                console.log('Legacy Android Storage Permission:', PermissionStatusOldAndroid);
                
                if ( PermissionStatusOldAndroid === PermissionsAndroid.RESULTS.GRANTED ) {
                    console.log('Old Android permission granted!!!');
                    return true;
                } else {
                    showPermissionAlert();
                    return false;
                }
                
            }
            
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

    const hasPermission = await requestStoragePermission();

    if (!hasPermission) {
        Alert.alert(
            'Permission Denied',
            'You need to grant storage permission to take a screenshot.'
        );
        return;
    }

    try {
        // Capture the screenshot
        const uri = await captureScreen({
            format: 'jpg',
            quality: 0.8,
        });

        console.log('Screenshot URI:', uri);

        // Get the file data
        const fileData = await RNFetchBlob.fs.readFile(uri, 'base64');
        // Create the file name
        const fileName = `screenshot_${Date.now()}.jpg`;

        if (Platform.OS === 'android') {
            // Save using MediaStore for Android 10+
            const imageDetails = {
                title: fileName,
                description: 'Screenshot captured by the Sudoku app',
                mimeType: 'image/jpeg',
                base64Data: fileData,
            };

            const success = await saveImageToMediaStore(imageDetails);

            if (success) {
                Alert.alert('Android Screenshot Saved', 'Your screenshot has been saved to the gallery!');
            } else {
                Alert.alert('Failed to save screenshot to MediaStore');
            }

        } else if (Platform.OS === 'ios') {

            try {
                const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;
                await RNFetchBlob.fs.writeFile(
                    filePath,
                    fileData,
                    'base64'
                );
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

async function saveImageToMediaStore( { title, description, mimeType, base64Data }: any ): Promise<boolean> {

    try {

        const { dirs } = RNFetchBlob.fs;
        const filePath = `${dirs.PictureDir}/${title}`;
        await RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64');
        return true;
    } catch (error) {
        console.error('Error saving to MediaStore:', error);
        return false;
    }

}


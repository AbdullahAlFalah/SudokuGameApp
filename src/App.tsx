import React, { useEffect } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameContextProvider from './context/GameContext';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ThemeScreen from './screens/ThemeScreen';
import FactsScreen from './screens/FactsScreen';
import { RootStackParamList } from './navigation/ScreenTypeProps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { getThemeStyles } from './Theme/ThemeStyles';
import { BackHandler } from 'react-native';
import SoundManager from './utils/SoundManager';
import KeepAwake from 'react-native-keep-awake';
import notifee from '@notifee/react-native';
import { scheduleNotification } from './services/NotifyService';
import ensureExactAlarmPermission from './utils/exactAlarmPermission';
import checkBackgroundRestrictions from './utils/BatteryModeRequest';

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {

  const { theme, background } = useTheme();
  const Themestyles = getThemeStyles(theme, background);

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: Themestyles.header.backgroundColor,
          },
          headerTintColor: Themestyles.header.color,
          headerTitleStyle: {
            color: Themestyles.header.color,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Theme" component={ThemeScreen} />
        <Stack.Screen name="Facts" component={FactsScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );

}

export default function App() {

  const navigationRef = useNavigationContainerRef();

  useEffect(() => {

    SoundManager.preloadSounds(); // Preload sounds when the app initializes

    const handleBackPress = () => {
      if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      } else if (navigationRef.isReady() && !navigationRef.canGoBack()) {
        SoundManager.releaseAll(); // Release all sounds before exiting;
        return false; // Allow default back behavior (exit app)
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      SoundManager.releaseAll();
    };

  }, [navigationRef]);

  // Add this useEffect for scheduling notification after 2 seconds delay
  useEffect(() => {
    const timer = setTimeout(async () => {
      await notifee.cancelDisplayedNotifications(); // Cancel any already displayed notifications
      const exactAlarmGranted = await ensureExactAlarmPermission(); // First, ensure exact alarm permission
      if (!exactAlarmGranted) return; // Stop scheduling if this permission is denied
      await checkBackgroundRestrictions();// Then check for background restrictions (battery optimizations)
      await scheduleNotification()
        .then(() => console.log('Notification scheduled on app start'))
        .catch(err => console.error('Failed to schedule notification on app start:', err));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

    return (

      <GestureHandlerRootView>
        <ThemeProvider>
          <GameContextProvider>
            <KeepAwake />
            <AppNavigator />
          </GameContextProvider>
        </ThemeProvider>
      </GestureHandlerRootView>

    );

}


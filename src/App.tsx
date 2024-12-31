import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameContextProvider from './context/GameContext';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import ThemeScreen from './screens/ThemeScreen';
import { RootStackParamList } from './navigation/ScreenTypeProps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { getThemeStyles } from './Theme/ThemeStyles';

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
      </Stack.Navigator>
    </NavigationContainer>

  );

}

export default function App() {

    return (

      <GestureHandlerRootView>
        <GameContextProvider>
          <ThemeProvider>
            <AppNavigator />
          </ThemeProvider>  
        </GameContextProvider>
      </GestureHandlerRootView>

      );

};


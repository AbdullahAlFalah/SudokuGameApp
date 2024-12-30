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

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
      <GestureHandlerRootView>
        <GameContextProvider>
          <ThemeProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
                <Stack.Screen name="Theme" component={ThemeScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>  
        </GameContextProvider>
      </GestureHandlerRootView>
      );
};


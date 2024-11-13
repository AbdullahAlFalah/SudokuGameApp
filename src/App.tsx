import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameContextProvider from './context/GameContext';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import { RootStackParamList } from './navigation/ScreenTypeProps';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
      <GestureHandlerRootView>
        <GameContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Game" component={GameScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </GameContextProvider>
      </GestureHandlerRootView>
      );
};


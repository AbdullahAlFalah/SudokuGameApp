
import { NavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    Game: undefined; 
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;


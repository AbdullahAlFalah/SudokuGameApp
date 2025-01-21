import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    Game: undefined; 
    Theme: undefined;
    Facts: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;
export type ThemeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Theme'>;
export type FactsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Facts'>;


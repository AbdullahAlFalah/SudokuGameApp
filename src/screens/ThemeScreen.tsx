
import { ImageBackground, StyleSheet } from 'react-native';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { getThemeStyles } from '../Theme/ThemeStyles';

export default function ThemeScreen () {

    const {theme, background} = useTheme();
    const Themestyles = getThemeStyles(theme, background);

    return (

        <ImageBackground
            source= {Themestyles.backgroundImage}
            style={[styles.container, Themestyles.container]}
            resizeMode='cover' 
        >
            <ThemeToggle />
        </ImageBackground>
        
    );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


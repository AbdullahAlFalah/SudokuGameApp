
export const getThemeStyles = ( theme: 'Light' | 'Dark', background: 'Default' | 'Light Wood' | 'Dark Wood' | 'White Marble' | 'Black Marble' ) => {

    const baseColors = {
      Light: {
        text: '#000000',
        background: '#f0f8ff',
      },
      Dark: {
        text: '#f0f8ff',
        background: '#000000',
      },
    };
  
    const backgroundPatterns = {
      'Default': null,
      'Light Wood': require('../assets/Backgrounds/LightWood.png'),
      'Dark Wood': require('../assets/Backgrounds/DarkWood.png'),
      'White Marble': require('../assets/Backgrounds/WhiteMarble.jpg'),
      'Black Marble': require('../assets/Backgrounds/BlackMarble.png'),
    };

    const headerColors = {
      Light: {
        text: '#f0f8ff', // White for both themes
        background: '#2e8b57', // Sea Green for Light theme
      },
      Dark: {
        text: '#f0f8ff', // White for both themes
        background: '#000000', // Black for Dark theme
      }, 
    };

    const boarderColors = {
      Light: {
        borderColor: '#000000'
      },
      Dark: {
        borderColor: '#f0f8ff'
      },
    };

    const shadowColors = {
      Light: {
        shadowColor: '#000000',
      },
      Dark: {
        shadowColor: '#f0f8ff',
      },
    }
  
    return {

      header: {
        backgroundColor: headerColors[theme].background,
        color: headerColors[theme].text, 
      },
      container: {
        backgroundColor: background === 'Default' ? baseColors[theme].background : 'transparent',
      },
      backgroundImage: backgroundPatterns[background], // Pass this separately for use in ImageBackground
      text: {
        color: baseColors[theme].text,
      },
      boarderColor: {
        borderColor: boarderColors[theme].borderColor,
      },
      shadowColor: {
        shadowColor: shadowColors[theme].shadowColor,
      },

    };

};
  
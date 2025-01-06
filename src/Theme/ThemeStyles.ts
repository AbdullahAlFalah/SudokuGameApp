
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
      'Default': null ,
      'Light Wood': require('../assets/LightWood.png'),
      'Dark Wood': require('../assets/DarkWood.png'),
      'White Marble': require('../assets/WhiteMarble.png'),
      'Black Marble': require('../assets/BlackMarble.png'),
    };

    const headerColors = {
      Light: {
        text: '#f0f8ff',
        background: '#2e8b57', // Sea Green for Light theme
      },
      Dark: {
        text: '#000000',
        background: '#696969', // Dim grey for Dark theme
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
    };

};
  

export const getThemeStyles = ( theme: 'light' | 'dark', background: 'default' | 'LightWood' | 'DarkWood' | 'WhiteMarble' | 'BlackMarble' ) => {

    const baseColors = {
      light: {
        text: '#000',
        background: '#fff',
      },
      dark: {
        text: '#fff',
        background: '#000',
      },
    };
  
    const backgroundPatterns = {
      default: { backgroundImage: null },
      LightWood: { backgroundImage: require('../assets/LightWood.png') },
      DarkWood: { backgroundImage: require('../assets/DarkWood.png') },
      WhiteMarble: { backgroundImage: require('../assets/WhiteMarble.png') },
      BlackMarble: { backgroundImage: require('../assets/BlackMarble.png') },
    };
  
    return {

      container: {
        flex: 1,
        backgroundColor: baseColors[theme].background,
        ...(backgroundPatterns[background].backgroundImage
          ? { backgroundImage: `url(${backgroundPatterns[background].backgroundImage})` }
          : {}),
      },
      text: {
        color: baseColors[theme].text,
      },
      
    };

};
  
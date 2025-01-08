import Sound from 'react-native-sound';

const playSound = (sound: Sound) => {
    sound.stop(() => {
        sound.play((success) => {
            if (!success) {
                console.log('Sound did not play');
            }
        });
    });
};

export { playSound };


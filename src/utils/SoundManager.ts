import Sound from 'react-native-sound';

Sound.setCategory('Playback');

class SoundManager {
  private static mainClick: Sound | null = null;
  private static reloadClick: Sound | null = null;
  private static cameraClick: Sound | null = null;
  private static validSolutionClick: Sound | null = null;
  private static invalidSolutionClick: Sound | null = null;

  static preloadSounds() {
    this.mainClick = new Sound(
      require('../assets/Sounds/MainClick.wav'),
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.error('Failed to load main click sound:', error);
        } else {
          this.mainClick?.setVolume(1); // Set the volume to maximum
        }
      }
    );

    this.reloadClick = new Sound(
      require('../assets/Sounds/ReloadClick.wav'),
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.error('Failed to load reload click sound:', error);
        } else {
          this.reloadClick?.setVolume(1); // Set the volume to maximum
        }
      }
    );

    this.cameraClick = new Sound(
      require('../assets/Sounds/CameraClick.wav'),
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.error('Failed to load camera click sound:', error);
        } else {
          this.cameraClick?.setVolume(1); // Set the volume to maximum
        }
      }
    );

    this.validSolutionClick = new Sound(
      require('../assets/Sounds/ValidSolutionClick.wav'),
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.error('Failed to load valid solution click sound:', error);
        } else {
          this.validSolutionClick?.setVolume(1); // Set the volume to maximum
        }
      }
    );

    this.invalidSolutionClick = new Sound(
      require('../assets/Sounds/InvalidSolutionClick.wav'),
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.error('Failed to load invalid solution click sound:', error);
        } else {
          this.invalidSolutionClick?.setVolume(1); // Set the volume to maximum
        }
      }
    );
  }

  static releaseAll() {
    this.mainClick?.release();
    this.reloadClick?.release();
    this.cameraClick?.release();
    this.validSolutionClick?.release();
    this.invalidSolutionClick?.release();
  }

  static getMainClick(): Sound | null {
    return this.mainClick;
  }

  static getReloadClick(): Sound | null {
    return this.reloadClick;
  }

  static getCameraClick(): Sound | null {
    return this.cameraClick;
  }

  static getValidSolutionClick(): Sound | null {
    return this.validSolutionClick;
  }

  static getInvalidSolutionClick(): Sound | null {
    return this.invalidSolutionClick;
  }
}

export default SoundManager;


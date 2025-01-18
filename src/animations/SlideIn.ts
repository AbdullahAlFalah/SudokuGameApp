import { Animated } from 'react-native';

class SlideInAnimation {
  private animatedValue: Animated.Value;

  constructor(initialValue: number) {
    this.animatedValue = new Animated.Value(initialValue);
  }

  getAnimation() {
    return this.animatedValue;
  }

  startAnimation(toValue: number, duration: number, delay: number) {
    Animated.timing(this.animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }
}

export default SlideInAnimation;


import HapticFeedback from 'react-native-haptic-feedback';

export function makeSound() {
    const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: true,
    };
    HapticFeedback.trigger('impactHeavy', options);
}

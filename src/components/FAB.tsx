import { Plus } from 'lucide-react-native';
import { Pressable, Animated } from 'react-native';
import { useRef } from 'react';

import AppGradient from './AppGradient';

type Props = { onPress(): void };

export default function FAB({ onPress }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  function onPressIn() {
    Animated.spring(scale, {
      toValue: 0.88,
      speed: 50,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  }

  function onPressOut() {
    Animated.spring(scale, {
      toValue: 1,
      speed: 30,
      bounciness: 8,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View
      style={{ transform: [{ scale }] }}
      className="absolute bottom-4 right-6 z-10"
    >
      <Pressable
        android_disableSound
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        className="rounded-[20px] overflow-hidden shadow shadow-accent-purple elevation-md"
      >
        <AppGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-4"
        >
          <Plus size={26} color="#ffffff" strokeWidth={2.5} />
        </AppGradient>
      </Pressable>
    </Animated.View>
  );
}

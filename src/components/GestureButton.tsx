import { type PressableProps, Animated, Pressable } from 'react-native';
import { TapHandler } from '@/utils/tapHandler';
import { useRef } from 'react';

type Props = PressableProps & {
  onSingleTap?: () => void;
  onDoubleTap?: () => void;
  onHold?: () => void;
};

export default function GestureButton({
  onSingleTap,
  onDoubleTap,
  onHold,
  children,
  ...props
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  function onPressIn() {
    Animated.spring(scale, {
      toValue: 0.985,
      speed: 40,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  }

  function onPressOut() {
    Animated.spring(scale, {
      toValue: 1,
      speed: 35,
      bounciness: 6,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        android_disableSound
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={() => TapHandler.handlePress({ onSingleTap, onDoubleTap })}
        onLongPress={onHold}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

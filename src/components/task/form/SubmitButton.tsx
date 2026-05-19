import { Check, Plus } from 'lucide-react-native';
import { Text, Pressable, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

import AppGradient from '@/components/AppGradient';

type Props = {
  isValid: boolean;
  isCreating: boolean;
  handleSubmit(): Promise<void>;
};

export default function SubmitButton({
  isValid,
  isCreating,
  handleSubmit,
}: Props) {
  const Icon = isCreating ? Plus : Check;

  const isValidRef = useRef(isValid);
  const scale = useRef(new Animated.Value(isValid ? 1 : 0.96)).current;
  const opacity = useRef(new Animated.Value(isValid ? 1 : 0.5)).current;

  useEffect(() => {
    isValidRef.current = isValid;
  }, [isValid]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: isValid ? 1 : 0.5,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: isValid ? 1 : 0.96,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isValid, opacity, scale]);

  function onPressIn() {
    scale.stopAnimation();
    Animated.timing(scale, {
      toValue: isValidRef.current ? 0.96 : 0.92,
      duration: 60,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  function onPressOut() {
    scale.stopAnimation();
    Animated.spring(scale, {
      toValue: isValidRef.current ? 1 : 0.96,
      tension: 100,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ scale }],
      }}
      className="rounded-2xl overflow-hidden mt-2"
    >
      <Pressable
        onPress={handleSubmit}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={!isValid}
      >
        <AppGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-row items-center justify-center gap-2 py-4"
        >
          <Icon size={18} color="#fff" strokeWidth={2.5} />

          <Text className="text-white font-bold text-base font-primary">
            {isCreating ? 'Add Task' : 'Save Changes'}
          </Text>
        </AppGradient>
      </Pressable>
    </Animated.View>
  );
}

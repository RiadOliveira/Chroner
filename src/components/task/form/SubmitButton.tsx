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

  const buttonScale = useRef(new Animated.Value(isValid ? 1 : 0.96)).current;
  const buttonOpacity = useRef(new Animated.Value(isValid ? 1 : 0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(buttonOpacity, {
        toValue: isValid ? 1 : 0.5,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: isValid ? 1 : 0.96,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [buttonOpacity, buttonScale, isValid]);

  return (
    <Animated.View
      style={{
        opacity: buttonOpacity,
        transform: [{ scale: buttonScale }],
      }}
      className="rounded-2xl overflow-hidden mt-2"
    >
      <Pressable
        onPress={handleSubmit}
        disabled={!isValid}
        className="active:opacity-90"
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

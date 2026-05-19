import { COLOR, HEX_COLOR } from '@/types/Color';
import {
  type TextInputProps,
  type BlurEvent,
  type FocusEvent,
  TextInput,
  Animated,
} from 'react-native';
import { cn } from '@/utils/mergeStyles';
import { useRef } from 'react';

export default function Input({
  className,
  onFocus,
  onBlur,
  ...props
}: TextInputProps) {
  const focus = useRef(new Animated.Value(0)).current;

  const borderColor = focus.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e2e8f0', HEX_COLOR[COLOR.PURPLE]],
  });
  const shadowOpacity = focus.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.12],
  });

  function handleFocus(event: FocusEvent) {
    Animated.timing(focus, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();

    if (onFocus) onFocus(event);
  }

  function handleBlur(event: BlurEvent) {
    Animated.timing(focus, {
      toValue: 0,
      duration: 180,
      useNativeDriver: false,
    }).start();

    if (onBlur) onBlur(event);
  }

  return (
    <Animated.View
      style={{ borderColor, shadowOpacity }}
      className={cn('bg-white border rounded-2xl shadow-sm', className)}
    >
      <TextInput
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        returnKeyType="done"
        placeholderTextColor="#94a3b8"
        className="text-slate-800 text-base font-secondary font-medium p-4"
        selectionColor={HEX_COLOR[COLOR.PURPLE]}
      />
    </Animated.View>
  );
}

import type { CycleOption } from '@/types/CycleOption';

import { Animated, Pressable, Text } from 'react-native';
import { useRef } from 'react';

type Props<V extends string> = {
  selectedValue: V;
  options: CycleOption<V>[];
  onSelect(value: V): void;
};

export default function CycleField<V extends string>({
  selectedValue,
  options,
  onSelect,
}: Props<V>) {
  const selectedIndex = options.findIndex(
    ({ value }) => value === selectedValue,
  );
  const { label, icon: Icon } = options[selectedIndex];

  const scale = useRef(new Animated.Value(1)).current;

  function onPressIn() {
    Animated.spring(scale, {
      toValue: 0.97,
      speed: 50,
      useNativeDriver: true,
    }).start();
  }

  function onPressOut() {
    Animated.spring(scale, {
      toValue: 1,
      speed: 40,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  }

  function onPress() {
    const { length } = options;
    const updatedIndex = selectedIndex === length - 1 ? 0 : selectedIndex + 1;

    onSelect(options[updatedIndex].value);
  }

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      className="w-full"
    >
      <Animated.View
        style={{ transform: [{ scale: scale }] }}
        className="bg-white justify-center border border-slate-200 rounded-2xl p-3 shadow-sm flex-row items-center gap-1.5"
      >
        {Icon && <Icon size={14} color="#1e293b" />}

        <Text
          numberOfLines={1}
          className="text-center text-sm font-medium font-secondary text-slate-800"
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

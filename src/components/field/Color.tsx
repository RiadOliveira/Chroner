import type { ColorValue } from '@/types/Color';
import type { PickerProps, PickerItemProps } from '@/types/PickerProps';

import { COLOR, HEX_COLOR } from '@/types/Color';
import { Check } from 'lucide-react-native';
import { View, Pressable, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

const COLOR_ROWS: ColorValue[][] = [
  [COLOR.BLUE, COLOR.INDIGO, COLOR.PURPLE, COLOR.PINK, COLOR.ROSE, COLOR.RED],
  [
    COLOR.ORANGE,
    COLOR.AMBER,
    COLOR.YELLOW,
    COLOR.GREEN,
    COLOR.EMERALD,
    COLOR.TEAL,
  ],
] as const;

export default function ColorPicker({
  value,
  onChange,
}: PickerProps<ColorValue>) {
  return (
    <View className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 gap-3">
      {COLOR_ROWS.map((row, rowIndex) => (
        <View
          key={`color-row-${rowIndex}`}
          className="flex-row justify-between"
        >
          {row.map((colorValue) => (
            <ColorCircle
              key={`color-${colorValue}`}
              data={colorValue}
              selected={value === colorValue}
              onSelect={() => onChange(colorValue)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function ColorCircle({
  data,
  selected,
  onSelect,
}: PickerItemProps<ColorValue>) {
  const backgroundColor = HEX_COLOR[data];

  const scale = useRef(new Animated.Value(selected ? 1.1 : 1)).current;
  const opacity = useRef(new Animated.Value(selected ? 1 : 0)).current;
  const checkScale = useRef(new Animated.Value(selected ? 1 : 0)).current;

  const selectedRef = useRef(selected);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  const borderColor = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', backgroundColor],
  });

  useEffect(() => {
    scale.stopAnimation();
    opacity.stopAnimation();
    checkScale.stopAnimation();

    Animated.spring(scale, {
      toValue: selected ? 1.1 : 1,
      tension: 120,
      friction: 8,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: selected ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    Animated.spring(checkScale, {
      toValue: selected ? 1 : 0,
      tension: 140,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [checkScale, opacity, scale, selected]);

  function onPressIn() {
    scale.stopAnimation();
    Animated.spring(scale, {
      toValue: 0.9,
      speed: 70,
      useNativeDriver: true,
    }).start();
  }

  function onPressOut() {
    scale.stopAnimation();
    Animated.spring(scale, {
      toValue: selectedRef.current ? 1.1 : 1,
      tension: 90,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Pressable
      hitSlop={6}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onSelect}
      className="items-center justify-center"
    >
      <Animated.View
        style={{
          borderColor,
          transform: [{ scale }],
        }}
        className="rounded-full p-0.5 border-2"
      >
        <View
          style={{ backgroundColor }}
          className="size-9 rounded-full items-center justify-center"
        >
          <Animated.View
            style={{
              opacity,
              transform: [{ scale: checkScale }],
            }}
          >
            <Check size={16} color="#fff" strokeWidth={3.5} />
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

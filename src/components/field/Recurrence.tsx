import type { RecurrenceValue } from '@/types/Recurrence';
import type { PickerProps, PickerItemProps } from '@/types/PickerProps';

import { COLOR, HEX_COLOR } from '@/types/Color';
import { RECURRENCE, RECURRENCE_LABEL } from '@/types/Recurrence';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { useEffect, useRef } from 'react';
import { cn } from '@/utils/mergeStyles';

type RecurrenceOption = {
  value: RecurrenceValue;
  activeColor: string;
};

const OPTIONS: RecurrenceOption[] = [
  { value: RECURRENCE.DAILY, activeColor: HEX_COLOR[COLOR.BLUE] },
  { value: RECURRENCE.WEEKLY, activeColor: HEX_COLOR[COLOR.PURPLE] },
  { value: RECURRENCE.MONTHLY, activeColor: '#CC50F6' },
  { value: RECURRENCE.YEARLY, activeColor: HEX_COLOR[COLOR.PINK] },
] as const;

export default function RecurrencePicker({
  value,
  disabled,
  onChange,
}: PickerProps<RecurrenceValue>) {
  const containerOpacity = useRef(
    new Animated.Value(disabled ? 0.6 : 1),
  ).current;

  useEffect(() => {
    Animated.timing(containerOpacity, {
      toValue: disabled ? 0.6 : 1,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [containerOpacity, disabled]);

  return (
    <Animated.View
      style={{ opacity: containerOpacity }}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4, flexGrow: 1 }}
      >
        {OPTIONS.map((option) => {
          const selected = value === option.value;
          const selectValue = selected ? RECURRENCE.NONE : option.value;

          return (
            <Item
              key={option.value}
              data={option}
              selected={selected}
              disabled={disabled}
              onSelect={() => onChange(selectValue)}
            />
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

function Item({
  data: { value, activeColor },
  selected,
  disabled,
  onSelect,
}: PickerItemProps<RecurrenceOption>) {
  const last = value === OPTIONS.at(-1)!.value;

  const contentScale = useRef(new Animated.Value(1)).current;
  const lineScaleX = useRef(new Animated.Value(selected ? 1 : 0)).current;
  const lineOpacity = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(lineScaleX, {
        toValue: selected ? 1 : 0,
        tension: 80,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(lineOpacity, {
        toValue: selected ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [lineOpacity, lineScaleX, selected]);

  function onPressIn() {
    Animated.spring(contentScale, {
      toValue: 0.93,
      speed: 60,
      useNativeDriver: true,
    }).start();
  }

  function onPressOut() {
    Animated.spring(contentScale, {
      toValue: 1,
      speed: 40,
      bounciness: 4,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View className={cn('flex-1', !last && 'border-r border-slate-200')}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onSelect}
        disabled={disabled}
        className="items-center p-3 justify-center flex-1"
      >
        <Animated.View
          style={{ transform: [{ scale: contentScale }] }}
          className="items-center w-full justify-center"
        >
          <Text
            className="text-sm font-semibold font-secondary text-center"
            style={{ color: selected ? activeColor : '#94a3b8' }}
          >
            {RECURRENCE_LABEL[value]}
          </Text>

          <View className="h-0.5 w-10/12 mt-2 items-center justify-center relative">
            <View className="h-full w-full rounded-full bg-slate-200/80 absolute" />

            <Animated.View
              className="h-full w-full rounded-full absolute"
              style={{
                backgroundColor: activeColor,
                opacity: lineOpacity,
                transform: [{ scaleX: lineScaleX }],
              }}
            />
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}

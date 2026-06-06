import type { DateTimePickerMode, PickerProps } from '@/types/PickerProps';

import { type LucideIcon, X, Calendar, Clock } from 'lucide-react-native';
import { type ColorValue, HEX_COLOR, COLOR } from '@/types/Color';
import { Text, Pressable, Keyboard, Animated } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import {
  formatDate,
  formatTime,
  parseDateString,
  parseTimeString,
} from '@/lib/date';

type Props = PickerProps<string | null | undefined> & {
  mode: DateTimePickerMode;
};

type ModeProps = {
  icon: LucideIcon;
  formatMask: string;
  highlightColor: ColorValue;
  getContent(value: string): string;
  parseValue(value: string): Date;
};

const MODE_PROPS: Record<DateTimePickerMode, ModeProps> = {
  date: {
    icon: Calendar,
    formatMask: 'yyyy-MM-dd',
    highlightColor: COLOR.BLUE,
    getContent: formatDate,
    parseValue: parseDateString,
  },
  time: {
    icon: Clock,
    formatMask: 'HH:mm',
    highlightColor: COLOR.PURPLE,
    getContent: formatTime,
    parseValue: parseTimeString,
  },
} as const;

export default function DateTimePicker({
  mode,
  value,
  disabled,
  onChange,
}: Props) {
  const { t } = useTranslation();
  const {
    icon: Icon,
    formatMask,
    highlightColor,
    getContent,
    parseValue,
  } = MODE_PROPS[mode];

  const content = value ? getContent(value) : t(`fields.${mode}.placeholder`);
  const textColor = value ? HEX_COLOR[highlightColor] : '#94a3b8';

  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(disabled ? 0.6 : 1)).current;
  const iconTranslateY = useRef(new Animated.Value(0)).current;

  const xScale = useRef(new Animated.Value(value ? 1 : 0)).current;
  const xOpacity = useRef(new Animated.Value(value ? 1 : 0)).current;

  const xRotate = xScale.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '0deg'],
  });

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: disabled ? 0.6 : 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [disabled, opacity]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(xScale, {
        toValue: value ? 1 : 0,
        tension: 120,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(xOpacity, {
        toValue: value ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    if (!value) return;

    iconTranslateY.setValue(0);
    Animated.sequence([
      Animated.timing(iconTranslateY, {
        toValue: -4,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(iconTranslateY, {
        toValue: 0,
        tension: 150,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [iconTranslateY, xOpacity, xScale, value]);

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

  function openPicker() {
    Keyboard.dismiss();
    DateTimePickerAndroid.open({
      mode,
      is24Hour: true,
      value: value ? parseValue(value) : new Date(),
      onChange({ type }, date) {
        if (type === 'set' && date) onChange(format(date, formatMask));
      },
    });
  }

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={openPicker}
      disabled={disabled}
      className="flex-1"
    >
      <Animated.View
        style={{
          opacity: opacity,
          transform: [{ scale: scale }],
        }}
        className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex-row items-center gap-2"
      >
        <Animated.View style={{ transform: [{ translateY: iconTranslateY }] }}>
          <Icon size={16} color={textColor} strokeWidth={2} />
        </Animated.View>

        <Text
          numberOfLines={1}
          style={{ color: textColor }}
          className="flex-1 text-sm font-medium font-secondary"
        >
          {content}
        </Text>

        <Animated.View
          style={{
            opacity: xOpacity,
            transform: [{ scale: xScale }, { rotate: xRotate }],
          }}
          pointerEvents={value ? 'auto' : 'none'}
        >
          <Pressable
            hitSlop={12}
            className="p-1 -m-1 active:opacity-50"
            onPress={() => onChange(null)}
          >
            <X size={16} color="#94a3b8" />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

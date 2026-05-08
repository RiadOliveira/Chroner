import type { DateTimePickerMode, PickerProps } from '@/types/PickerProps';

import { type LucideIcon, X, Calendar, Clock } from 'lucide-react-native';
import { type ColorValue, HEX_COLOR, COLOR } from '@/types/Color';
import { Text, Pressable, Keyboard } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format, parse, parseISO } from 'date-fns';

type Props = PickerProps<string | null | undefined> & {
  mode: DateTimePickerMode;
};

type ModeProps = {
  icon: LucideIcon;
  formatMask: string;
  highlightColor: ColorValue;
  getLabel(value: string): string;
  parseValue(value: string): Date;
};

const MODE_PROPS: Record<DateTimePickerMode, ModeProps> = {
  date: {
    icon: Calendar,
    formatMask: 'yyyy-MM-dd',
    highlightColor: COLOR.BLUE,
    getLabel: (value) => format(parseISO(value), 'MMM d, yyyy'),
    parseValue: parseISO,
  },
  time: {
    icon: Clock,
    formatMask: 'HH:mm',
    highlightColor: COLOR.PURPLE,
    getLabel: (value) => value,
    parseValue: (value) => parse(value, 'HH:mm', new Date()),
  },
} as const;

export default function DateTimePicker({ mode, value, onChange }: Props) {
  const {
    icon: Icon,
    formatMask,
    highlightColor,
    getLabel,
    parseValue,
  } = MODE_PROPS[mode];

  const label = value ? getLabel(value) : `Select ${mode}`;
  const textColor = value ? HEX_COLOR[highlightColor] : '#94a3b8';

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
      onPress={openPicker}
      className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex-row items-center gap-2"
    >
      <Icon size={16} color={textColor} strokeWidth={2} />

      <Text
        numberOfLines={1}
        className="flex-1 text-sm font-medium font-secondary"
        style={{ color: textColor }}
      >
        {label}
      </Text>

      {value && (
        <Pressable hitSlop={8} onPress={() => onChange(undefined)}>
          <X size={16} color="#94a3b8" />
        </Pressable>
      )}
    </Pressable>
  );
}

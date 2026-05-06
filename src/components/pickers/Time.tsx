import type { PickerProps } from '@/types/PickerProps';

import { Pressable, Text } from 'react-native';
import { Clock, X } from 'lucide-react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import { COLOR, HEX_COLOR } from '@/types/Color';

export default function TimePicker({
  value,
  onChange,
}: PickerProps<string | undefined>) {
  function openPicker() {
    const base = value ? parse(value, 'HH:mm', new Date()) : new Date();

    DateTimePickerAndroid.open({
      mode: 'time',
      value: base,
      is24Hour: true,
      onChange: (_, date) => {
        if (!date) return;

        const formatted = format(date, 'HH:mm');
        onChange(formatted);
      },
    });
  }

  const label = value ?? 'Select time';
  const textColor = value ? HEX_COLOR[COLOR.PURPLE] : '#94a3b8';

  return (
    <Pressable
      onPress={openPicker}
      className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex-row items-center gap-2"
    >
      <Clock size={16} color={textColor} strokeWidth={2} />

      <Text
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

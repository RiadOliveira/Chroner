import type { PickerProps } from '@/types/PickerProps';

import { Calendar, X } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format, parseISO } from 'date-fns';
import { COLOR, HEX_COLOR } from '@/types/Color';

export default function DatePicker({
  value,
  onChange,
}: PickerProps<string | undefined>) {
  function openPicker() {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: value ? parseISO(value) : new Date(),
      onChange(_, date) {
        if (!date) return;

        const formatted = format(date, 'yyyy-MM-dd');
        onChange(formatted);
      },
    });
  }

  const label = value ? format(parseISO(value), 'MMM d, yyyy') : 'Select date';
  const textColor = value ? HEX_COLOR[COLOR.BLUE] : '#94a3b8';

  return (
    <Pressable
      onPress={openPicker}
      className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex-row items-center gap-2"
    >
      <Calendar size={16} color={textColor} strokeWidth={2} />

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

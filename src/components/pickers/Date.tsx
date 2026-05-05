import { Calendar, X } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format, parseISO } from 'date-fns';
import { COLOR, HEX_COLOR } from '@/types/Color';

type Props = {
  value: string | undefined;
  onChange(value: string | undefined): void;
};

export default function DatePicker({ value, onChange }: Props) {
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

  const hasValue = !!value;
  const label = value ? format(parseISO(value), 'MMM d, yyyy') : 'Select date';

  return (
    <Pressable
      onPress={openPicker}
      className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex-row items-center gap-2"
    >
      <Calendar
        size={14}
        color={hasValue ? HEX_COLOR[COLOR.BLUE] : '#94a3b8'}
        strokeWidth={2}
      />

      <Text
        className="flex-1 text-sm font-medium font-secondary"
        style={{ color: hasValue ? '#1e293b' : '#94a3b8' }}
        numberOfLines={1}
      >
        {label}
      </Text>

      {hasValue && (
        <Pressable hitSlop={8} onPress={() => onChange(undefined)}>
          <X size={12} color="#94a3b8" />
        </Pressable>
      )}
    </Pressable>
  );
}

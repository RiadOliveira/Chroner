import { Pressable, Text } from 'react-native';
import { Clock, X } from 'lucide-react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import { COLOR, HEX_COLOR } from '@/types/Color';

type Props = {
  value: string | undefined;
  onChange(value: string | undefined): void;
};

export default function TimePicker({ value, onChange }: Props) {
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

  const hasValue = !!value;
  const label = value ?? 'Select time';

  return (
    <Pressable
      onPress={openPicker}
      className="bg-white border border-slate-200 rounded-2xl px-3 py-3 shadow-sm flex-row items-center gap-2"
    >
      <Clock
        size={14}
        color={hasValue ? HEX_COLOR[COLOR.PURPLE] : '#94a3b8'}
        strokeWidth={2}
      />

      <Text
        className="flex-1 text-sm font-medium font-secondary"
        style={{ color: hasValue ? '#1e293b' : '#94a3b8' }}
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

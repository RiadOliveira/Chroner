import type { RecurrenceValue } from '@/types/Recurrence';

import { View, Text, Pressable, ScrollView } from 'react-native';
import { RECURRENCE, RECURRENCE_LABEL } from '@/types/Recurrence';
import { COLOR, HEX_COLOR } from '@/types/Color';

type Props = {
  value: RecurrenceValue;
  onChange(value: RecurrenceValue): void;
};

type RecurrenceOption = {
  value: RecurrenceValue;
  activeColor: string;
};

type ItemProps = {
  option: RecurrenceOption;
  selected: boolean;
  onSelect(): void;
};

const OPTIONS: RecurrenceOption[] = [
  { value: RECURRENCE.HOURLY, activeColor: '#5470FC' },
  { value: RECURRENCE.DAILY, activeColor: HEX_COLOR[COLOR.PURPLE] },
  { value: RECURRENCE.WEEKLY, activeColor: '#BC4CF8' },
  { value: RECURRENCE.MONTHLY, activeColor: '#DC54F4' },
  { value: RECURRENCE.YEARLY, activeColor: HEX_COLOR[COLOR.PINK] },
] as const;

export default function RecurrencePicker({ value, onChange }: Props) {
  return (
    <View className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {OPTIONS.map((option) => (
          <Item
            key={option.value}
            option={option}
            selected={value === option.value}
            onSelect={() => onChange(option.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Item({
  option: { value, activeColor },
  selected,
  onSelect,
}: ItemProps) {
  const last = value === OPTIONS.at(-1)!.value;

  return (
    <Pressable
      onPress={onSelect}
      className="items-center py-3 px-4"
      style={{ borderRightWidth: last ? 0 : 1, borderRightColor: '#f1f5f9' }}
    >
      <Text
        className="text-sm font-semibold font-secondary"
        style={{ color: selected ? activeColor : '#94a3b8' }}
      >
        {RECURRENCE_LABEL[value]}
      </Text>

      <View
        className="h-0.5 w-full rounded-full mt-2"
        style={{ backgroundColor: selected ? activeColor : 'transparent' }}
      />
    </Pressable>
  );
}

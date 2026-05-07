import type { RecurrenceValue } from '@/types/Recurrence';
import type { PickerProps, PickerItemProps } from '@/types/PickerProps';

import { View, Text, Pressable, ScrollView } from 'react-native';
import { cn } from '@/utils/mergeStyles';
import { COLOR, HEX_COLOR } from '@/types/Color';
import { RECURRENCE, RECURRENCE_LABEL } from '@/types/Recurrence';

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
  onChange,
}: PickerProps<RecurrenceValue>) {
  return (
    <View className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
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
              onSelect={() => onChange(selectValue)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

function Item({
  data: { value, activeColor },
  selected,
  onSelect,
}: PickerItemProps<RecurrenceOption>) {
  const last = value === OPTIONS.at(-1)!.value;

  return (
    <Pressable
      onPress={onSelect}
      className={cn(
        'items-center py-3 px-4 flex-1',
        !last && 'border-r border-slate-200',
      )}
    >
      <Text
        className="text-sm font-semibold font-secondary"
        style={{ color: selected ? activeColor : '#94a3b8' }}
      >
        {RECURRENCE_LABEL[value]}
      </Text>

      <View
        className="h-0.5 w-full rounded-full mt-2"
        style={{ backgroundColor: selected ? activeColor : '#c5cdd9' }}
      />
    </Pressable>
  );
}

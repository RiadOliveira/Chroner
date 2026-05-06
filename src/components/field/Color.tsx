import type { ColorValue } from '@/types/Color';
import type { PickerProps, PickerItemProps } from '@/types/PickerProps';

import { Check } from 'lucide-react-native';
import { View, Pressable } from 'react-native';
import { COLOR, HEX_COLOR } from '@/types/Color';

const COLOR_ROWS: ColorValue[][] = [
  [COLOR.BLUE, COLOR.CYAN, COLOR.TEAL, COLOR.GREEN, COLOR.LIME, COLOR.YELLOW],
  [COLOR.ORANGE, COLOR.RED, COLOR.ROSE, COLOR.PINK, COLOR.PURPLE, COLOR.INDIGO],
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
  const hexColor = HEX_COLOR[data];

  return (
    <Pressable
      hitSlop={6}
      onPress={onSelect}
      className="items-center justify-center"
    >
      <View
        className="rounded-full p-0.5 border-2"
        style={{ borderColor: selected ? hexColor : 'transparent' }}
      >
        <View
          className="size-9 rounded-full items-center justify-center"
          style={{ backgroundColor: hexColor }}
        >
          {selected && <Check size={16} color="#fff" strokeWidth={3} />}
        </View>
      </View>
    </Pressable>
  );
}

import type { ColorValue } from '@/types/Color';

import { Check } from 'lucide-react-native';
import { View, Pressable } from 'react-native';
import { COLOR, HEX_COLOR } from '@/types/Color';

type Props = {
  value: ColorValue;
  onChange(value: ColorValue): void;
};

type ColorCircleProps = {
  value: ColorValue;
  selected: boolean;
  onSelect(): void;
};

const COLOR_ROWS: ColorValue[][] = [
  [COLOR.BLUE, COLOR.CYAN, COLOR.TEAL, COLOR.GREEN, COLOR.LIME, COLOR.YELLOW],
  [COLOR.ORANGE, COLOR.RED, COLOR.ROSE, COLOR.PINK, COLOR.PURPLE, COLOR.INDIGO],
] as const;

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <View className="bg-white border border-slate-200 rounded-2xl shadow-sm px-4 py-4 gap-3">
      {COLOR_ROWS.map((row, rowIndex) => (
        <View
          key={`color-row-${rowIndex}`}
          className="flex-row justify-between"
        >
          {row.map((colorValue) => (
            <ColorCircle
              key={`color-${colorValue}`}
              value={colorValue}
              selected={value === colorValue}
              onSelect={() => onChange(colorValue)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

function ColorCircle({ value, selected, onSelect }: ColorCircleProps) {
  const hexColor = HEX_COLOR[value];

  return (
    <Pressable
      onPress={onSelect}
      className="items-center justify-center"
      hitSlop={6}
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

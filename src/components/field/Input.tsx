import { type TextInputProps, View, TextInput } from 'react-native';

import { cn } from '@/utils/mergeStyles';
import { COLOR, HEX_COLOR } from '@/types/Color';

export default function Input({ className, ...props }: TextInputProps) {
  return (
    <View
      className={cn(
        'bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm',
        className,
      )}
    >
      <TextInput
        {...props}
        returnKeyType="done"
        placeholderTextColor="#94a3b8"
        className="text-slate-800 text-base font-secondary font-medium"
        selectionColor={HEX_COLOR[COLOR.PURPLE]}
      />
    </View>
  );
}

import type { DefaultProps } from '@/types/DefaultProps';

import { View, Text } from 'react-native';
import { cn } from '@/utils/mergeStyles';

type Props = DefaultProps & {
  label: string;
  centered?: boolean;
};

export default function Field({ label, centered, className, children }: Props) {
  return (
    <View className={cn('gap-2 flex-1', className)}>
      <Text
        className={cn(
          'text-slate-500 text-xs font-semibold font-secondary uppercase tracking-widest ml-1',
          centered && 'text-center',
        )}
      >
        {label}
      </Text>

      {children}
    </View>
  );
}

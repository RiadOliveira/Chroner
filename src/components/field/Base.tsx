import type { DefaultProps } from '@/types/DefaultProps';

import { View, Text } from 'react-native';
import { cn } from '@/utils/mergeStyles';

export default function Field({
  label,
  className,
  children,
}: DefaultProps & { label: string }) {
  return (
    <View className={cn('gap-2', className)}>
      <Text className="text-slate-500 text-xs font-semibold font-secondary uppercase tracking-widest ml-1">
        {label}
      </Text>

      {children}
    </View>
  );
}

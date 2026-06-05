import type { LucideIcon } from 'lucide-react-native';

export type CycleOption<Value extends string> = {
  value: Value;
  label: string;
  icon?: LucideIcon;
};

import type { AndroidNativeProps } from '@react-native-community/datetimepicker';

export type PickerProps<T> = {
  value: T;
  disabled?: boolean;
  onChange(value: T): void;
};

export type PickerItemProps<T> = {
  data: T;
  selected: boolean;
  disabled?: boolean;
  onSelect(): void;
};

export type DateTimePickerMode = Exclude<AndroidNativeProps['mode'], undefined>;

import type { AndroidNativeProps } from '@react-native-community/datetimepicker';

export type PickerProps<T> = {
  value: T;
  onChange(value: T): void;
};

export type PickerItemProps<T> = {
  data: T;
  selected: boolean;
  onSelect(): void;
};

export type DateTimePickerMode = Exclude<AndroidNativeProps['mode'], undefined>;

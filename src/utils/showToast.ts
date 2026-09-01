import { type ColorValue, HEX_COLOR } from '@/types/Color';

import Toast from 'react-native-toast-message';

type Props = {
  message: string;
  color: ColorValue;
};

export function showToast({ message, color }: Props) {
  Toast.show({
    text1: message,
    props: { color: HEX_COLOR[color] },
  });
}

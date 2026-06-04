import type { DefaultProps } from '@/types/DefaultProps';

import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import { COLOR, HEX_COLOR } from '@/types/Color';

type Props = Partial<LinearGradientProps> & DefaultProps;

export default function AppGradient({
  colors = [
    HEX_COLOR[COLOR.BLUE],
    HEX_COLOR[COLOR.PURPLE],
    HEX_COLOR[COLOR.PINK],
  ],
  locations = [0, 0.55, 1],
  ...props
}: Props) {
  return <LinearGradient {...props} colors={colors} locations={locations} />;
}

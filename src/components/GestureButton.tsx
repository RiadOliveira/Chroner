import { Pressable, PressableProps } from 'react-native';
import { TapHandler } from '@/utils/tapHandler';

export type GestureButtonProps = PressableProps & {
  onSingleTap?: () => void;
  onDoubleTap?: () => void;
  onHold?: () => void;
};

export default function GestureButton({
  onSingleTap,
  onDoubleTap,
  onHold,
  ...props
}: GestureButtonProps) {
  return (
    <Pressable
      android_disableSound
      onPress={() => TapHandler.handlePress({ onSingleTap, onDoubleTap })}
      onLongPress={onHold}
      {...props}
    />
  );
}

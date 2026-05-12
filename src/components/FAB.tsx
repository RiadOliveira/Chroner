import { Plus } from 'lucide-react-native';
import { Pressable } from 'react-native';

import AppGradient from './AppGradient';

type Props = { onPress(): void };

export default function FAB({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl overflow-hidden shadow-md absolute bottom-4 right-6 shadow-accent-purple"
    >
      <AppGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="p-4">
        <Plus size={26} color="#ffffff" strokeWidth={2.5} />
      </AppGradient>
    </Pressable>
  );
}

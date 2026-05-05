import { Plus } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR, HEX_COLOR } from '@/types/Color';

type Props = { onPress(): void };

export default function FAB({ onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl overflow-hidden shadow-lg absolute bottom-8 right-6"
    >
      <LinearGradient
        colors={[HEX_COLOR[COLOR.BLUE], HEX_COLOR[COLOR.PURPLE]]}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-4"
      >
        <Plus size={24} color="#fff" strokeWidth={2.5} />
      </LinearGradient>
    </Pressable>
  );
}

import { View, Text } from 'react-native';
import { Hourglass } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR, HEX_COLOR } from '@/types/Color';
import { cn } from '@/utils/mergeStyles';

type Props = { overdueCount: number };

const GRADIENT_COLORS = [
  HEX_COLOR[COLOR.BLUE],
  HEX_COLOR[COLOR.PURPLE],
] as const;

export default function Header({ overdueCount }: Props) {
  return (
    <View className="pt-16 pb-8 px-6 gap-8 rounded-b-[40px] overflow-hidden shadow-sm">
      <LinearGradient colors={GRADIENT_COLORS} className="absolute inset-0" />

      <View className="flex-row justify-between items-center">
        <View className="gap-1">
          <Text className="text-3xl font-extrabold text-white">Chroner</Text>
          <Text className="text-white font-medium">Manage your timeline</Text>
        </View>

        <View className="bg-white/80 p-3 rounded-full border border-white/40">
          <Hourglass size={24} color={HEX_COLOR[COLOR.PURPLE]} />
        </View>
      </View>

      <View className="bg-background p-4 rounded-2xl shadow-sm border border-slate-100 flex-row items-center">
        <View
          className={cn(
            'size-3 rounded-full mr-3',
            overdueCount > 0 ? 'bg-accent-pink' : 'bg-accent-purple',
          )}
        />

        <Text className="text-slate-700 font-semibold flex-1">
          {getOverdueMessage(overdueCount)}
        </Text>
      </View>
    </View>
  );
}

function getOverdueMessage(overdueCount: number) {
  if (overdueCount === 0) return 'Your timeline is perfectly synced!';
  return `${overdueCount} task${overdueCount > 1 ? 's' : ''} out of time`;
}

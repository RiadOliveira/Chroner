import { View, Text } from 'react-native';
import { Hourglass } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR, HEX_COLOR } from '@/types/Color';
import { cn } from '@/utils/mergeStyles';

type Props = { overdueCount: number };

const GRADIENT_LOCATIONS = [0, 0.55, 1] as const;
const GRADIENT_COLORS = [
  HEX_COLOR[COLOR.BLUE],
  HEX_COLOR[COLOR.PURPLE],
  HEX_COLOR[COLOR.PINK],
] as const;

export default function Header({ overdueCount }: Props) {
  const hasOverdueTasks = overdueCount > 0;
  const hourglassColor = hasOverdueTasks ? COLOR.BLUE : COLOR.PURPLE;

  return (
    <View className="pt-16 pb-4 px-6 gap-8 rounded-b-[40px] overflow-hidden shadow-sm">
      <LinearGradient
        locations={GRADIENT_LOCATIONS}
        colors={GRADIENT_COLORS}
        className="absolute inset-0"
      />

      <View className="flex-row justify-between items-center">
        <View className="gap-1">
          <Text className="text-3xl font-extrabold text-white font-primary">
            Chroner
          </Text>
          <Text className="font-secondary text-lg text-white font-medium">
            Calibrate your timeline
          </Text>
        </View>

        <View className="bg-white/90 p-3 rounded-full border border-white/50">
          <Hourglass size={24} color={HEX_COLOR[hourglassColor]} />
        </View>
      </View>

      <View className="bg-background p-4 rounded-[40px] shadow-sm border border-slate-100 flex-row items-center justify-center">
        <View
          className={cn(
            'size-3 rounded-full mr-3',
            hasOverdueTasks ? 'bg-accent-blue' : 'bg-accent-purple',
          )}
        />

        <Text className="text-slate-800 font-semibold font-secondary">
          {getOverdueMessage(overdueCount)}
        </Text>
      </View>
    </View>
  );
}

function getOverdueMessage(overdueCount: number) {
  if (overdueCount === 0) return 'Your timeline is perfectly synced!';
  return `${overdueCount} task${overdueCount > 1 ? 's' : ''} shattered across the timeline!`;
}

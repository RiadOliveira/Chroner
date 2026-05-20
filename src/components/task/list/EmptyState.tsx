import { COLOR, HEX_COLOR } from '@/types/Color';
import { Animated, Easing, Text, View } from 'react-native';
import { useEffect, useRef } from 'react';

import AppIcon from '@/components/AppIcon';

type Props = { visible: boolean };

export default function EmptyState({ visible }: Props) {
  const scale = useRef(new Animated.Value(0.985)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    if (!visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -10,
          duration: 140,
          useNativeDriver: true,
        }),
      ]).start();

      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 320,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, scale, translateY, visible]);

  return (
    <View className="items-center justify-center px-4 pt-12">
      <Animated.View
        renderToHardwareTextureAndroid
        style={{
          opacity,
          transform: [{ translateY }, { scale }],
        }}
      >
        <View className="bg-white rounded-3xl p-8 items-center border border-slate-100 shadow elevation-sm">
          <View className="bg-accent-purple/10 p-4 rounded-full mb-4">
            <AppIcon
              tintColor={HEX_COLOR[COLOR.PURPLE]}
              style={{ width: 32, height: 32 }}
            />
          </View>

          <Text className="text-accent-purple font-bold text-lg font-primary text-center mb-2">
            All quiet across the timeline
          </Text>

          <Text className="text-slate-600 text-sm font-medium font-secondary text-center">
            Tap the + button to add your first task and start tracking your
            timeline.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

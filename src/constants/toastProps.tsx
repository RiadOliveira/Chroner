import type { ToastProps, ToastShowParams } from 'react-native-toast-message';

import { COLOR, HEX_COLOR } from '@/types/Color';
import { Dimensions, Text, View } from 'react-native';

import AppGradient from '@/components/AppGradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const TOAST_PROPS: ToastProps = {
  type: 'info',
  position: 'bottom',
  bottomOffset: 14,
  visibilityTime: 2000,
  config: {
    info({ text1, props: { color } }: ToastShowParams) {
      return (
        <AppGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: SCREEN_WIDTH - 42 - 72,
            height: 54,
            padding: 2,
            borderRadius: 16,
            marginRight: 72,
            elevation: 13,
            zIndex: 10,
            shadowColor: HEX_COLOR[COLOR.PURPLE],
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 10,
            shadowOpacity: 0.35,
          }}
        >
          <View className="bg-background size-full rounded-2xl items-center justify-center flex-row gap-3">
            <View
              style={{ borderColor: color }}
              className="rounded-full border-[5px]"
            />

            <Text className="font-secondary font-semibold text-slate-800">
              {text1}
            </Text>
          </View>
        </AppGradient>
      );
    },
  },
} as const;

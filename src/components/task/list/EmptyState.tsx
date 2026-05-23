import { COLOR, HEX_COLOR } from '@/types/Color';
import {
  MousePointerClick,
  Check,
  Trash2,
  PlusCircle,
} from 'lucide-react-native';
import { Animated, Easing, Text, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import AppIcon from '@/components/AppIcon';

type Props = { visible: boolean };

export default function EmptyState({ visible }: Props) {
  const { t } = useTranslation();

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
    <View className="items-center justify-center px-6 pt-12">
      <Animated.View
        renderToHardwareTextureAndroid
        className="w-full"
        style={{
          opacity,
          transform: [{ translateY }, { scale }],
        }}
      >
        <View className="bg-white rounded-[28px] p-6 w-full border border-slate-100 shadow-sm elevation-sm">
          <View className="items-center mb-6 mt-2">
            <View className="bg-accent-purple/10 p-4 rounded-3xl mb-4">
              <AppIcon
                tintColor={HEX_COLOR[COLOR.PURPLE]}
                style={{ width: 32, height: 32 }}
              />
            </View>

            <Text className="text-accent-purple font-bold text-xl font-primary text-center mb-2">
              {t('emptyState.title')}
            </Text>

            <Text className="text-slate-500 text-sm font-medium font-secondary text-center px-4 leading-6">
              {`${t('emptyState.descriptionPrefix')} `}
              <View className="translate-y-[3px]">
                <PlusCircle
                  size={14}
                  color={HEX_COLOR[COLOR.PURPLE]}
                  strokeWidth={2.5}
                />
              </View>
              {` ${t('emptyState.descriptionSuffix')}.`}
            </Text>
          </View>

          <View className="bg-slate-50 border border-slate-100 rounded-2xl p-4 gap-3">
            <Text className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 text-center font-primary">
              {t('gestures.title')}
            </Text>

            <View className="flex-row items-center gap-3">
              <View className="bg-indigo-500/10 p-2 rounded-xl">
                <MousePointerClick size={16} color="#6366f1" />
              </View>

              <Text className="text-indigo-600 font-semibold font-secondary text-sm flex-1">
                {t('gestures.singleTap.action')}
              </Text>
              <Text className="text-indigo-600 font-medium font-secondary text-sm">
                {t('gestures.singleTap.result')}
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="bg-emerald-500/10 p-2 rounded-xl">
                <Check size={16} color="#059669" />
              </View>

              <Text className="text-emerald-600 font-semibold font-secondary text-sm flex-1">
                {t('gestures.doubleTap.action')}
              </Text>
              <Text className="text-emerald-600 font-medium font-secondary text-sm">
                {t('gestures.doubleTap.result')}
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              <View className="bg-red-500/10 p-2 rounded-xl">
                <Trash2 size={16} color="#e11d48" />
              </View>
              <Text className="text-red-600 font-semibold font-secondary text-sm flex-1">
                {t('gestures.hold.action')}
              </Text>
              <Text className="text-red-600 font-medium font-secondary text-sm">
                {t('gestures.hold.result')}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

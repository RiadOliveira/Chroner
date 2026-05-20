import { COLOR, HEX_COLOR } from '@/types/Color';
import { View, Text, Animated } from 'react-native';
import { cn } from '@/utils/mergeStyles';
import { useTasks } from '@/hooks/tasks';
import { isOverdue } from '@/utils/date';
import { useMemo, useRef, useEffect, useState } from 'react';

import AppIcon from './AppIcon';
import AppGradient from './AppGradient';

export default function Header() {
  const { tasks } = useTasks();

  const overdueCount = useMemo(() => {
    return tasks.reduce((count, { dueDate, reminderTime }) => {
      return count + Number(isOverdue(dueDate, reminderTime));
    }, 0);
  }, [tasks]);

  const hasOverdueTasks = overdueCount > 0;
  const hourglassColor = hasOverdueTasks ? COLOR.BLUE : COLOR.PURPLE;

  const [displayedCount, setDisplayedCount] = useState(overdueCount);
  const [displayedHasOverdue, setDisplayedHasOverdue] =
    useState(hasOverdueTasks);

  const prevHasOverdue = useRef(hasOverdueTasks);
  const prevOverdueCount = useRef(overdueCount);

  const hourglassSpin = useRef(
    new Animated.Value(hasOverdueTasks ? 1 : 0),
  ).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const textTranslateY = useRef(new Animated.Value(0)).current;
  const dotScale = useRef(new Animated.Value(1)).current;

  const hourglassRotate = hourglassSpin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    if (prevHasOverdue.current === hasOverdueTasks) return;
    prevHasOverdue.current = hasOverdueTasks;

    Animated.timing(hourglassSpin, {
      toValue: hasOverdueTasks ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [hasOverdueTasks, hourglassSpin]);

  useEffect(() => {
    if (prevOverdueCount.current === overdueCount) return;
    prevOverdueCount.current = overdueCount;

    textOpacity.stopAnimation();
    textTranslateY.stopAnimation();
    dotScale.stopAnimation();

    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateY, {
        toValue: -10,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(dotScale, {
          toValue: 1.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(dotScale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setDisplayedCount(overdueCount);
      setDisplayedHasOverdue(hasOverdueTasks);

      textTranslateY.setValue(10);

      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [overdueCount, hasOverdueTasks, textOpacity, textTranslateY, dotScale]);

  return (
    <View className="pt-16 pb-4 px-6 gap-8 rounded-b-[40px] overflow-hidden shadow-lg shadow-accent-purple elevation-xl z-10">
      <AppGradient className="absolute inset-0" />

      <View className="flex-row justify-between items-center">
        <View className="gap-1">
          <Text className="text-3xl font-extrabold text-white font-primary">
            Chroner
          </Text>
          <Text className="font-secondary text-lg text-white font-medium">
            Calibrate your timeline
          </Text>
        </View>

        <Animated.View
          style={{ transform: [{ rotate: hourglassRotate }] }}
          className="bg-white mt-1 p-3 rounded-full border border-white/50 shadow elevation-md"
        >
          <AppIcon
            tintColor={HEX_COLOR[hourglassColor]}
            style={{ width: 28, height: 28 }}
          />
        </Animated.View>
      </View>

      <View className="bg-white p-4 rounded-[40px] elevation-md shadow border border-slate-100 flex-row items-center justify-center gap-3">
        <Animated.View
          style={{ transform: [{ scale: dotScale }] }}
          className={cn(
            'size-3 rounded-full mt-0.5',
            displayedHasOverdue ? 'bg-accent-blue' : 'bg-accent-purple',
          )}
        />

        <Animated.Text
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          }}
          className="text-slate-800 font-semibold font-secondary"
        >
          {getOverdueMessage(displayedCount)}
        </Animated.Text>
      </View>
    </View>
  );
}

function getOverdueMessage(overdueCount: number) {
  if (overdueCount === 0) return 'Your timeline is perfectly synced!';
  return `${overdueCount} task${overdueCount > 1 ? 's' : ''} shattered across the timeline!`;
}

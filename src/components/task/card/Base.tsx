import type { Task } from '@/types/Task';

import { Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

import CardContainer from './Container';

type Props = {
  task: Task;
  index: number;
  selectTask(): void;
  completeTask(): Promise<void>;
  deleteTask(): Promise<void>;
};

export default function TaskCard({
  task,
  index,
  selectTask,
  completeTask,
  deleteTask,
}: Props) {
  const scale = useRef(new Animated.Value(0.985)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    const delay = Math.min(index * 35, 180);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 260,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 260,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 260,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, scale, translateY]);

  function onComplete() {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.93,
        duration: 220,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -12,
        duration: 220,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => finished && completeTask());
  }

  function onDelete() {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 48,
        duration: 180,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 180,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => finished && deleteTask());
  }

  return (
    <Animated.View
      renderToHardwareTextureAndroid
      style={{
        opacity,
        transform: [{ translateY }, { translateX }, { scale }],
      }}
    >
      <CardContainer
        task={task}
        onSelect={selectTask}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    </Animated.View>
  );
}

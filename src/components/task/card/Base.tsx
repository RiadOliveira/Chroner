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
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const delay = Math.min(index * 50, 300);

    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [index, opacity, scale, translateY]);

  function onComplete() {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 10,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => finished && completeTask());
  }

  function onDelete() {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -100,
        duration: 200,
        easing: Easing.in(Easing.poly(4)),
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

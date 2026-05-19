import { COLOR, HEX_COLOR } from '@/types/Color';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { X, Hourglass } from 'lucide-react-native';
import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '@/hooks/tasks';
import { useState, useEffect, useRef } from 'react';

import TaskForm from './form/Base';
import AppGradient from '../AppGradient';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TaskModal() {
  const { selectedIndex, selectTask } = useTasks();
  const isVisible = selectedIndex !== undefined;

  const [renderModal, setRenderModal] = useState(isVisible);
  const [isCreating, setIsCreating] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (isVisible) {
      setIsCreating(selectedIndex === CREATE_TASK_INDEX);
      setRenderModal(true);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.poly(4)),
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
      ]).start();

      return;
    }

    if (renderModal) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          easing: Easing.in(Easing.poly(4)),
          useNativeDriver: true,
        }),
      ]).start(() => setRenderModal(false));
    }
  }, [fadeAnim, isVisible, renderModal, selectedIndex, slideAnim]);

  function onClose() {
    selectTask(undefined);
  }

  return (
    <Modal
      transparent
      statusBarTranslucent
      animationType="none"
      visible={renderModal}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior="height" className="flex-1">
        <Animated.View
          className="flex-1 bg-black/40 absolute size-full"
          style={{ opacity: fadeAnim }}
        >
          <Pressable className="flex-1" onPress={onClose} />
        </Animated.View>

        <Animated.View
          pointerEvents="box-none"
          className="flex-1 justify-end"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          <SafeAreaView
            edges={['bottom']}
            className="bg-background max-h-[88%] overflow-hidden shadow-2xl"
          >
            <AppGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="h-1 w-full"
            />

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20 }}
            >
              <View className="flex-row items-center justify-between pb-6">
                <View className="flex-row items-center gap-3">
                  <View className="bg-accent-purple/10 p-2 rounded-xl">
                    <Hourglass
                      size={18}
                      color={HEX_COLOR[COLOR.PURPLE]}
                      strokeWidth={1.5}
                    />
                  </View>

                  <Text className="text-slate-800 text-xl font-bold font-primary">
                    {isCreating ? 'New Task' : 'Edit Task'}
                  </Text>
                </View>

                <Pressable
                  onPress={onClose}
                  className="bg-slate-200/70 p-2 rounded-xl"
                  hitSlop={8}
                >
                  <X size={18} color="#64748b" />
                </Pressable>
              </View>

              <TaskForm isCreating={isCreating} onSubmit={onClose} />
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

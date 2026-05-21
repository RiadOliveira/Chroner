import { COLOR, HEX_COLOR } from '@/types/Color';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { X } from 'lucide-react-native';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '@/hooks/tasks';
import { useState, useEffect } from 'react';

import Modal from 'react-native-modal';
import TaskForm from './form/Base';
import AppGradient from '../AppGradient';
import AppIcon from '../AppIcon';

export default function TaskModal() {
  const { selectedIndex, selectTask } = useTasks();
  const [isCreating, setIsCreating] = useState(false);

  const isVisible = selectedIndex !== undefined;
  useEffect(() => {
    if (isVisible) setIsCreating(selectedIndex === CREATE_TASK_INDEX);
  }, [isVisible, selectedIndex]);

  function onClose() {
    selectTask(undefined);
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      avoidKeyboard
      useNativeDriver
      hideModalContentWhileAnimating
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={250}
      backdropOpacity={0.5}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={250}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <SafeAreaView
        edges={['bottom']}
        className="bg-background max-h-[88%] overflow-hidden"
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
                <AppIcon
                  tintColor={HEX_COLOR[COLOR.PURPLE]}
                  style={{ width: 18, height: 18 }}
                />
              </View>

              <Text className="text-slate-800 text-xl font-bold font-primary">
                {isCreating ? 'New Task' : 'Edit Task'}
              </Text>
            </View>

            <TouchableOpacity
              hitSlop={8}
              activeOpacity={0.6}
              className="bg-slate-200/70 p-2 rounded-xl"
              onPress={onClose}
            >
              <X size={18} color="#64748b" />
            </TouchableOpacity>
          </View>

          <TaskForm isCreating={isCreating} onSubmit={onClose} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

import { COLOR, HEX_COLOR } from '@/types/Color';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { X, Trash2, Check } from 'lucide-react-native';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '@/hooks/tasks';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import Modal from 'react-native-modal';
import TaskForm from './form/Base';
import AppGradient from '../AppGradient';
import AppIcon from '../AppIcon';

export default function TaskModal() {
  const { t } = useTranslation();
  const { tasks, selectedIndex, selectTask, deleteTask, completeTask } =
    useTasks();
  const [creating, setCreating] = useState(false);

  const visible = selectedIndex !== undefined;
  const selectedTask = visible && !creating ? tasks[selectedIndex] : undefined;

  useEffect(() => {
    if (visible) setCreating(selectedIndex === CREATE_TASK_INDEX);
  }, [selectedIndex, visible]);

  function onClose() {
    selectTask(undefined);
  }

  async function onDelete() {
    if (selectedTask === undefined) return;

    await deleteTask(selectedTask);
    onClose();
  }

  async function onComplete() {
    if (selectedTask === undefined) return;

    await completeTask(selectedTask);
    onClose();
  }

  return (
    <Modal
      isVisible={visible}
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
                {t(`form.title_${creating ? 'create' : 'edit'}`)}
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              {!creating && (
                <>
                  <TouchableOpacity
                    className="bg-red-500/10 p-2 rounded-xl"
                    onPress={onDelete}
                    activeOpacity={0.6}
                    hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
                  >
                    <Trash2 size={18} color="#e11d48" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-emerald-500/10 p-2 rounded-xl"
                    onPress={onComplete}
                    activeOpacity={0.6}
                    hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
                  >
                    <Check size={18} color="#059669" />
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity
                className="bg-slate-200/70 p-2 rounded-xl"
                onPress={onClose}
                activeOpacity={0.6}
                hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              >
                <X size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>

          <TaskForm isCreating={creating} onSubmit={onClose} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

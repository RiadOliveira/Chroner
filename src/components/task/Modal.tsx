import {
  View,
  Text,
  Modal,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { X, Hourglass } from 'lucide-react-native';
import { COLOR, HEX_COLOR } from '@/types/Color';
import { useTasks } from '@/hooks/tasks';

import AppGradient from '../AppGradient';
import TaskForm from './Form';

type Props = {
  visible: boolean;
  onClose(): void;
};

export default function TaskModal({ visible, onClose }: Props) {
  const { selectedTask } = useTasks();
  const isEditing = selectedTask !== undefined;

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView behavior="height" className="flex-1">
        <Pressable className="flex-1 bg-black/40" onPress={onClose} />

        <View className="bg-background max-h-[88%]">
          <AppGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-1 w-full"
          />

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20, paddingBottom: 32 }}
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
                  {isEditing ? 'Edit Task' : 'New Task'}
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

            <TaskForm shouldReset={visible} onSubmit={onClose} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

import type { DefaultProps } from '@/types/DefaultProps';
import type { TaskDTO } from '@/types/Task';

import {
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import { X, Check, Plus, Hourglass } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { useTasks } from '@/hooks/tasks';
import { RECURRENCE } from '@/types/Recurrence';
import { COLOR, HEX_COLOR } from '@/types/Color';

import RecurrencePicker from '../pickers/Recurrence';
import ColorPicker from '../pickers/Color';
import DatePicker from '../pickers/Date';
import TimePicker from '../pickers/Time';
import AppGradient from '../AppGradient';

type Props = {
  visible: boolean;
  onClose(): void;
};

const DEFAULT_FORM_DATA: TaskDTO = {
  name: '',
  recurrence: RECURRENCE.NONE,
  color: COLOR.BLUE,
} as const;

export default function TaskModal({ visible, onClose }: Props) {
  const { selectedTask, createTask, updateTask } = useTasks();
  const [formData, setFormData] = useState<TaskDTO>(DEFAULT_FORM_DATA);

  const isEditing = selectedTask !== undefined;
  const isValid = formData.name.length > 0;

  useEffect(() => {
    if (visible) setFormData(selectedTask ?? DEFAULT_FORM_DATA);
  }, [selectedTask, visible]);

  function setField<K extends keyof TaskDTO>(key: K, value: TaskDTO[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    await (isEditing ? updateTask : createTask)(formData);
    onClose();
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent
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
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            <View className="flex-row items-center justify-between p-6">
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
                className="bg-slate-100 p-2 rounded-xl"
                hitSlop={8}
              >
                <X size={18} color="#64748b" />
              </Pressable>
            </View>

            <View className="px-6 gap-6">
              <View className="gap-2">
                <FieldLabel>Task Name</FieldLabel>
                <View className="bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">
                  <TextInput
                    value={formData.name}
                    onChangeText={(value) => setField('name', value)}
                    placeholder="What do you need to do?"
                    placeholderTextColor="#94a3b8"
                    className="text-slate-800 text-base font-secondary font-medium"
                    returnKeyType="done"
                    maxLength={80}
                  />
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 gap-2">
                  <FieldLabel>Due Date</FieldLabel>
                  <DatePicker
                    value={formData.dueDate ?? undefined}
                    onChange={(value) => setField('dueDate', value)}
                  />
                </View>

                <View className="flex-1 gap-2">
                  <FieldLabel>Reminder Time</FieldLabel>
                  <TimePicker
                    value={formData.reminderTime ?? undefined}
                    onChange={(value) => setField('reminderTime', value)}
                  />
                </View>
              </View>

              <View className="gap-2">
                <FieldLabel>Recurrence</FieldLabel>
                <RecurrencePicker
                  value={formData.recurrence!}
                  onChange={(value) => setField('recurrence', value)}
                />
              </View>

              <View className="gap-2">
                <FieldLabel>Color</FieldLabel>
                <ColorPicker
                  value={formData.color!}
                  onChange={(value) => setField('color', value)}
                />
              </View>

              <Pressable
                onPress={handleSubmit}
                disabled={!isValid}
                className="rounded-2xl overflow-hidden my-2"
                style={{ opacity: isValid ? 1 : 0.5 }}
              >
                <AppGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="flex-row items-center justify-center gap-2 py-4"
                >
                  {isEditing ? (
                    <Check size={18} color="#fff" strokeWidth={2.5} />
                  ) : (
                    <Plus size={18} color="#fff" strokeWidth={2.5} />
                  )}
                  <Text className="text-white font-bold text-base font-primary">
                    {isEditing ? 'Save Changes' : 'Add Task'}
                  </Text>
                </AppGradient>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function FieldLabel({ children }: DefaultProps) {
  return (
    <Text className="text-slate-500 text-xs font-semibold font-secondary uppercase tracking-widest ml-1">
      {children}
    </Text>
  );
}

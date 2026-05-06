import type { DefaultProps } from '@/types/DefaultProps';
import type { TaskDTO } from '@/types/Task';

import { Check, Plus } from 'lucide-react-native';
import { View, Text, TextInput, Pressable } from 'react-native';
import { COLOR } from '@/types/Color';
import { RECURRENCE } from '@/types/Recurrence';
import { cn } from '@/utils/mergeStyles';
import { useTasks } from '@/hooks/tasks';
import { useEffect, useState } from 'react';

import AppGradient from '../AppGradient';
import DateTimePicker from '../pickers/DateTime';
import RecurrencePicker from '../pickers/Recurrence';
import ColorPicker from '../pickers/Color';

type Props = {
  shouldReset: boolean;
  onSubmit(): void;
};

type SubmitButtonProps = {
  isValid: boolean;
  isEditing: boolean;
  handleSubmit(): Promise<void>;
};

const DEFAULT_FORM_DATA: TaskDTO = {
  name: '',
  recurrence: RECURRENCE.NONE,
  color: COLOR.BLUE,
} as const;

export default function TaskForm({ shouldReset, onSubmit }: Props) {
  const { selectedTask, createTask, updateTask } = useTasks();
  const [formData, setFormData] = useState<TaskDTO>(DEFAULT_FORM_DATA);

  const isEditing = selectedTask !== undefined;
  const isValid = formData.name.length > 0;

  useEffect(() => {
    if (shouldReset) setFormData(selectedTask ?? DEFAULT_FORM_DATA);
  }, [shouldReset, selectedTask]);

  function setField<K extends keyof TaskDTO>(key: K, value: TaskDTO[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    await (isEditing ? updateTask : createTask)(formData);
    onSubmit();
  }

  return (
    <View className="gap-6">
      <Field label="Task Name">
        <View className="bg-white border border-slate-200 rounded-2xl px-4 py-2 shadow-sm">
          <TextInput
            returnKeyType="done"
            placeholder="What do you need to do?"
            placeholderTextColor="#94a3b8"
            className="text-slate-800 text-base font-secondary font-medium"
            maxLength={80}
            value={formData.name}
            onChangeText={(value) => setField('name', value)}
          />
        </View>
      </Field>

      <View className="flex-row gap-3">
        <Field label="Due Date" className="flex-1">
          <DateTimePicker
            mode="date"
            value={formData.dueDate}
            onChange={(value) => setField('dueDate', value)}
          />
        </Field>

        <Field label="Reminder Time" className="flex-1">
          <DateTimePicker
            mode="time"
            value={formData.reminderTime}
            onChange={(value) => setField('reminderTime', value)}
          />
        </Field>
      </View>

      <Field label="Recurrence">
        <RecurrencePicker
          value={formData.recurrence!}
          onChange={(value) => setField('recurrence', value)}
        />
      </Field>

      <Field label="Color">
        <ColorPicker
          value={formData.color!}
          onChange={(value) => setField('color', value)}
        />
      </Field>

      <SubmitButton
        isValid={isValid}
        isEditing={isEditing}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

function Field({
  label,
  className,
  children,
}: DefaultProps & { label: string }) {
  return (
    <View className={cn('gap-2', className)}>
      <Text className="text-slate-500 text-xs font-semibold font-secondary uppercase tracking-widest ml-1">
        {label}
      </Text>

      {children}
    </View>
  );
}

function SubmitButton({ isValid, isEditing, handleSubmit }: SubmitButtonProps) {
  const Icon = isEditing ? Check : Plus;

  return (
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
        <Icon size={18} color="#fff" strokeWidth={2.5} />

        <Text className="text-white font-bold text-base font-primary">
          {isEditing ? 'Save Changes' : 'Add Task'}
        </Text>
      </AppGradient>
    </Pressable>
  );
}

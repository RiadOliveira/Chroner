import type { TaskDTO } from '@/types/Task';

import { Check, Plus } from 'lucide-react-native';
import { View, Text, Pressable } from 'react-native';
import { COLOR } from '@/types/Color';
import { RECURRENCE } from '@/types/Recurrence';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { useTasks } from '@/hooks/tasks';
import { useEffect, useState } from 'react';

import AppGradient from '../AppGradient';
import Field from '../field/Base';
import Input from '../field/Input';
import DateTimePicker from '../field/DateTime';
import RecurrencePicker from '../field/Recurrence';
import ColorPicker from '../field/Color';

type SubmitButtonProps = {
  isValid: boolean;
  isCreating: boolean;
  handleSubmit(): Promise<void>;
};

const DEFAULT_FORM_DATA: TaskDTO = {
  name: '',
  recurrence: RECURRENCE.NONE,
  color: COLOR.BLUE,
} as const;

export default function TaskForm({ onSubmit }: { onSubmit(): void }) {
  const { tasks, selectedIndex, createTask, updateTask } = useTasks();
  const [formData, setFormData] = useState<TaskDTO>(DEFAULT_FORM_DATA);

  const isValid = formData.name.length > 0;
  const isCreating = selectedIndex === CREATE_TASK_INDEX;

  useEffect(() => {
    if (selectedIndex === undefined) return;
    setFormData(tasks[selectedIndex] ?? DEFAULT_FORM_DATA);
  }, [selectedIndex, tasks]);

  function setField<K extends keyof TaskDTO>(key: K, value: TaskDTO[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    await (isCreating ? createTask : updateTask)(formData);
    onSubmit();
  }

  return (
    <View className="gap-6">
      <Field label="Task Name">
        <Input
          placeholder="What do you need to do?"
          maxLength={80}
          value={formData.name}
          onChangeText={(value) => setField('name', value)}
        />
      </Field>

      <View className="flex-row gap-3">
        <Field label="Due Date" className="flex-1">
          <DateTimePicker
            mode="date"
            value={formData.dueDate}
            onChange={(value) => {
              setField('dueDate', value);
              if (!value) setField('reminderTime', undefined);
            }}
          />
        </Field>

        <Field label="Reminder Time" className="flex-1">
          <DateTimePicker
            mode="time"
            disabled={!formData.dueDate}
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
        isCreating={isCreating}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

function SubmitButton({
  isValid,
  isCreating,
  handleSubmit,
}: SubmitButtonProps) {
  const Icon = isCreating ? Plus : Check;

  return (
    <Pressable
      onPress={handleSubmit}
      disabled={!isValid}
      className="rounded-2xl overflow-hidden mt-2"
      style={{ opacity: isValid ? 1 : 0.5 }}
    >
      <AppGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-row items-center justify-center gap-2 py-4"
      >
        <Icon size={18} color="#fff" strokeWidth={2.5} />

        <Text className="text-white font-bold text-base font-primary">
          {isCreating ? 'Add Task' : 'Save Changes'}
        </Text>
      </AppGradient>
    </Pressable>
  );
}

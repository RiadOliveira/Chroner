import type { TaskDTO } from '@/types/Task';

import { COLOR } from '@/types/Color';
import { RECURRENCE } from '@/types/Recurrence';
import { type TextInput, View } from 'react-native';
import { useTasks } from '@/hooks/tasks';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';

import Field from '@/components/field/Base';
import Input from '@/components/field/Input';
import DateTimePicker from '@/components/field/DateTime';
import RecurrencePicker from '@/components/field/Recurrence';
import ColorPicker from '@/components/field/Color';
import SubmitButton from './SubmitButton';

type Props = {
  isCreating: boolean;
  onSubmit(): void;
};

const DEFAULT_FORM_DATA: TaskDTO = {
  name: '',
  recurrence: RECURRENCE.NONE,
  color: COLOR.BLUE,
} as const;

export default function TaskForm({ isCreating, onSubmit }: Props) {
  const { t } = useTranslation();
  const { tasks, selectedIndex, createTask, updateTask } = useTasks();

  const [formData, setFormData] = useState<TaskDTO>(DEFAULT_FORM_DATA);
  const inputRef = useRef<TextInput>(null);
  const isValid = formData.name.length > 0;

  useEffect(() => {
    const timer = setTimeout(
      () => isCreating && inputRef.current?.focus(),
      180,
    );
    return () => clearTimeout(timer);
  }, [isCreating]);

  useEffect(() => {
    if (selectedIndex === undefined) return;
    setFormData(tasks[selectedIndex] ?? DEFAULT_FORM_DATA);
  }, [selectedIndex, tasks]);

  function setField<K extends keyof TaskDTO>(key: K, value: TaskDTO[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function onDateFieldChange(value?: string | null) {
    setField('dueDate', value);

    if (value) {
      if (!formData.dueDate) setField('reminderTime', '00:00');
      return;
    }

    setField('reminderTime', null);
    setField('recurrence', RECURRENCE.NONE);
  }

  async function handleSubmit() {
    await (isCreating ? createTask : updateTask)(formData);
    onSubmit();
  }

  return (
    <View className="gap-6">
      <Field label={t('fields.name.label')}>
        <Input
          ref={inputRef}
          placeholder={t('fields.name.placeholder')}
          maxLength={80}
          value={formData.name}
          onChangeText={(value) => setField('name', value)}
        />
      </Field>

      <View className="flex-row gap-3">
        <Field label={t('fields.date.label')}>
          <DateTimePicker
            mode="date"
            value={formData.dueDate}
            onChange={onDateFieldChange}
          />
        </Field>

        <Field label={t('fields.time.label')} className="max-w-[44%]">
          <DateTimePicker
            mode="time"
            disabled={!formData.dueDate}
            value={formData.reminderTime}
            onChange={(value) => setField('reminderTime', value)}
          />
        </Field>
      </View>

      <Field label={t('fields.recurrence.label')}>
        <RecurrencePicker
          disabled={!formData.dueDate}
          value={formData.recurrence!}
          onChange={(value) => setField('recurrence', value)}
        />
      </Field>

      <Field label={t('fields.color.label')}>
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

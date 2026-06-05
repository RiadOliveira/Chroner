import { COLOR, HEX_COLOR } from '@/types/Color';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { Trash2, Check } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { useTasks } from '@/hooks/tasks';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import TaskForm from '../task/form';
import AppIcon from '../decoration/AppIcon';
import BaseModal from './Base';

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
    <BaseModal
      visible={visible}
      onClose={onClose}
      header={{
        title: t(`form.title_${creating ? 'create' : 'edit'}`),
        icon: (
          <AppIcon
            tintColor={HEX_COLOR[COLOR.PURPLE]}
            style={{ width: 18, height: 18 }}
          />
        ),
        extraButtons: !creating && (
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
        ),
      }}
    >
      <TaskForm isCreating={creating} onSubmit={onClose} />
    </BaseModal>
  );
}

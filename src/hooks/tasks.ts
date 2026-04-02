import type { Task, TaskDTO } from '@/types/Task';
import type { TaskNotificationData } from '@/types/TaskNotificationData';

import { fetchTasks } from '@/utils/fetchTasks';
import { useEffect, useState } from 'react';
import { TASK_SERVICES } from '@/lib/taskServices';

import notifee from '@notifee/react-native';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const selectedTask = selectedIndex === -1 ? undefined : tasks[selectedIndex];

  useEffect(() => {
    async function handleInitialLoad() {
      const tasksFound = await fetchTasks();
      setTasks(tasksFound);

      const detail = await notifee.getInitialNotification();
      if (detail === null) return;

      const { taskId } = detail.notification.data as TaskNotificationData;
      const initialIndex = tasksFound.findIndex(({ id }) => id === taskId);

      if (initialIndex !== -1) setSelectedIndex(initialIndex);
    }

    handleInitialLoad();
  }, []);

  function selectTaskByIndex(index: number) {
    setSelectedIndex(index);
  }

  function selectTaskById(id: number) {
    const indexFound = tasks.findIndex(({ id: taskId }) => taskId === id);
    if (indexFound !== -1) setSelectedIndex(indexFound);
  }

  function reloadTasks() {
    return fetchTasks().then(setTasks);
  }

  async function createTask(task: TaskDTO) {
    await TASK_SERVICES.create(task);
    return reloadTasks();
  }

  async function updateTask(task: TaskDTO) {
    const current = tasks.find(({ id }) => id === task.id)!;

    await TASK_SERVICES.update(current, task);
    return reloadTasks();
  }

  async function deleteTask(task: Task) {
    await TASK_SERVICES.delete(task);
    return reloadTasks();
  }

  async function completeTask(task: Task) {
    await TASK_SERVICES.complete(task);
    return reloadTasks();
  }

  return {
    tasks,
    selectedTask,
    selectTaskById,
    selectTaskByIndex,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
  } as const;
}

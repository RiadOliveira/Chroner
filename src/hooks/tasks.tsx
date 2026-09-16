import type { DefaultProps } from '@/types/DefaultProps';
import type { Task, TaskDTO } from '@/types/Task';
import type { TaskNotificationData } from '@/types/TaskNotificationData';

import { COLOR } from '@/types/Color';
import { TASK_SERVICES } from '@/lib/tasks';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { showToast } from '@/utils/showToast';
import { fetchTasks } from '@/utils/fetchTasks';
import { createContext, useContext, useEffect, useState } from 'react';

import notifee from 'react-native-notify-kit';
import i18n from '@/config/i18n';
import { countOverdueTasks, countTaskNotifications } from '@/utils/counting';

type TasksContextType = {
  tasks: Task[];
  selectedIndex: number | undefined;
  selectTask(id: number | undefined): void;
  createTask(task: TaskDTO): Promise<void>;
  updateTask(task: TaskDTO): Promise<void>;
  deleteTask(task: Task): Promise<void>;
  completeTask(task: Task): Promise<void>;
  onForegroundTaskComplete(): Promise<void>;
  resetAllSchedulings(): Promise<void>;
};

const tasksContext = createContext<TasksContextType>({} as TasksContextType);

export function TasksContext({ children }: DefaultProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    async function handleInitialLoad() {
      const tasksFound = await fetchTasks();

      setTasks(tasksFound);
      handleNotificationsReload(tasksFound);

      const detail = await notifee.getInitialNotification();
      if (detail === null) return;

      const { notification } = detail;
      const { taskId } = notification.data as TaskNotificationData;

      const initialIndex = tasksFound.findIndex(({ id }) => id === taskId);
      if (initialIndex === -1) return;

      const { notificationId: currentId } = tasksFound[initialIndex];
      if (notification.id === currentId) setSelectedIndex(initialIndex);
    }

    handleInitialLoad();
  }, []);

  function selectTask(id: number | undefined) {
    if (id === undefined || id === CREATE_TASK_INDEX) {
      return setSelectedIndex(id);
    }

    const indexFound = tasks.findIndex(({ id: taskId }) => taskId === id);
    if (indexFound !== -1) setSelectedIndex(indexFound);
  }

  function reloadTasks() {
    return fetchTasks().then(setTasks);
  }

  async function createTask(task: TaskDTO) {
    await TASK_SERVICES.create(task);

    showToast({ message: i18n.t('toast.created'), color: COLOR.BLUE });
    return reloadTasks();
  }

  async function updateTask(task: TaskDTO) {
    const current = tasks.find(({ id }) => id === task.id)!;
    await TASK_SERVICES.update(current, task);

    showToast({ message: i18n.t('toast.updated'), color: COLOR.PURPLE });
    return reloadTasks();
  }

  async function deleteTask(task: Task) {
    await TASK_SERVICES.delete(task);

    showToast({ message: i18n.t('toast.deleted'), color: COLOR.RED });
    return reloadTasks();
  }

  async function onForegroundTaskComplete() {
    showToast({ message: i18n.t('toast.completed'), color: COLOR.EMERALD });
    return reloadTasks();
  }

  async function completeTask(task: Task) {
    await TASK_SERVICES.complete(task);
    return onForegroundTaskComplete();
  }

  return (
    <tasksContext.Provider
      value={{
        tasks,
        selectedIndex,
        selectTask,
        createTask,
        updateTask,
        deleteTask,
        completeTask,
        onForegroundTaskComplete,
        resetAllSchedulings: TASK_SERVICES.resetAllSchedulings,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(tasksContext);
}

async function handleNotificationsReload(tasks: Task[]) {
  const overdueTaskCount = countOverdueTasks(tasks);
  if (overdueTaskCount === 0) return;

  const notifications = await notifee.getDisplayedNotifications();
  const taskNotificationCount = countTaskNotifications(notifications);

  const countsMatch = overdueTaskCount === taskNotificationCount;
  if (!countsMatch) return TASK_SERVICES.resetAllSchedulings();
}

import type { DefaultProps } from '@/types/DefaultProps';
import type { Task, TaskDTO } from '@/types/Task';
import type { TaskNotificationData } from '@/types/TaskNotificationData';

import { COLOR } from '@/types/Color';
import { TASK_SERVICES } from '@/lib/taskServices';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { showToast } from '@/lib/showToast';
import { fetchTasks } from '@/utils/fetchTasks';
import { createContext, useContext, useEffect, useState } from 'react';

import notifee from 'react-native-notify-kit';

type TasksContextType = {
  tasks: Task[];
  selectedIndex: number | undefined;
  selectTask(id: number | undefined): void;
  createTask(task: TaskDTO): Promise<void>;
  updateTask(task: TaskDTO): Promise<void>;
  deleteTask(task: Task): Promise<void>;
  completeTask(task: Task): Promise<void>;
  completeTaskById(id: number): Promise<void>;
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

    showToast({ message: 'Task Created', color: COLOR.BLUE });
    return reloadTasks();
  }

  async function updateTask(task: TaskDTO) {
    const current = tasks.find(({ id }) => id === task.id)!;
    await TASK_SERVICES.update(current, task);

    showToast({ message: 'Task Updated', color: COLOR.PURPLE });
    return reloadTasks();
  }

  async function deleteTask(task: Task) {
    await TASK_SERVICES.delete(task);

    showToast({ message: 'Task Deleted', color: COLOR.RED });
    return reloadTasks();
  }

  async function completeTask(task: Task) {
    await TASK_SERVICES.complete(task);

    showToast({ message: 'Task Completed', color: COLOR.EMERALD });
    return reloadTasks();
  }

  async function completeTaskById(id: number) {
    const taskFound = tasks.find(({ id: taskId }) => taskId === id);
    if (taskFound !== undefined) return completeTask(taskFound);
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
        completeTaskById,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(tasksContext);
}

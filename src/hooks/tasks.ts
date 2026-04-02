import type { Task, TaskDTO } from '@/types/Task';

import { fetchTasks } from '@/utils/fetchTasks';
import { useEffect, useState } from 'react';
import { TASK_SERVICES } from '@/lib/taskServices';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function loadTasks() {
    return fetchTasks().then(setTasks);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function createTask(task: TaskDTO) {
    await TASK_SERVICES.create(task);
    return loadTasks();
  }

  async function updateTask(task: TaskDTO) {
    const current = tasks.find(({ id }) => id === task.id)!;

    await TASK_SERVICES.update(current, task);
    return loadTasks();
  }

  async function deleteTask(task: Task) {
    await TASK_SERVICES.delete(task);
    return loadTasks();
  }

  async function completeTask(task: Task) {
    await TASK_SERVICES.complete(task);
    return loadTasks();
  }

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
  } as const;
}

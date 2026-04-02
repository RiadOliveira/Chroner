import type { Task, TaskDTO } from '@/types/Task';
import type { RepeatFrequency } from '@notifee/react-native';

import {
  RECURRENCE,
  RECURRENCE_DURATION,
  RECURRENCES_WITHOUT_NOTIFEE_SUPPORT,
} from '@/types/Recurrence';
import { db } from '@/db/database';
import { eq } from 'drizzle-orm';
import { add } from 'date-fns';
import { fetchTasks } from '@/utils/fetchTasks';
import { tasksTable } from '@/db/schema';
import { joinDateTime } from '@/utils/date';
import { useEffect, useState } from 'react';
import { cancelNotification, scheduleNotification } from '@/lib/notifications';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function loadTasks() {
    return fetchTasks().then(setTasks);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function createTask(task: TaskDTO) {
    const notificationId = await handleTaskScheduling(task);
    await db.insert(tasksTable).values({ ...task, notificationId });

    return loadTasks();
  }

  async function updateTask(task: TaskDTO) {
    const current = tasks.find(({ id }) => id === task.id)!;

    const notificationId = await handleSchedulingUpdate(current, task);
    await saveTask({ ...task, notificationId });

    return loadTasks();
  }

  async function deleteTask(task: Task) {
    await cancelNotification(task.notificationId);
    await db.delete(tasksTable).where(eq(tasksTable.id, task.id));

    return loadTasks();
  }

  async function completeTask(task: Task) {
    if (task.recurrence === RECURRENCE.NONE) return deleteTask(task);
    await cancelNotification(task.notificationId);

    const notificationId = await handleTaskScheduling(task);
    await saveTask({ ...task, notificationId });

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

function handleTaskScheduling({
  name,
  dueDate,
  reminderTime,
  recurrence = RECURRENCE.NONE,
}: TaskDTO) {
  if (!reminderTime || recurrence === RECURRENCE.NONE) return undefined;

  const dateTime = joinDateTime(dueDate!, reminderTime);
  const date = add(dateTime, RECURRENCE_DURATION[recurrence]);

  const repeatFrequency = (
    RECURRENCES_WITHOUT_NOTIFEE_SUPPORT.includes(recurrence)
      ? RECURRENCE.NONE
      : recurrence
  ) as RepeatFrequency;

  return scheduleNotification({
    title: 'Chrono Triggered!',
    body: `It's time to ${name}`,
    date,
    repeatFrequency,
  });
}

async function handleSchedulingUpdate(current: Task, updated: TaskDTO) {
  const schedulingFields: (keyof Task)[] = [
    'dueDate',
    'reminderTime',
    'recurrence',
  ] as const;

  const hasChanged = schedulingFields.some(
    (field) => current[field] !== updated[field],
  );
  if (!hasChanged) return current.notificationId;

  await cancelNotification(current.notificationId);
  return handleTaskScheduling(updated);
}

function saveTask(task: TaskDTO) {
  const whereSql = eq(tasksTable.id, task.id!);
  return db.update(tasksTable).set(task).where(whereSql);
}

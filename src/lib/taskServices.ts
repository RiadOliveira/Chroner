import type { Task, TaskDTO } from '@/types/Task';
import type { TaskNotificationData } from '@/types/TaskNotificationData';

import {
  RECURRENCE,
  RECURRENCE_DURATION,
  RECURRENCES_WITHOUT_NOTIFEE_SUPPORT,
} from '@/types/Recurrence';
import { db } from '@/db/database';
import { eq } from 'drizzle-orm';
import { add } from 'date-fns';
import { tasksTable } from '@/db/schema';
import { joinDateTime } from '@/utils/date';
import { scheduleNotification, cancelNotification } from './notifications';
import { RepeatFrequency } from '@notifee/react-native';

export const TASK_SERVICES = {
  async findById(id: number): Promise<Task | null> {
    const whereSql = eq(tasksTable.id, id);
    const result = await db.select().from(tasksTable).where(whereSql);

    return result[0] ?? null;
  },

  async create(task: TaskDTO) {
    const { lastInsertRowId: id } = await db.insert(tasksTable).values(task);
    const createdTask: TaskDTO = { ...task, id } as const;

    const notificationId = await handleTaskScheduling(createdTask);
    return saveTask({ ...createdTask, notificationId });
  },

  async update(current: Task, updated: TaskDTO) {
    const notificationId = await handleSchedulingUpdate(current, updated);
    return saveTask({ ...updated, notificationId });
  },

  async delete(task: Task) {
    await cancelNotification(task.notificationId);
    return deleteTask(task);
  },

  async complete(task: Task) {
    await cancelNotification(task.notificationId);
    if (task.recurrence === RECURRENCE.NONE) return deleteTask(task);

    const notificationId = await handleTaskScheduling(task);
    await saveTask({ ...task, notificationId });
  },
} as const;

function handleTaskScheduling({
  id,
  name,
  dueDate,
  reminderTime,
  recurrence = RECURRENCE.NONE,
}: TaskDTO) {
  if (!reminderTime) return undefined;

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
    data: { taskId: id! } as TaskNotificationData,
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

async function saveTask(task: TaskDTO) {
  const whereSql = eq(tasksTable.id, task.id!);
  await db.update(tasksTable).set(task).where(whereSql);
}

async function deleteTask(task: Task) {
  await db.delete(tasksTable).where(eq(tasksTable.id, task.id));
}

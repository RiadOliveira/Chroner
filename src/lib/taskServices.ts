import type { Task, TaskDTO } from '@/types/Task';
import type { TaskNotificationData } from '@/types/TaskNotificationData';

import {
  RECURRENCE,
  RECURRENCE_DURATION,
  RECURRENCES_WITHOUT_NOTIFEE_SUPPORT,
} from '@/types/Recurrence';
import { db } from '@/db/database';
import { eq } from 'drizzle-orm';
import { add, format } from 'date-fns';
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

    const schedulingData = await scheduleTask(createdTask);
    return saveTask({ ...createdTask, ...schedulingData });
  },

  async update(current: Task, updated: TaskDTO) {
    const schedulingData = await handleSchedulingUpdate(current, updated);
    return saveTask({ ...updated, ...schedulingData });
  },

  async delete(task: Task) {
    await cancelNotification(task.notificationId);
    return deleteTask(task);
  },

  async complete(task: Task) {
    await cancelNotification(task.notificationId);
    if (task.recurrence === RECURRENCE.NONE) return deleteTask(task);

    const schedulingData = await scheduleTask(task);
    await saveTask({ ...task, ...schedulingData });
  },
} as const;

async function scheduleTask({
  id,
  name,
  reminderTime,
  dueDate: currentDueDate,
  notificationId: currentNotificationId,
  recurrence = RECURRENCE.NONE,
}: TaskDTO) {
  if (!reminderTime) return undefined;

  const dateTime = joinDateTime(currentDueDate!, reminderTime);
  const shouldReschedule = currentNotificationId !== undefined;

  const date = shouldReschedule
    ? add(dateTime, RECURRENCE_DURATION[recurrence])
    : dateTime;

  const repeatFrequency = (
    RECURRENCES_WITHOUT_NOTIFEE_SUPPORT.includes(recurrence)
      ? RECURRENCE.NONE
      : recurrence
  ) as RepeatFrequency;

  const dueDate = format(date, 'yyyy-MM-dd');
  const notificationId = await scheduleNotification({
    title: 'Chrono Triggered!',
    body: `It's time to ${name}`,
    date,
    repeatFrequency,
    data: { taskId: id! } as TaskNotificationData,
  });

  return { dueDate, notificationId };
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
  if (!hasChanged) return undefined;

  await cancelNotification(current.notificationId);
  return scheduleTask({ ...updated, notificationId: undefined });
}

async function saveTask(task: TaskDTO) {
  const whereSql = eq(tasksTable.id, task.id!);
  await db.update(tasksTable).set(task).where(whereSql);
}

async function deleteTask(task: Task) {
  await db.delete(tasksTable).where(eq(tasksTable.id, task.id));
}

import type { Task, TaskDTO } from '@/types/Task';
import type { TaskNotificationData } from '@/types/TaskNotificationData';

import { RECURRENCE, RECURRENCE_DURATION } from '@/types/Recurrence';
import { db } from '@/db/database';
import { eq } from 'drizzle-orm';
import { add, format } from 'date-fns';
import { tasksTable } from '@/db/schema';
import { formatTime, joinDateTime } from '@/utils/date';
import {
  scheduleNotification,
  cancelNotification,
  cancelAllNotifications,
} from './notifications';

import i18n from '@/config/i18n';

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
    return saveTask({ ...task, ...schedulingData });
  },

  async resetAllSchedulings() {
    await cancelAllNotifications();

    const allTasks = await db.select().from(tasksTable);
    await Promise.all(
      allTasks.map(async ({ notificationId: _, ...task }) => {
        const schedulingData = await scheduleTask(task);
        return saveTask({ ...task, ...schedulingData });
      }),
    );
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
  if (!currentDueDate) return undefined;

  const dateTime = joinDateTime(currentDueDate!, reminderTime ?? undefined);
  const duration = RECURRENCE_DURATION[recurrence];

  const shouldReschedule = currentNotificationId !== undefined;
  const date = shouldReschedule ? add(dateTime, duration) : dateTime;

  const dueDate = format(date, 'yyyy-MM-dd');
  if (!reminderTime) return { dueDate };

  const time = formatTime(reminderTime);
  const notificationId = await scheduleNotification({
    date,
    title: i18n.t('notification.title', { time }),
    body: `${i18n.t('notification.bodyPrefix')} ${name}`,
    data: { taskId: id! } as TaskNotificationData,
  });

  return { dueDate, notificationId };
}

async function handleSchedulingUpdate(current: Task, updated: TaskDTO) {
  const dateFields: (keyof Task)[] = ['dueDate', 'reminderTime'] as const;
  const changed = dateFields.some((field) => current[field] !== updated[field]);
  if (!changed) return undefined;

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

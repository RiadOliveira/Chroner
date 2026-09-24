import type { Task } from '@/types/Task';
import type { Notification } from 'react-native-notify-kit';

import { FOREGROUND_SERVICE_ID } from '@/constants/notificationProps';
import { isOverdue } from './date';

const EMPTY_ID = '0';

export function countTaskNotifications(notifications: Notification[]) {
  return notifications.reduce((acc, item) => {
    return acc + Number(isTaskNotification(item));
  }, 0);
}

export function hasTaskNotification(notifications: Notification[]) {
  return notifications.some(isTaskNotification);
}

export function countOverdueTasks(tasks: Task[]) {
  return tasks.reduce((acc, { dueDate, reminderTime }) => {
    return acc + Number(isOverdue(dueDate, reminderTime));
  }, 0);
}

function isTaskNotification({ id }: Notification) {
  return id !== EMPTY_ID && id !== FOREGROUND_SERVICE_ID;
}

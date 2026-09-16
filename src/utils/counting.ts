import type { Task } from '@/types/Task';
import type { DisplayedNotification } from 'react-native-notify-kit';

import { FOREGROUND_SERVICE_ID } from '@/constants/notificationProps';
import { isOverdue } from './date';

const EMPTY_ID = '0';

export function countTaskNotifications(notifications: DisplayedNotification[]) {
  return notifications.reduce((acc, { id }) => {
    const isValid = id !== EMPTY_ID && id !== FOREGROUND_SERVICE_ID;
    return acc + Number(isValid);
  }, 0);
}

export function countOverdueTasks(tasks: Task[]) {
  return tasks.reduce((acc, { dueDate, reminderTime }) => {
    return acc + Number(isOverdue(dueDate, reminderTime));
  }, 0);
}

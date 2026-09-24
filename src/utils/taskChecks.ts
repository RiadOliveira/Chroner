import type { Task } from '@/types/Task';
import type {
  Notification,
  TriggerNotification,
} from 'react-native-notify-kit';

import { FOREGROUND_SERVICE_ID } from '@/constants/notificationProps';
import { isOverdue } from './date';

const EMPTY_ID = '0';

export function countTaskNotifications(items: Notification[]) {
  return items.reduce((acc, item) => {
    return acc + Number(isTaskNotification(item));
  }, 0);
}

export function hasTaskNotification(items: Notification[]) {
  return items.some(isTaskNotification);
}

export function hasTriggerTaskNotification(items: TriggerNotification[]) {
  return items.some(isTriggerTaskNotification);
}

export function countOverdueTasks(items: Task[]) {
  return items.reduce((acc, { dueDate, reminderTime }) => {
    return acc + Number(isOverdue(dueDate, reminderTime));
  }, 0);
}

function isTriggerTaskNotification({ notification }: TriggerNotification) {
  return isTaskNotification(notification);
}

function isTaskNotification({ id }: Notification) {
  return id !== EMPTY_ID && id !== FOREGROUND_SERVICE_ID;
}

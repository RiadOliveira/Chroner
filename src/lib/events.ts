import type { TaskNotificationData } from '@/types/TaskNotificationData';

import { PRESS_ACTION } from '@/types/PressAction';
import { TASK_SERVICES } from './taskServices';

import notifee, { type Event, EventType } from '@notifee/react-native';
import { displayNotification } from './notifications';

export function setOnForegroundEvent() {
  notifee.onForegroundEvent(handleEvent);
}

export function setOnBackgroundEvent() {
  notifee.onBackgroundEvent(handleEvent);
}

async function handleEvent({
  type,
  detail: { notification, pressAction },
}: Event) {
  const { taskId } = notification?.data as TaskNotificationData;

  if (type === EventType.DISMISSED) {
    const { title, body } = notification!;
    await displayNotification({ title, body, data: { taskId } });
    return;
  }
  if (pressAction?.id !== PRESS_ACTION.COMPLETE) return;

  const task = await TASK_SERVICES.findById(taskId);
  if (task !== null) await TASK_SERVICES.complete(task);
}

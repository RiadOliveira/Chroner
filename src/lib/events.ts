import type { TaskNotificationData } from '@/types/TaskNotificationData';

import { PRESS_ACTION } from '@/types/PressAction';
import { TASK_SERVICES } from './tasks';

import notifee, { type Event, EventType } from 'react-native-notify-kit';
import { setupI18n } from '@/config/i18n';
import {
  cancelNotification,
  displayNotification,
  syncForegroundService,
} from './notifications';
import { FOREGROUND_SERVICE_ID } from '@/constants/notificationProps';

type ForegroundProps = {
  selectTask(id: number): void;
  onForegroundTaskComplete(): Promise<void>;
};

export function setOnForegroundEvent(props: ForegroundProps) {
  return notifee.onForegroundEvent((event) =>
    handleEvent({ ...event, ...props }),
  );
}

export function setOnBackgroundEvent() {
  return notifee.onBackgroundEvent(handleEvent);
}

async function handleEvent({
  type,
  detail: { notification, pressAction },
  selectTask,
  onForegroundTaskComplete,
}: Event & Partial<ForegroundProps>) {
  setupI18n();

  if (type === EventType.DISMISSED) {
    await displayNotification(notification!);
    return;
  }

  if (type === EventType.DELIVERED) {
    const isServiceNotification = notification?.id === FOREGROUND_SERVICE_ID;
    if (!isServiceNotification) await syncForegroundService();

    return;
  }

  const actionId = pressAction?.id;
  const { taskId } = notification?.data as TaskNotificationData;

  if (actionId === PRESS_ACTION.DEFAULT) return selectTask?.(taskId);
  if (actionId !== PRESS_ACTION.COMPLETE) return;

  const taskFound = await TASK_SERVICES.findById(taskId);
  if (taskFound === null) return cancelNotification(notification?.id);

  await TASK_SERVICES.complete(taskFound);
  return onForegroundTaskComplete?.();
}

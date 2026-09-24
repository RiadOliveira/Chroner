import type { TaskNotificationData } from '@/types/TaskNotificationData';

import notifee, { type Event, EventType } from 'react-native-notify-kit';

import { PRESS_ACTION } from '@/types/PressAction';
import { TASK_SERVICES } from './tasks';
import { setupI18n } from '@/config/i18n';
import { cancelNotification, displayNotification } from './notifications';

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
  if (type === EventType.DISMISSED) {
    await displayNotification(notification!);
    return;
  }

  const actionId = pressAction?.id;
  const { taskId } = notification?.data as TaskNotificationData;

  if (actionId === PRESS_ACTION.DEFAULT) return selectTask?.(taskId);
  if (actionId !== PRESS_ACTION.COMPLETE) return;

  const taskFound = await TASK_SERVICES.findById(taskId);
  if (taskFound === null) return cancelNotification(notification?.id);

  setupI18n();
  await TASK_SERVICES.complete(taskFound);
  return onForegroundTaskComplete?.();
}

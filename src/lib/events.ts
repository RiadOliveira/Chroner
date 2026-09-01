import type { TaskNotificationData } from '@/types/TaskNotificationData';

import { PRESS_ACTION } from '@/types/PressAction';
import { TASK_SERVICES } from './tasks';

import notifee, { type Event, EventType } from 'react-native-notify-kit';
import { setupI18n } from '@/config/i18n';
import { cancelNotification, displayNotification } from './notifications';

type ForegroundProps = {
  selectTask(id: number): void;
  completeTaskById(id: number): Promise<void>;
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
  completeTaskById,
}: Event & Partial<ForegroundProps>) {
  if (type === EventType.DISMISSED) {
    await displayNotification(notification!);
    return;
  }

  const actionId = pressAction?.id;
  const { taskId } = notification?.data as TaskNotificationData;

  if (actionId === PRESS_ACTION.DEFAULT) return selectTask?.(taskId);
  if (actionId !== PRESS_ACTION.COMPLETE) return;

  const isForeground = !!completeTaskById;
  if (isForeground) return completeTaskById(taskId);

  const taskFound = await TASK_SERVICES.findById(taskId);
  if (taskFound === null) return cancelNotification(notification?.id);

  setupI18n();
  return TASK_SERVICES.complete(taskFound);
}

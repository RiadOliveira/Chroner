import type { TaskNotificationData } from '@/types/TaskNotificationData';

import { PRESS_ACTION } from '@/types/PressAction';
import { TASK_SERVICES } from './taskServices';

import notifee, { type Event, EventType } from '@notifee/react-native';
import { displayNotification } from './notifications';

type ForegroundProps = {
  selectTaskById(id: number): void;
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
  selectTaskById,
  completeTaskById,
}: Event & Partial<ForegroundProps>) {
  const { taskId } = notification?.data as TaskNotificationData;

  if (type === EventType.DISMISSED) {
    const { title, body } = notification!;
    await displayNotification({ title, body, data: { taskId } });
    return;
  }

  const actionId = pressAction?.id;
  if (actionId === PRESS_ACTION.DEFAULT) return selectTaskById?.(taskId);
  if (actionId !== PRESS_ACTION.COMPLETE) return;

  if (completeTaskById) return completeTaskById(taskId);
  const task = await TASK_SERVICES.findById(taskId);
  if (task !== null) await TASK_SERVICES.complete(task);
}

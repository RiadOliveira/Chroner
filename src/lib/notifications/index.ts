import notifee, {
  type Notification,
  TriggerType,
  AlarmType,
} from 'react-native-notify-kit';

import {
  CHANNEL_PROPS,
  NOTIFICATION_BASE_PROPS,
} from '@/constants/notificationProps';
import { PRESS_ACTION } from '@/types/PressAction';
import { isPast } from 'date-fns';
import { syncNotificationService } from './service';

import i18n from '@/config/i18n';

type NotificationProps = {
  id?: string;
  title?: string;
  body?: string;
  data?: Notification['data'];
};
type SchedulingProps = NotificationProps & { date: Date };

export function registerForegroundService() {
  return notifee.registerForegroundService(() => new Promise(() => {}));
}

export function setupNotifications() {
  return notifee.requestPermission();
}

export async function displayNotification(props: NotificationProps) {
  const notification = await generateNotification(props);
  return notifee.displayNotification(notification);
}

export async function scheduleNotification(props: SchedulingProps) {
  const notificationId = await handleNotificationScheduling(props);
  await syncNotificationService();

  return notificationId;
}

export async function cancelNotification(notificationId?: string | null) {
  if (!notificationId) return;

  await notifee.cancelNotification(notificationId);
  return syncNotificationService();
}

export async function cancelAllNotifications() {
  await notifee.cancelAllNotifications();
  return syncNotificationService();
}

async function generateNotification(props: NotificationProps) {
  const channelId = await notifee.createChannel(CHANNEL_PROPS.default);

  return {
    ...props,
    android: {
      ...NOTIFICATION_BASE_PROPS.default,
      channelId,
      actions: [
        {
          title: i18n.t('notification.completeAction'),
          pressAction: {
            id: PRESS_ACTION.COMPLETE,
            launchActivity: undefined,
          },
        },
      ],
    },
  } as Notification;
}

async function handleNotificationScheduling({
  date,
  ...props
}: SchedulingProps) {
  if (isPast(date)) return displayNotification(props);

  const notification = await generateNotification(props);
  return notifee.createTriggerNotification(notification, {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    alarmManager: { type: AlarmType.SET_ALARM_CLOCK },
  });
}

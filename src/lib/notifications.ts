import notifee, {
  type Notification,
  TriggerType,
  AlarmType,
} from 'react-native-notify-kit';
import {
  CHANNEL_PROPS,
  FOREGROUND_SERVICE_ID,
  NOTIFICATION_BASE_PROPS,
} from '@/constants/notificationProps';
import { PRESS_ACTION } from '@/types/PressAction';
import { isPast } from 'date-fns';

import i18n from '@/config/i18n';

type NotificationProps = {
  id?: string;
  title?: string;
  body?: string;
  data?: Notification['data'];
};

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

export async function syncForegroundService() {
  const notifications = await notifee.getDisplayedNotifications();
  const isActive = notifications.some(({ id }) => id === FOREGROUND_SERVICE_ID);

  const count = notifications.length - Number(isActive);
  const hasNotifications = count > 0;

  if (hasNotifications && !isActive) return displayForegroundService(count);
  if (!hasNotifications && isActive) return notifee.stopForegroundService();
}

export async function scheduleNotification({
  date,
  ...props
}: NotificationProps & { date: Date }) {
  if (isPast(date)) {
    const notificationId = await displayNotification(props);
    await syncForegroundService();

    return notificationId;
  }

  const notification = await generateNotification(props);
  return notifee.createTriggerNotification(notification, {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    alarmManager: { type: AlarmType.SET_ALARM_CLOCK },
  });
}

export async function cancelNotification(notificationId?: string | null) {
  if (!notificationId) return;

  await notifee.cancelNotification(notificationId);
  await syncForegroundService();
}

export async function cancelAllNotifications() {
  await notifee.cancelAllNotifications();
  await syncForegroundService();
}

async function displayForegroundService(count: number) {
  const serviceNotification = await generateServiceNotification(count);
  return notifee.displayNotification(serviceNotification);
}

async function generateNotification(
  props: NotificationProps,
): Promise<Notification> {
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
  };
}

async function generateServiceNotification(
  count: number,
): Promise<Notification> {
  const channelId = await notifee.createChannel(
    CHANNEL_PROPS.foregroundService,
  );

  return {
    id: FOREGROUND_SERVICE_ID,
    title: i18n.t('notification.service.title'),
    body: i18n.t('notification.service.body', { count }),
    android: { ...NOTIFICATION_BASE_PROPS.foregroundService, channelId },
  };
}

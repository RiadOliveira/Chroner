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

import i18n from '@/config/i18n';

type NotificationProps = {
  id?: string;
  title?: string;
  body?: string;
  data?: Notification['data'];
};

export async function displayNotification(props: NotificationProps) {
  const notification = await generateNotification(props);
  return notifee.displayNotification(notification);
}

export async function scheduleNotification({
  date,
  ...props
}: NotificationProps & { date: Date }) {
  if (isPast(date)) return displayNotification(props);

  const notification = await generateNotification(props);
  return notifee.createTriggerNotification(notification, {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    alarmManager: { type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE },
  });
}

export async function cancelNotification(notificationId?: string | null) {
  if (notificationId) return notifee.cancelNotification(notificationId);
}

export async function cancelAllNotifications() {
  return notifee.cancelAllNotifications();
}

async function generateNotification(props: NotificationProps) {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel(CHANNEL_PROPS);

  return {
    ...props,
    android: {
      ...NOTIFICATION_BASE_PROPS,
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
  } as const satisfies Notification;
}

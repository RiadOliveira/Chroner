import notifee, { type Notification, TriggerType } from '@notifee/react-native';
import {
  CHANNEL_PROPS,
  NOTIFICATION_BASE_PROPS,
} from '@/constants/notificationProps';

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
  const notification = await generateNotification(props);

  return notifee.createTriggerNotification(notification, {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  });
}

export async function cancelNotification(notificationId?: string | null) {
  if (notificationId) return notifee.cancelNotification(notificationId);
}

async function generateNotification(props: NotificationProps) {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel(CHANNEL_PROPS);

  return {
    ...props,
    android: { ...NOTIFICATION_BASE_PROPS, channelId },
  } as const satisfies Notification;
}

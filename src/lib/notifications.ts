import notifee, { type Notification, TriggerType } from '@notifee/react-native';
import { CHANNEL_PROPS } from '@/constants/channel';

type NotificationProps = {
  title?: string;
  body?: string;
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

export async function cancelNotification(notificationId?: string) {
  if (notificationId) return notifee.cancelNotification(notificationId);
}

async function generateNotification(props: NotificationProps) {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel(CHANNEL_PROPS);

  return {
    ...props,
    android: {
      channelId,
      pressAction: { id: 'default' },
    },
  } as const satisfies Notification;
}

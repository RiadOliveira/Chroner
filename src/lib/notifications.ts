import notifee, {
  type Notification,
  RepeatFrequency,
  TriggerType,
} from '@notifee/react-native';
import {
  CHANNEL_PROPS,
  NOTIFICATION_BASE_PROPS,
} from '@/constants/notificationProps';

type NotificationProps = {
  title?: string;
  body?: string;
};

type ScheduleProps = {
  date: Date;
  repeatFrequency?: RepeatFrequency;
};

export async function displayNotification(props: NotificationProps) {
  const notification = await generateNotification(props);
  return notifee.displayNotification(notification);
}

export async function scheduleNotification({
  date,
  repeatFrequency,
  ...props
}: NotificationProps & ScheduleProps) {
  const notification = await generateNotification(props);

  return notifee.createTriggerNotification(notification, {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency,
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

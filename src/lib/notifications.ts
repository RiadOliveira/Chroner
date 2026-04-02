import notifee, {
  type Notification,
  type RepeatFrequency,
  TriggerType,
} from '@notifee/react-native';
import { type RecurrenceValue, RECURRENCE } from '@/types/Recurrence';
import { CHANNEL_PROPS } from '@/constants/channel';

type NotificationProps = {
  title?: string;
  body?: string;
};

type ScheduleProps = {
  date: Date;
  recurrence?: RecurrenceValue;
};

export async function displayNotification(props: NotificationProps) {
  const notification = await generateNotification(props);
  return notifee.displayNotification(notification);
}

export async function scheduleNotification({
  date,
  recurrence = RECURRENCE.NONE,
  ...props
}: NotificationProps & ScheduleProps) {
  const notification = await generateNotification(props);

  const repeatFrequency = (
    recurrence > RECURRENCE.WEEKLY ? RECURRENCE.NONE : recurrence
  ) as RepeatFrequency;

  return notifee.createTriggerNotification(notification, {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency,
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

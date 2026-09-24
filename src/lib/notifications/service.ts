import notifee, {
  type Notification,
  type TimestampTrigger,
  AlarmType,
  TriggerType,
} from 'react-native-notify-kit';

import {
  CHANNEL_PROPS,
  FOREGROUND_SERVICE_ID,
  NOTIFICATION_BASE_PROPS,
} from '@/constants/notificationProps';
import { hasTaskNotification } from '@/utils/taskChecks';

import i18n from '@/config/i18n';

type TimestampNotification = {
  notification: Notification;
  trigger: TimestampTrigger;
};

const SERVICE_STARTUP_DELAY_MS = 10 * 1000;

export async function syncNotificationService() {
  const displayed = await notifee.getDisplayedNotifications();
  if (hasTaskNotification(displayed)) return displayService();

  await cancelService();
  const trigger = await notifee.getTriggerNotifications();

  if (trigger.length === 0) return;
  return handleServiceScheduling(trigger as TimestampNotification[]);
}

async function displayService() {
  const serviceNotification = await generateServiceNotification();
  await notifee.displayNotification(serviceNotification);
}

async function cancelService() {
  await notifee.cancelNotification(FOREGROUND_SERVICE_ID);
  await notifee.stopForegroundService();
}

async function handleServiceScheduling(notifications: TimestampNotification[]) {
  const closestTime = Math.min(
    ...notifications.map(({ trigger }) => trigger.timestamp),
  );
  const timestamp = closestTime - SERVICE_STARTUP_DELAY_MS;

  const serviceNotification = await generateServiceNotification();
  await notifee.createTriggerNotification(serviceNotification, {
    type: TriggerType.TIMESTAMP,
    timestamp,
    alarmManager: { type: AlarmType.SET_ALARM_CLOCK },
  });
}

async function generateServiceNotification() {
  const channelId = await notifee.createChannel(
    CHANNEL_PROPS.foregroundService,
  );

  return {
    id: FOREGROUND_SERVICE_ID,
    title: i18n.t('notification.service.title'),
    body: i18n.t('notification.service.body'),
    android: { ...NOTIFICATION_BASE_PROPS.foregroundService, channelId },
  } as Notification;
}

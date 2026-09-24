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
import {
  hasTaskNotification,
  hasTriggerTaskNotification,
} from '@/utils/taskChecks';

import i18n from '@/config/i18n';

type TimestampNotification = {
  notification: Notification;
  trigger: TimestampTrigger;
};

export async function syncNotificationService() {
  const displayed = await notifee.getDisplayedNotifications();
  if (hasTaskNotification(displayed)) return displayService();

  const trigger = await notifee.getTriggerNotifications();
  if (!hasTriggerTaskNotification(trigger)) return cancelService();

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
  let closestTime: number | undefined = undefined;
  let serviceTime: number | undefined = undefined;

  notifications.forEach(({ notification: { id }, trigger: { timestamp } }) => {
    if (id === FOREGROUND_SERVICE_ID) serviceTime = timestamp;
    if (!closestTime || timestamp < closestTime) closestTime = timestamp;
  });
  if (closestTime === serviceTime) return;

  const serviceNotification = await generateServiceNotification();
  await notifee.createTriggerNotification(serviceNotification, {
    type: TriggerType.TIMESTAMP,
    timestamp: closestTime,
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

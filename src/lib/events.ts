import notifee, { EventType } from '@notifee/react-native';
import { displayNotification } from './notifications';

export function setOnForegroundEvent() {
  notifee.onForegroundEvent(async ({ type, detail: { notification } }) => {
    if (type !== EventType.DISMISSED) return;

    const { title, body } = notification!;
    await displayNotification({ title, body });
  });
}

export function setOnBackgroundEvent() {
  notifee.onBackgroundEvent(async ({ type, detail: { notification } }) => {
    if (type !== EventType.DISMISSED) return;

    const { title, body } = notification!;
    await displayNotification({ title, body });
  });
}

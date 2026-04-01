import { type AndroidChannel, AndroidImportance } from '@notifee/react-native';

export const CHANNEL_PROPS: AndroidChannel = {
  id: 'Chroner',
  name: 'Chroner',
  bypassDnd: true,
  importance: AndroidImportance.HIGH,
} as const;

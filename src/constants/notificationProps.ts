import { COLOR, HEX_COLOR } from '@/types/Color';
import { PRESS_ACTION } from '@/types/PressAction';
import {
  type AndroidChannel,
  type NotificationAndroid,
  AndroidImportance,
  AndroidCategory,
} from '@notifee/react-native';

export const CHANNEL_PROPS: AndroidChannel = {
  id: 'Chroner',
  name: 'Chroner',
  bypassDnd: true,
  importance: AndroidImportance.HIGH,
} as const;

export const NOTIFICATION_BASE_PROPS: NotificationAndroid = {
  ongoing: true,
  autoCancel: false,
  color: HEX_COLOR[COLOR.PURPLE],
  category: AndroidCategory.REMINDER,
  pressAction: {
    id: PRESS_ACTION.DEFAULT,
    launchActivity: PRESS_ACTION.DEFAULT,
  },
  actions: [
    {
      title: 'Complete',
      pressAction: { id: PRESS_ACTION.COMPLETE },
    },
  ],
} as const;

import { COLOR, HEX_COLOR } from '@/types/Color';
import { PRESS_ACTION } from '@/types/PressAction';
import {
  type AndroidChannel,
  type NotificationAndroid,
  AndroidImportance,
  AndroidCategory,
} from 'react-native-notify-kit';

type NotificationKind = 'default' | 'foregroundService';

export const CHANNEL_PROPS: Record<NotificationKind, AndroidChannel> = {
  default: {
    id: 'Chroner',
    name: 'Chroner',
    bypassDnd: true,
    importance: AndroidImportance.HIGH,
    lightColor: HEX_COLOR[COLOR.PURPLE],
  },

  foregroundService: {
    id: 'Chroner-service',
    name: 'Chroner-service',
    importance: AndroidImportance.LOW,
    lightColor: HEX_COLOR[COLOR.PURPLE],
  },
} as const;

export const NOTIFICATION_BASE_PROPS: Record<
  NotificationKind,
  NotificationAndroid
> = {
  default: {
    ongoing: true,
    autoCancel: false,
    smallIcon: 'notification_icon',
    color: HEX_COLOR[COLOR.PURPLE],
    category: AndroidCategory.REMINDER,
    pressAction: {
      id: PRESS_ACTION.DEFAULT,
      launchActivity: PRESS_ACTION.DEFAULT,
    },
    showChronometer: true,
  },

  foregroundService: {
    ongoing: true,
    autoCancel: false,
    asForegroundService: true,
    smallIcon: 'notification_icon',
    color: HEX_COLOR[COLOR.PURPLE],
    category: AndroidCategory.SERVICE,
  },
} as const;

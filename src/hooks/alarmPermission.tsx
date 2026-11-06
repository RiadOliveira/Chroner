import type { DefaultProps } from '@/types/DefaultProps';

import { AppState } from 'react-native';
import { createContext, useContext, useEffect, useState } from 'react';

import notifee, { AndroidNotificationSetting } from 'react-native-notify-kit';

type Status = 'unknown' | 'granted' | 'denied';
type ContextType = { granted: boolean };

const alarmPermissionContext = createContext<ContextType>({} as ContextType);

export function AlarmPermissionContext({ children }: DefaultProps) {
  const [status, setStatus] = useState<Status>('unknown');

  useEffect(() => {
    const refresh = () => readStatus().then(setStatus);
    refresh();

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') return refresh();
    });
    return () => subscription.remove();
  }, []);

  return (
    <alarmPermissionContext.Provider value={{ granted: status !== 'denied' }}>
      {children}
    </alarmPermissionContext.Provider>
  );
}

export function useAlarmPermission() {
  return useContext(alarmPermissionContext);
}

async function readStatus(): Promise<Status> {
  const { android } = await notifee.getNotificationSettings();

  const disabled = android.alarm === AndroidNotificationSetting.DISABLED;
  return disabled ? 'denied' : 'granted';
}

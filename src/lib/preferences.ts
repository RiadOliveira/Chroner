import type { Theme } from '@/types/Theme';
import type { Language } from '@/locales';

import { storage } from '@/config/storage';
import { useMMKVString } from 'react-native-mmkv';

type PreferenceValueMap = {
  theme: Theme;
  language: Language;
};
type Preference = keyof PreferenceValueMap;

export function getPreference<P extends Preference>(preference: P) {
  return storage.getString(preference) as PreferenceValueMap[P] | undefined;
}

export function setPreference<P extends Preference>(
  preference: P,
  value: PreferenceValueMap[P],
) {
  storage.set(preference, value);
}

export function usePreference<P extends Preference>(preference: P) {
  return useMMKVString(preference);
}

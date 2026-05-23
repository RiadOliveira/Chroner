import * as i18n from 'i18next';

import type { Translation } from '@/types/Translation';
import { type Language, LOCALES } from '@/locales';
import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import { getPreference } from '@/lib/preferences';

export function setupI18n() {
  const resources = Object.entries(LOCALES).reduce(
    (prev, [key, translation]) => ({ ...prev, [key]: { translation } }),
    {} as Record<Language, { translation: Translation }>,
  );
  const lng = getPreference('language') ?? getLocales()[0].languageTag;

  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

export default i18n;

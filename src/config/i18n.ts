import type { Translation } from '@/types/Translation';

import { type Language, LOCALES } from '@/locales';
import { getLocales } from 'expo-localization';
import { getPreference } from '@/lib/preferences';
import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

export function setupI18n() {
  if (i18n.isInitialized) return;

  const resources = Object.entries(LOCALES).reduce(
    (prev, [key, translation]) => ({ ...prev, [key]: { translation } }),
    {} as Record<Language, { translation: Translation }>,
  );
  const lng = resolveLanguage();

  // eslint-disable-next-line import/no-named-as-default-member
  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

function resolveLanguage(): Language {
  const preferred = getPreference('language');
  if (preferred !== undefined) return preferred;

  const [{ languageCode: userLocale }] = getLocales();
  if (userLocale && userLocale in LOCALES) return userLocale as Language;

  return 'en';
}

export default i18n;

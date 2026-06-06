import type { Translation } from '@/types/Translation';

import { type Language, LOCALES } from '@/locales';
import { initReactI18next } from 'react-i18next';
import { resolveLocaleLanguage } from '@/utils/resolveLocaleLanguage';
import { getPreference, setPreference } from '@/lib/preferences';

import i18n from 'i18next';

export function setupI18n() {
  if (i18n.isInitialized) return;

  const resources = Object.entries(LOCALES).reduce(
    (prev, [key, translation]) => ({ ...prev, [key]: { translation } }),
    {} as Record<Language, { translation: Translation }>,
  );

  const preferred = setupPreferred();
  const lng = preferred === 'system' ? resolveLocaleLanguage() : preferred;

  // eslint-disable-next-line import/no-named-as-default-member
  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

function setupPreferred() {
  const preferred = getPreference('language');
  if (preferred === undefined) setPreference('language', 'system');

  return preferred ?? 'system';
}

export default i18n;

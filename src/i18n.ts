import * as i18n from 'i18next';

import type { Translation } from './types/Translation';
import { type Language, LOCALES } from './locales';
import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';

const fallbackLng = 'en';
const [{ languageTag: lng = fallbackLng }] = getLocales();

const resources = Object.entries(LOCALES).reduce(
  (prev, [key, translation]) => ({ ...prev, [key]: { translation } }),
  {} as Record<Language, { translation: Translation }>,
);

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng,
  interpolation: { escapeValue: false },
});

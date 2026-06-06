import { type Language, LOCALES } from '@/locales';
import { getLocales } from 'expo-localization';

export function resolveLocaleLanguage(): Language {
  const [{ languageCode: userLocale }] = getLocales();
  if (userLocale && userLocale in LOCALES) return userLocale as Language;

  return 'en';
}

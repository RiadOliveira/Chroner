import type { Language } from '@/locales';

import i18n from '@/config/i18n';
import { setPreference } from './preferences';

export function changeLanguage(language: Language) {
  setPreference('language', language);
  return i18n.changeLanguage(language);
}

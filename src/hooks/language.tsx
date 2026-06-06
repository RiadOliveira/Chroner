import type { Language } from '@/locales';

import { usePreference } from '@/lib/preferences';
import { resolveLocaleLanguage } from '@/utils/resolveLocaleLanguage';

import i18n from '@/config/i18n';

export function useLanguage() {
  const [language, setLanguage] = usePreference('language');

  return {
    language: language as Language,
    async setLanguage(language: Language) {
      const parsed = language === 'system' ? resolveLocaleLanguage() : language;

      setLanguage(language);
      await i18n.changeLanguage(parsed);
    },
  };
}

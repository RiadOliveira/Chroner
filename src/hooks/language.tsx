import type { Language } from '@/locales';

import { TASK_SERVICES } from '@/lib/tasks';
import { usePreference } from '@/lib/preferences';
import { resolveLocaleLanguage } from '@/utils/resolveLocaleLanguage';

import i18n from '@/config/i18n';

export function useLanguage() {
  const [currentLanguage, setLanguage] = usePreference('language');

  return {
    language: currentLanguage as Language,
    async setLanguage(language: Language) {
      const parsed = language === 'system' ? resolveLocaleLanguage() : language;

      setLanguage(language);
      await i18n.changeLanguage(parsed);
      await TASK_SERVICES.resetAllSchedulings();
    },
  };
}

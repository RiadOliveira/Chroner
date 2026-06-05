import type { Language } from '@/locales';
import type { CycleOption } from '@/types/CycleOption';

export const LANGUAGE_OPTIONS: CycleOption<Language>[] = [
  { value: 'en', label: '🇺🇸  English' },
  { value: 'pt', label: '🇧🇷  Português' },
] as const;

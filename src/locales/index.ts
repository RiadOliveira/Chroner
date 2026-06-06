import type { Translation } from '@/types/Translation';

import en from './en';
import pt from './pt';

export const LOCALES = {
  en,
  pt,
} as const satisfies Record<string, Translation>;

export type Language = 'system' | keyof typeof LOCALES;

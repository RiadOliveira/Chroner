import type { Duration } from 'date-fns';

export const RECURRENCE = {
  NONE: -1,
  DAILY: 0,
  WEEKLY: 1,
  MONTHLY: 2,
  YEARLY: 3,
} as const;

type RecurrenceMap = typeof RECURRENCE;
export type RecurrenceValue = RecurrenceMap[keyof RecurrenceMap];

export const RECURRENCE_I18N_KEY = {
  [RECURRENCE.NONE]: 'none',
  [RECURRENCE.DAILY]: 'daily',
  [RECURRENCE.WEEKLY]: 'weekly',
  [RECURRENCE.MONTHLY]: 'monthly',
  [RECURRENCE.YEARLY]: 'yearly',
} as const satisfies Record<RecurrenceValue, string>;

type I18nKeyMap = typeof RECURRENCE_I18N_KEY;
export type RecurrenceI18nKey = I18nKeyMap[keyof I18nKeyMap];

export const RECURRENCE_DURATION = {
  [RECURRENCE.NONE]: {},
  [RECURRENCE.DAILY]: { days: 1 },
  [RECURRENCE.WEEKLY]: { weeks: 1 },
  [RECURRENCE.MONTHLY]: { months: 1 },
  [RECURRENCE.YEARLY]: { years: 1 },
} as const satisfies Record<RecurrenceValue, Duration>;

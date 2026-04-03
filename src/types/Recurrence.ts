import type { Duration } from 'date-fns';

export const RECURRENCE = {
  NONE: -1,
  HOURLY: 0,
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
  YEARLY: 4,
} as const;

type RecurrenceMapType = typeof RECURRENCE;
export type RecurrenceValue = RecurrenceMapType[keyof RecurrenceMapType];

export const RECURRENCE_LABEL: Record<RecurrenceValue, string> = {
  [RECURRENCE.NONE]: '',
  [RECURRENCE.HOURLY]: 'Hourly',
  [RECURRENCE.DAILY]: 'Daily',
  [RECURRENCE.WEEKLY]: 'Weekly',
  [RECURRENCE.MONTHLY]: 'Monthly',
  [RECURRENCE.YEARLY]: 'Yearly',
};

export const RECURRENCE_DURATION: Record<RecurrenceValue, Duration> = {
  [RECURRENCE.NONE]: {},
  [RECURRENCE.HOURLY]: { hours: 1 },
  [RECURRENCE.DAILY]: { days: 1 },
  [RECURRENCE.WEEKLY]: { weeks: 1 },
  [RECURRENCE.MONTHLY]: { months: 1 },
  [RECURRENCE.YEARLY]: { years: 1 },
} as const;

export const RECURRENCES_WITHOUT_NOTIFEE_SUPPORT: RecurrenceValue[] = [
  RECURRENCE.MONTHLY,
  RECURRENCE.YEARLY,
] as const;

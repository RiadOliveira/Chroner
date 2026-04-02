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

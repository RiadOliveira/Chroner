import { parse, parseISO } from 'date-fns';

import i18n from '@/config/i18n';

export function formatDate(value: string | Date) {
  const date = typeof value === 'string' ? parseDateString(value) : value;

  return new Intl.DateTimeFormat(i18n.language, {
    dateStyle: 'medium',
  }).format(date);
}

export function parseDateString(date: string) {
  return parseISO(date);
}

export function formatTime(value: string | Date) {
  const date = typeof value === 'string' ? parseTimeString(value) : value;

  return new Intl.DateTimeFormat(i18n.language, {
    timeStyle: 'short',
  }).format(date);
}

export function parseTimeString(time: string) {
  return parse(time, 'HH:mm', new Date());
}

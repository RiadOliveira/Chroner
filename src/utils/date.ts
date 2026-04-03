import { isPast } from 'date-fns';

export function isOverdue(
  dueDate: string | null,
  reminderTime: string | null,
): boolean {
  if (!dueDate) return false;

  const date = joinDateTime(dueDate, reminderTime);
  return isPast(date);
}

export function joinDateTime(date: string, time: string | null = '00:00') {
  return new Date(`${date}T${time}:00`);
}

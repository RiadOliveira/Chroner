import { type RecurrenceValue, RECURRENCE } from '@/types/Recurrence';
import { type ColorValue, COLOR } from '@/types/Color';

import { sqliteTable as table } from 'drizzle-orm/sqlite-core';

export const tasksTable = table('tasks', (t) => ({
  id: t.integer().primaryKey({ autoIncrement: true }),
  name: t.text().notNull(),
  dueDate: t.text('due_date', { length: 10 }), // Format: "YYYY-MM-DD"
  reminderTime: t.text('reminder_time', { length: 5 }), // Format: "HH:MM"
  recurrence: t
    .integer()
    .notNull()
    .default(RECURRENCE.NONE)
    .$type<RecurrenceValue>(),
  color: t.integer().notNull().default(COLOR.GRAY).$type<ColorValue>(),
  notificationId: t.text('notification_id', { length: 20 }),
}));

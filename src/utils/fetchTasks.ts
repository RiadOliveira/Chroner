import type { Task } from '@/types/Task';

import { db } from '@/db/database';
import { asc, sql } from 'drizzle-orm';
import { tasksTable } from '@/db/schema';

const ORDER_BY_DATE_TIME = asc(
  sql`COALESCE(${tasksTable.dueDate}, '9999-12-31') || 'T' || COALESCE(${tasksTable.reminderTime}, '23:59')`,
);

export function fetchTasks(): Promise<Task[]> {
  return db.select().from(tasksTable).orderBy(ORDER_BY_DATE_TIME);
}

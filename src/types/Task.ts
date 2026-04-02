import { tasksTable } from '@/db/schema';

export type Task = typeof tasksTable.$inferSelect;
export type TaskDTO = typeof tasksTable.$inferInsert;

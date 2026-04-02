CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`due_date` text(10),
	`reminder_time` text(5),
	`recurrence` integer DEFAULT -1 NOT NULL,
	`color` integer DEFAULT 0 NOT NULL,
	`notification_id` text(20)
);

import type { Translation } from '@/types/Translation';

export default {
  header: {
    subtitle: 'Calibrate your timeline',

    overdueTasks_zero: 'Your timeline is perfectly synced',
    overdueTasks_one: '{{count}} task shattered across the timeline',
    overdueTasks_other: '{{count}} tasks shattered across the timeline',
  },

  emptyState: {
    title: 'All quiet across the timeline',

    descriptionPrefix: 'Tap the',
    descriptionSuffix: 'button to start shaping it',
  },
  gestures: {
    title: 'Task Gestures',

    singleTap: {
      action: '1 Tap',
      result: 'Open / Edit',
    },
    doubleTap: {
      action: '2 Taps',
      result: 'Complete',
    },
    hold: {
      action: 'Hold',
      result: 'Delete',
    },
  },

  overdueBadge: 'Overdue',
  dateLabel_zero: 'Today',
  dateLabel_one: '{{count}} day ago',
  dateLabel_other: '{{count}} days ago',

  form: {
    title_create: 'New Task',
    title_edit: 'Edit Task',

    submit_create: 'Add Task',
    submit_edit: 'Save Changes',
  },
  fields: {
    name: {
      label: 'Name',
      placeholder: 'What do you need to do?',
    },
    date: {
      label: 'Due date',
      placeholder: 'Select date',
    },
    time: {
      label: 'Reminder time',
      placeholder: 'Select time',
    },
    recurrence: { label: 'Recurrence' },
    color: { label: 'Color' },
  },
  recurrence: {
    none: '',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    yearly: 'Yearly',
  },

  notification: {
    title: 'Chronovergence',
    bodyPrefix: "It's time to",
    completeAction: 'Complete',

    service: {
      title: 'Chronovergences on watch',
      body_one: 'Stabilizing {{count}} task on the timeline',
      body_other: 'Stabilizing {{count}} tasks on the timeline',
    },
  },
  toast: {
    created: 'Task Created',
    updated: 'Task Updated',
    deleted: 'Task Deleted',
    completed: 'Task Completed',
  },

  settings: {
    title: 'Settings',
    label: { system: 'System', language: 'Language' },
  },
} as const satisfies Translation;

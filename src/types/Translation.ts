import { RecurrenceI18nKey } from './Recurrence';

type FieldKey = 'name' | 'date' | 'time' | 'recurrence' | 'color';
type SettingsFieldKey = 'language' | 'theme';

type Field = { label: string; placeholder?: string };

export type Translation = {
  header: {
    subtitle: string;

    overdueTasks_zero: string;
    overdueTasks_one: `{{count}} ${string}`;
    overdueTasks_other: `{{count}} ${string}`;
  };

  emptyState: {
    title: string;

    descriptionPrefix: string;
    descriptionSuffix: string;
  };
  gestures: {
    title: string;

    singleTap: {
      action: string;
      result: string;
    };
    doubleTap: {
      action: string;
      result: string;
    };
    hold: {
      action: string;
      result: string;
    };
  };
  overdueBadge: string;

  form: {
    title_create: string;
    title_edit: string;

    submit_create: string;
    submit_edit: string;
  };
  fields: Record<FieldKey, Field>;
  recurrence: Record<RecurrenceI18nKey, string>;

  notification: {
    title: string;
    bodyPrefix: string;
  };
  toast: {
    created: string;
    updated: string;
    deleted: string;
    completed: string;
  };

  settings: {
    title: string;
    system: string;

    fields: Record<SettingsFieldKey, string>;
    theme: {
      light: string;
      dark: string;
    };
  };
};

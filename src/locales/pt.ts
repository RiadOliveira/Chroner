import type { Translation } from '@/types/Translation';

export default {
  header: {
    subtitle: 'Calibre sua linha temporal',

    overdueTasks_zero: 'Cronologia perfeitamente sincronizada',
    overdueTasks_one: '{{count}} tarefa fragmentada pela linha temporal',
    overdueTasks_other: '{{count}} tarefas fragmentadas pela linha temporal',
  },

  emptyState: {
    title: 'Tudo em ordem na cronologia',

    descriptionPrefix: 'Toque no',
    descriptionSuffix: 'para começar a moldá-la',
  },
  gestures: {
    title: 'Gestos de Tarefas',

    singleTap: {
      action: '1 Toque',
      result: 'Abrir / Editar',
    },
    doubleTap: {
      action: '2 Toques',
      result: 'Concluir',
    },
    hold: {
      action: 'Segurar',
      result: 'Excluir',
    },
  },
  overdueBadge: 'Vencida',

  form: {
    title_create: 'Nova Tarefa',
    title_edit: 'Editar Tarefa',

    submit_create: 'Adicionar Tarefa',
    submit_edit: 'Salvar Alterações',
  },
  fields: {
    name: {
      label: 'Nome',
      placeholder: 'O que precisa ser feito?',
    },
    date: {
      label: 'Data prevista',
      placeholder: 'Selecione a data',
    },
    time: {
      label: 'Hora do lembrete',
      placeholder: 'Selecione a hora',
    },
    recurrence: { label: 'Recorrência' },
    color: { label: 'Cor' },
  },
  recurrence: {
    none: '',
    daily: 'Diária',
    weekly: 'Semanal',
    monthly: 'Mensal',
    yearly: 'Anual',
  },

  notification: {
    title: 'Cronoativação',
    bodyPrefix: 'Está na hora de',
    completeAction: 'Concluir',
  },
  toast: {
    created: 'Tarefa Criada',
    updated: 'Tarefa Atualizada',
    deleted: 'Tarefa Excluída',
    completed: 'Tarefa Concluída',
  },

  settings: {
    title: 'Configurações',
    label: { system: 'Sistema', language: 'Idioma' },
  },
} as const satisfies Translation;

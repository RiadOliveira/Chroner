import type { Task } from '@/types/Task';

import { View, Text, FlatList } from 'react-native';
import { Hourglass } from 'lucide-react-native';
import { useTasks } from '@/hooks/tasks';
import { RECURRENCE } from '@/types/Recurrence';
import { COLOR, HEX_COLOR } from '@/types/Color';

import TaskCard from './Card';

const TEST_TASKS: Task[] = [
  {
    id: 1,
    name: 'Estudar TypeScript',
    dueDate: '2026-04-05T14:00:00.000Z',
    reminderTime: '2026-04-05T13:30:00.000Z',
    recurrence: RECURRENCE.DAILY,
    color: COLOR.BLUE,
    notificationId: 'notif-1',
  },
  {
    id: 2,
    name: 'Treino de academia',
    dueDate: '2026-04-04T18:00:00.000Z',
    reminderTime: '2026-04-04T17:30:00.000Z',
    recurrence: RECURRENCE.WEEKLY,
    color: COLOR.GREEN,
    notificationId: 'notif-2',
  },
  {
    id: 3,
    name: 'Pagar contas',
    dueDate: '2026-04-10T12:00:00.000Z',
    reminderTime: '2026-04-10T10:00:00.000Z',
    recurrence: RECURRENCE.MONTHLY,
    color: COLOR.RED,
    notificationId: 'notif-3',
  },
  {
    id: 4,
    name: 'Ligar para cliente',
    dueDate: '2026-04-03T16:00:00.000Z',
    reminderTime: '2026-04-03T15:45:00.000Z',
    recurrence: RECURRENCE.NONE,
    color: COLOR.ORANGE,
    notificationId: 'notif-4',
  },
  {
    id: 5,
    name: 'Reunião de equipe com titulo extremamente longo e extenso',
    dueDate: '2026-04-06T09:00:00.000Z',
    reminderTime: '2026-04-06T08:45:00.000Z',
    recurrence: RECURRENCE.WEEKLY,
    color: COLOR.PURPLE,
    notificationId: 'notif-5',
  },
  {
    id: 6,
    name: 'Estudar inglês',
    dueDate: '2026-04-07T20:00:00.000Z',
    reminderTime: '2026-04-07T19:30:00.000Z',
    recurrence: RECURRENCE.DAILY,
    color: COLOR.YELLOW,
    notificationId: 'notif-6',
  },
  {
    id: 7,
    name: 'Atualizar portfólio',
    dueDate: '2026-04-15T22:00:00.000Z',
    reminderTime: '2026-04-15T21:00:00.000Z',
    recurrence: RECURRENCE.NONE,
    color: COLOR.PINK,
    notificationId: 'notif-7',
  },
  {
    id: 8,
    name: 'Backup do sistema',
    dueDate: '2026-04-08T02:00:00.000Z',
    reminderTime: '2026-04-08T01:50:00.000Z',
    recurrence: RECURRENCE.DAILY,
    color: COLOR.GRAY,
    notificationId: 'notif-8',
  },
  {
    id: 9,
    name: 'Consulta médica',
    dueDate: '2026-04-20T11:00:00.000Z',
    reminderTime: '2026-04-20T10:30:00.000Z',
    recurrence: RECURRENCE.YEARLY,
    color: COLOR.BLUE,
    notificationId: 'notif-9',
  },
  {
    id: 10,
    name: 'Planejamento financeiro',
    dueDate: '2026-04-12T15:00:00.000Z',
    reminderTime: '2026-04-12T14:00:00.000Z',
    recurrence: RECURRENCE.MONTHLY,
    color: COLOR.GREEN,
    notificationId: 'notif-10',
  },
] as const;

export default function TasksList() {
  const { tasks } = useTasks();

  return (
    <FlatList
      data={TEST_TASKS}
      keyExtractor={({ id }) => id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, paddingBottom: 80, gap: 12 }}
      ItemSeparatorComponent={() => null}
      renderItem={({ item }) => <TaskCard task={item} />}
      ListEmptyComponent={<EmptyState />}
    />
  );
}

function EmptyState() {
  return (
    <View className="items-center pt-24 px-4">
      <View className="bg-white rounded-3xl p-8 items-center shadow-sm border border-slate-100">
        <View className="bg-accent-purple/10 p-4 rounded-full mb-4">
          <Hourglass
            size={32}
            color={HEX_COLOR[COLOR.PURPLE]}
            strokeWidth={1.5}
          />
        </View>

        <Text className="text-slate-800 font-bold text-lg font-primary text-center mb-2">
          All quiet across the timeline
        </Text>

        <Text className="text-slate-500 text-sm font-medium font-secondary text-center">
          Tap the + button to add your first task and start tracking your
          timeline.
        </Text>
      </View>
    </View>
  );
}

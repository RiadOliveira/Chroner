import { View, Text, FlatList } from 'react-native';
import { Hourglass } from 'lucide-react-native';
import { useTasks } from '@/hooks/tasks';
import { COLOR, HEX_COLOR } from '@/types/Color';

import TaskCard from './Card';

export default function TasksList() {
  const { tasks, selectTask, completeTask, deleteTask } = useTasks();

  return (
    <FlatList
      data={tasks}
      keyExtractor={({ id }) => id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, paddingBottom: 80, gap: 12 }}
      ItemSeparatorComponent={() => null}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          selectTask={() => selectTask(item.id)}
          completeTask={() => completeTask(item)}
          deleteTask={() => deleteTask(item)}
        />
      )}
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

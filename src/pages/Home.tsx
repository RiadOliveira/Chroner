import { View } from 'react-native';
import { useTasks } from '@/hooks/tasks';
import { useEffect } from 'react';
import { setOnForegroundEvent } from '@/lib/events';

import Header from '@/components/Header';
import TasksList from '@/components/TasksList';

export default function Home() {
  const { selectTaskById, completeTaskById } = useTasks();

  useEffect(() => {
    return setOnForegroundEvent({ selectTaskById, completeTaskById });
  }, [completeTaskById, selectTaskById]);

  return (
    <View className="flex-1 bg-background">
      <Header />
      <TasksList />
    </View>
  );
}

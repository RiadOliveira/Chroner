import { View } from 'react-native';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { useTasks } from '@/hooks/tasks';
import { useEffect } from 'react';
import { setOnForegroundEvent } from '@/lib/events';

import Header from '@/components/Header';
import TasksList from '@/components/task/List';
import TaskModal from '@/components/task/Modal';
import FAB from '@/components/FAB';

export default function Home() {
  const { selectTask, completeTaskById } = useTasks();

  useEffect(() => {
    return setOnForegroundEvent({ selectTask, completeTaskById });
  }, [selectTask, completeTaskById]);

  return (
    <View className="flex-1 bg-background">
      <Header />
      <TasksList />

      <FAB onPress={() => selectTask(CREATE_TASK_INDEX)} />
      <TaskModal />
    </View>
  );
}

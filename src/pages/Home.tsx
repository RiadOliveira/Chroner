import { View } from 'react-native';
import { useTasks } from '@/hooks/tasks';
import { useEffect, useState } from 'react';
import { setOnForegroundEvent } from '@/lib/events';

import Header from '@/components/Header';
import TasksList from '@/components/task/List';
import TaskModal from '@/components/task/Modal';
import FAB from '@/components/FAB';

export default function Home() {
  const { selectedTask, selectTask, completeTaskById } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    return setOnForegroundEvent({ selectTask, completeTaskById });
  }, [selectTask, completeTaskById]);

  useEffect(() => {
    if (selectedTask !== undefined) setModalVisible(true);
  }, [selectedTask]);

  return (
    <View className="flex-1 bg-background">
      <Header />
      <TasksList />

      <FAB onPress={() => setModalVisible(true)} />
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

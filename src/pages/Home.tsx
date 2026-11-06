import { TOAST_PROPS } from '@/constants/toastProps';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { View } from 'react-native';
import { useTasks } from '@/hooks/tasks';
import { useEffect } from 'react';
import { setOnForegroundEvent } from '@/lib/events';

import FAB from '@/components/FAB';
import Toast from 'react-native-toast-message';
import Header from '@/components/Header';
import TaskList from '@/components/task/list';
import TaskModal from '@/components/modal/Task';

export default function Home() {
  const { selectTask, onForegroundTaskComplete } = useTasks();

  useEffect(() => {
    return setOnForegroundEvent({ selectTask, onForegroundTaskComplete });
  }, [selectTask, onForegroundTaskComplete]);

  return (
    <View className="flex-1 bg-background">
      <Header />
      <View className="flex-1 -mt-1">
        <TaskList />
      </View>

      <FAB onPress={() => selectTask(CREATE_TASK_INDEX)} />
      <TaskModal />
      <Toast {...TOAST_PROPS} />
    </View>
  );
}

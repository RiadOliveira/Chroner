import { View } from 'react-native';
import { useTasks } from '@/hooks/tasks';
import { isOverdue } from '@/utils/date';
import { useEffect, useMemo } from 'react';
import { setOnForegroundEvent } from '@/lib/events';

import Header from '@/components/Header';

export default function Home() {
  const { tasks, selectTaskById, completeTaskById } = useTasks();

  const overdueCount = useMemo(() => {
    return tasks.reduce((count, { dueDate, reminderTime }) => {
      return count + Number(isOverdue(dueDate, reminderTime));
    }, 0);
  }, [tasks]);

  useEffect(() => {
    return setOnForegroundEvent({ selectTaskById, completeTaskById });
  }, [completeTaskById, selectTaskById]);

  return (
    <View className="flex-1 bg-background">
      <Header overdueCount={overdueCount} />
    </View>
  );
}

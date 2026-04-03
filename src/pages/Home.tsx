import { Button, Text, View } from 'react-native';
import { useTasks } from '@/hooks/tasks';
import { useEffect } from 'react';
import { setOnForegroundEvent } from '@/lib/events';
import { scheduleNotification } from '@/lib/notifications';

export default function Home() {
  const { tasks, selectTaskById, completeTaskById } = useTasks();

  useEffect(() => {
    return setOnForegroundEvent({ selectTaskById, completeTaskById });
  }, [completeTaskById, selectTaskById]);

  return (
    <View>
      <Text>Home - {tasks.length}</Text>
      <Button
        title="Pressione"
        onPress={() =>
          scheduleNotification({
            title: 'Chroner',
            body: 'Chrono Triggered!',
            date: new Date(Date.now() + 5000),
          })
        }
      />
    </View>
  );
}

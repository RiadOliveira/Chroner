import { FlatList, LayoutAnimation } from 'react-native';
import { useTasks } from '@/hooks/tasks';
import { useEffect, useRef } from 'react';

import TaskCard from '../card';
import Instructions from './Instructions';

export default function TasksList() {
  const { tasks, selectTask, completeTask, deleteTask } = useTasks();
  const previousLength = useRef(tasks.length);

  useEffect(() => {
    if (previousLength.current === tasks.length) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    previousLength.current = tasks.length;
  }, [tasks.length]);

  return (
    <FlatList
      data={tasks}
      keyExtractor={({ id }) => id.toString()}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      windowSize={10}
      contentContainerStyle={{
        gap: 12,
        flexGrow: 1,
        padding: 20,
        paddingBottom: 80,
      }}
      renderItem={({ item, index }) => (
        <TaskCard
          task={item}
          index={index}
          selectTask={() => selectTask(item.id)}
          completeTask={() => completeTask(item)}
          deleteTask={() => deleteTask(item)}
        />
      )}
      ListEmptyComponent={<Instructions visible={!tasks.length} />}
    />
  );
}

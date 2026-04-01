import { Button, Text, View } from 'react-native';
import { scheduleNotification } from '@/lib/notifications';

export default function Home() {
  return (
    <View>
      <Text>Home</Text>
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

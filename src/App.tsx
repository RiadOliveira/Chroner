import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { setOnForegroundEvent } from './lib/events';

import Pages from './pages';

export default function App() {
  useEffect(() => {
    return setOnForegroundEvent();
  }, []);

  return (
    <SafeAreaView>
      <Pages />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import Pages from './pages';

export default function App() {
  return (
    <SafeAreaView>
      <Pages />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

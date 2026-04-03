import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { db } from './db/database';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import Home from './pages/Home';
import migrations from '@/db/drizzle/migrations';

export default function App() {
  useMigrations(db, migrations);

  return (
    <SafeAreaProvider>
      <Home />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

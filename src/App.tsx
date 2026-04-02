import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { database } from './db/database';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { setOnForegroundEvent } from './lib/events';

import Pages from './pages';
import migrations from '@/db/drizzle/migrations';

export default function App() {
  useMigrations(database, migrations);

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

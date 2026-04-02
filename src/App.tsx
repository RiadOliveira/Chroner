import './global.css';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from './db/database';
import { useEffect } from 'react';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { setOnForegroundEvent } from './lib/events';

import Home from './pages/Home';
import migrations from '@/db/drizzle/migrations';

export default function App() {
  useMigrations(db, migrations);

  useEffect(() => {
    return setOnForegroundEvent();
  }, []);

  return (
    <SafeAreaView>
      <Home />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

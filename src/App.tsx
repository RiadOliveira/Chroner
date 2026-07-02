import './config/global.css';

import { StatusBar } from 'expo-status-bar';
import { TasksContext } from './hooks/tasks';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { db } from './db/database';
import { useEffect } from 'react';
import { setupI18n } from './config/i18n';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { setupNotifications } from './lib/notifications';

import Home from './pages/Home';
import migrations from '@/db/drizzle/migrations';

export default function App() {
  useMigrations(db, migrations);

  useEffect(() => {
    setupI18n();
    setupNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <TasksContext>
        <SafeAreaView edges={['bottom']} className="flex-1 bg-background">
          <Home />
        </SafeAreaView>
      </TasksContext>

      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}

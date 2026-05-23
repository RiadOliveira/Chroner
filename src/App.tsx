import './i18n';
import './global.css';

import { StatusBar } from 'expo-status-bar';
import { TasksContext } from './hooks/tasks';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { db } from './db/database';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';

import Home from './pages/Home';
import migrations from '@/db/drizzle/migrations';

export default function App() {
  useMigrations(db, migrations);

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

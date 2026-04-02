import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

const expo = openDatabaseSync('chroner.db');
export const db = drizzle(expo, { casing: 'snake_case' });

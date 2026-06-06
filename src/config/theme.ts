import { getPreference, setPreference } from '@/lib/preferences';

export function setupTheme() {
  const preferredTheme = getPreference('theme');
  if (preferredTheme === undefined) setPreference('theme', 'system');
}

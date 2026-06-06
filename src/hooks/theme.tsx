import type { Theme } from '@/types/Theme';

import { colorScheme } from 'nativewind';
import { usePreference } from '@/lib/preferences';

export function useTheme() {
  const [theme, setTheme] = usePreference('theme');

  return {
    theme: theme as Theme,
    setTheme(theme: Theme) {
      setTheme(theme);
      colorScheme.set(theme);
    },
  };
}

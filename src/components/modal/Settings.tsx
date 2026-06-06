import type { Theme } from '@/types/Theme';
import type { Language } from '@/locales';
import type { TFunction } from 'i18next';
import type { CycleOption } from '@/types/CycleOption';

import { COLOR, HEX_COLOR } from '@/types/Color';
import { View } from 'react-native';
import { Settings, Sun, Moon, SunMoon } from 'lucide-react-native';
import { useTheme } from '@/hooks/theme';
import { useLanguage } from '@/hooks/language';
import { useTranslation } from 'react-i18next';

import Field from '../field/Base';
import BaseModal from './Base';
import CycleField from '../field/Cycle';

type SettingsOptions = {
  languageOptions: CycleOption<Language>[];
  themeOptions: CycleOption<Theme>[];
};

type Props = {
  visible: boolean;
  onClose(): void;
};

export default function SettingsModal({ visible, onClose }: Props) {
  const { t } = useTranslation();
  const { languageOptions, themeOptions } = getSettingsOptions(t);

  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      header={{
        title: t('settings.title'),
        icon: <Settings size={18} color={HEX_COLOR[COLOR.PURPLE]} />,
      }}
    >
      <View className="flex-row gap-4 justify-between">
        <Field label={t('settings.fields.language')} centered>
          <CycleField
            selectedValue={language}
            options={languageOptions}
            onSelect={setLanguage}
          />
        </Field>

        <Field label={t('settings.fields.theme')} centered>
          <CycleField
            selectedValue={theme}
            options={themeOptions}
            onSelect={setTheme}
          />
        </Field>
      </View>
    </BaseModal>
  );
}

function getSettingsOptions(
  t: TFunction<'translation', undefined>,
): SettingsOptions {
  const systemLabel = t('settings.system');

  return {
    languageOptions: [
      { value: 'system', label: `🌐  ${systemLabel}` },
      { value: 'en', label: '🇺🇸  English' },
      { value: 'pt', label: '🇧🇷  Português' },
    ],

    themeOptions: [
      { value: 'system', label: systemLabel, icon: SunMoon },
      { value: 'light', label: t('settings.theme.light'), icon: Sun },
      { value: 'dark', label: t('settings.theme.dark'), icon: Moon },
    ],
  };
}

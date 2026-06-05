import type { Theme } from '@/types/Theme';
import type { Language } from '@/locales';
import type { TFunction } from 'i18next';
import type { CycleOption } from '@/types/CycleOption';

import { COLOR, HEX_COLOR } from '@/types/Color';
import { LANGUAGE_OPTIONS } from '@/constants/languageOptions';
import { View } from 'react-native';
import { Moon, Settings, Sun } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/lib/language';

import Field from '../field/Base';
import BaseModal from './Base';
import CycleField from '../field/Cycle';

type Props = {
  visible: boolean;
  onClose(): void;
};

export default function SettingsModal({ visible, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const themeOptions = getThemeOptions(t);

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
            selectedValue={i18n.language as Language}
            options={LANGUAGE_OPTIONS}
            onSelect={changeLanguage}
          />
        </Field>

        <Field label={t('settings.fields.theme')} centered>
          <CycleField
            selectedValue="light"
            options={themeOptions}
            onSelect={() => null}
          />
        </Field>
      </View>
    </BaseModal>
  );
}

function getThemeOptions(
  t: TFunction<'translation', undefined>,
): CycleOption<Theme>[] {
  return [
    { value: 'light', label: t('settings.theme.light'), icon: Sun },
    { value: 'dark', label: t('settings.theme.dark'), icon: Moon },
  ];
}

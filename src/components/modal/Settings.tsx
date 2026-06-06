import type { Language } from '@/locales';
import type { CycleOption } from '@/types/CycleOption';

import { COLOR, HEX_COLOR } from '@/types/Color';
import { Settings } from 'lucide-react-native';
import { useLanguage } from '@/hooks/language';
import { useTranslation } from 'react-i18next';

import Field from '../field/Base';
import BaseModal from './Base';
import CycleField from '../field/Cycle';

type Props = {
  visible: boolean;
  onClose(): void;
};

export default function SettingsModal({ visible, onClose }: Props) {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const languageOptions = getLanguageOptions(t('settings.label.system'));
  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      header={{
        title: t('settings.title'),
        icon: <Settings size={18} color={HEX_COLOR[COLOR.PURPLE]} />,
      }}
    >
      <Field label={t('settings.label.language')}>
        <CycleField
          selectedValue={language}
          options={languageOptions}
          onSelect={setLanguage}
        />
      </Field>
    </BaseModal>
  );
}

function getLanguageOptions(systemLabel: string): CycleOption<Language>[] {
  return [
    { value: 'system', label: `🌐  ${systemLabel}` },
    { value: 'en', label: '🇺🇸  English' },
    { value: 'pt', label: '🇧🇷  Português Brasileiro' },
  ];
}

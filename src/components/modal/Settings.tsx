import { COLOR, HEX_COLOR } from '@/types/Color';
import { View } from 'react-native';
import { Settings } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import BaseModal from './Base';

type Props = {
  visible: boolean;
  onClose(): void;
};

export default function SettingsModal({ visible, onClose }: Props) {
  const { t } = useTranslation();

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      header={{
        title: 'Settings',
        icon: <Settings size={18} color={HEX_COLOR[COLOR.PURPLE]} />,
      }}
    >
      <View className="size-full bg-red-500" />
    </BaseModal>
  );
}

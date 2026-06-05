import type { DefaultProps } from '@/types/DefaultProps';

import { X } from 'lucide-react-native';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/utils/mergeStyles';

import Modal from 'react-native-modal';
import AppGradient from '../decoration/AppGradient';

type Props = DefaultProps & {
  visible: boolean;
  header: {
    title: string;
    icon: React.ReactNode;
    extraButtons?: React.ReactNode;
  };
  onClose(): void;
};

export default function BaseModal({
  visible,
  header: { title, icon, extraButtons },
  className,
  children,
  onClose,
}: Props) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      avoidKeyboard
      useNativeDriver
      hideModalContentWhileAnimating
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={250}
      backdropOpacity={0.5}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={250}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <SafeAreaView
        edges={['bottom']}
        className={cn('bg-background max-h-[88%] overflow-hidden', className)}
      >
        <AppGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-1 w-full"
        />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20 }}
        >
          <View className="flex-row items-center justify-between pb-6">
            <View className="flex-row items-center gap-3">
              <View className="bg-accent-purple/10 p-2 rounded-xl">{icon}</View>

              <Text className="text-slate-800 text-xl font-bold font-primary">
                {title}
              </Text>
            </View>

            <View className="flex-row items-center gap-3">
              {extraButtons}

              <TouchableOpacity
                className="bg-slate-200/70 p-2 rounded-xl"
                onPress={onClose}
                activeOpacity={0.6}
                hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              >
                <X size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>

          {children}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

import { RECURRENCE } from '@/types/Recurrence';
import { COLOR, HEX_COLOR } from '@/types/Color';
import { CREATE_TASK_INDEX } from '@/constants/createTaskIndex';
import { Trash2, Check, AlarmClock, ExternalLink } from 'lucide-react-native';
import {
  View,
  Text,
  Easing,
  Animated,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useTasks } from '@/hooks/tasks';
import { useTranslation } from 'react-i18next';
import { useAlarmPermission } from '@/hooks/alarmPermission';
import { requestAlarmPermission } from '@/lib/notifications';
import { useEffect, useRef, useState } from 'react';

import AppIcon from '../decoration/AppIcon';
import TaskForm from '../task/form';
import BaseModal from './Base';
import AppGradient from '../decoration/AppGradient';

export default function TaskModal() {
  const { t } = useTranslation();
  const { granted } = useAlarmPermission();
  const { tasks, selectedIndex, selectTask, deleteTask, completeTask } =
    useTasks();

  const [creating, setCreating] = useState(false);

  const visible = selectedIndex !== undefined;
  const selectedTask = visible && !creating ? tasks[selectedIndex] : undefined;
  const canComplete = granted || selectedTask?.recurrence === RECURRENCE.NONE;

  useEffect(() => {
    if (visible) setCreating(selectedIndex === CREATE_TASK_INDEX);
  }, [selectedIndex, visible]);

  function onClose() {
    selectTask(undefined);
  }

  async function onDelete() {
    if (selectedTask === undefined) return;

    await deleteTask(selectedTask);
    onClose();
  }

  async function onComplete() {
    if (selectedTask === undefined) return;

    await completeTask(selectedTask);
    onClose();
  }

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      header={{
        title: t(`form.title_${creating ? 'create' : 'edit'}`),
        icon: (
          <AppIcon
            tintColor={HEX_COLOR[COLOR.PURPLE]}
            style={{ width: 18, height: 18 }}
          />
        ),
        extraButtons: !creating && (
          <>
            <TouchableOpacity
              className="bg-red-500/10 p-2 rounded-xl"
              onPress={onDelete}
              activeOpacity={0.6}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
            >
              <Trash2 size={18} color="#e11d48" />
            </TouchableOpacity>

            {canComplete && (
              <TouchableOpacity
                className="bg-emerald-500/10 p-2 rounded-xl"
                onPress={onComplete}
                activeOpacity={0.6}
                hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              >
                <Check size={18} color="#059669" />
              </TouchableOpacity>
            )}
          </>
        ),
      }}
    >
      {!granted ? (
        <AlarmNotice />
      ) : (
        <TaskForm isCreating={creating} onSubmit={onClose} />
      )}
    </BaseModal>
  );
}

function AlarmNotice() {
  const { t } = useTranslation();
  const { granted } = useAlarmPermission();

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    if (granted) return;

    opacity.setValue(0);
    translateY.setValue(12);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [granted, opacity, translateY]);

  if (granted) return null;
  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <View className="w-full items-center gap-5 py-2">
        <View className="bg-accent-purple/10 border border-accent-purple/20 p-4 rounded-3xl">
          <AlarmClock
            size={32}
            strokeWidth={2.2}
            color={HEX_COLOR[COLOR.PURPLE]}
          />
        </View>

        <View className="items-center gap-2 px-2">
          <Text className="text-slate-800 font-bold text-xl font-primary text-center">
            {t('alarm.title')}
          </Text>

          <Text className="text-slate-500 text-sm font-medium font-secondary text-center leading-6">
            {t('alarm.description')}
          </Text>
        </View>

        <View className="w-full gap-2">
          <Pressable
            onPress={requestAlarmPermission}
            className="rounded-2xl overflow-hidden self-stretch active:opacity-80"
          >
            <AppGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex-row items-center justify-center gap-2 py-3"
            >
              <ExternalLink size={16} color="#ffffff" strokeWidth={2.5} />

              <Text className="text-white font-semibold font-secondary">
                {t('alarm.action')}
              </Text>
            </AppGradient>
          </Pressable>

          <Text className="text-slate-400 text-xs font-medium font-secondary text-center">
            {t('alarm.hint')}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

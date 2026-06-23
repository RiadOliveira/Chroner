import type { Task } from '@/types/Task';
import type { TFunction } from 'i18next';

import { HEX_COLOR } from '@/types/Color';
import { RECURRENCE, RECURRENCE_I18N_KEY } from '@/types/Recurrence';
import { View, Text } from 'react-native';
import { AlertTriangle, Calendar, Clock, RefreshCw } from 'lucide-react-native';
import { isOverdue } from '@/utils/date';
import { useTranslation } from 'react-i18next';
import { formatDate, formatTime, parseDateString } from '@/lib/date';
import { differenceInDays, startOfDay, startOfToday } from 'date-fns';

import GestureButton from '@/components/GestureButton';

type Props = {
  task: Task;
  onSelect(): void;
  onComplete(): void;
  onDelete(): void;
};

export default function TaskCardContainer({
  task,
  onSelect,
  onComplete,
  onDelete,
}: Props) {
  const accentColor = HEX_COLOR[task.color];

  return (
    <GestureButton
      onSingleTap={onSelect}
      onDoubleTap={onComplete}
      onHold={onDelete}
      className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm"
    >
      <View
        className="absolute left-0 bottom-0 h-0.5 w-full"
        style={{ backgroundColor: accentColor }}
      />

      <View className="p-4 gap-2">
        <View className="flex-row items-start justify-between gap-5">
          <Text
            style={{ color: accentColor }}
            className="text-slate-800 font-semibold text-base font-primary flex-1"
            numberOfLines={1}
          >
            {task.name}
          </Text>

          <View
            className="size-2 rounded-full opacity-80 mt-0.5 mr-0.5"
            style={{ backgroundColor: accentColor }}
          />
        </View>

        <View className="flex-row items-center justify-between">
          <DateTimeRow
            dueDate={task.dueDate}
            reminderTime={task.reminderTime}
          />

          <View className="flex-row gap-1.5">
            <OverdueBadge
              dueDate={task.dueDate}
              reminderTime={task.reminderTime}
            />

            <RecurrencePill
              recurrence={task.recurrence}
              accentColor={accentColor}
            />
          </View>
        </View>
      </View>
    </GestureButton>
  );
}

function OverdueBadge({
  dueDate,
  reminderTime,
}: Pick<Task, 'dueDate' | 'reminderTime'>) {
  const { t } = useTranslation();

  if (!isOverdue(dueDate, reminderTime)) return null;
  return (
    <View className="flex-row items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
      <AlertTriangle size={10} color="#F59E0B" strokeWidth={3} />
      <Text className="text-amber-600 text-xs font-semibold font-secondary">
        {t('overdueBadge')}
      </Text>
    </View>
  );
}

function RecurrencePill({
  recurrence,
  accentColor,
}: Pick<Task, 'recurrence'> & { accentColor: string }) {
  const { t } = useTranslation();

  if (recurrence === RECURRENCE.NONE) return null;
  return (
    <View
      className="flex-row items-center gap-1 px-2 py-0.5 rounded-full border"
      style={{
        backgroundColor: `${accentColor}10`,
        borderColor: `${accentColor}40`,
      }}
    >
      <RefreshCw size={10} color={accentColor} strokeWidth={3} />
      <Text
        style={{ color: accentColor }}
        className="font-semibold text-xs font-secondary"
      >
        {t(`recurrence.${RECURRENCE_I18N_KEY[recurrence]}`)}
      </Text>
    </View>
  );
}

function DateTimeRow({
  dueDate,
  reminderTime,
}: Pick<Task, 'dueDate' | 'reminderTime'>) {
  const { t } = useTranslation();
  if (!dueDate && !reminderTime) return null;

  const dateLabel = generateDateLabel(t, dueDate);
  const timeLabel = reminderTime ? formatTime(reminderTime) : null;

  return (
    <View className="flex-row items-center gap-2">
      {dateLabel && (
        <View className="flex-row items-center gap-1">
          <Calendar size={12} color="#64748b" strokeWidth={3} />
          <Text className="text-slate-500 text-sm font-medium font-secondary">
            {dateLabel}
          </Text>
        </View>
      )}

      {timeLabel && (
        <View className="flex-row items-center gap-1">
          <Clock size={12} color="#64748b" strokeWidth={3} />
          <Text className="text-slate-500 text-sm font-secondary font-medium">
            {timeLabel}
          </Text>
        </View>
      )}
    </View>
  );
}

function generateDateLabel(
  t: TFunction<'translation', undefined>,
  dueDate: string | null,
) {
  if (dueDate === null) return null;

  const todayDate = startOfToday();
  const parsedDate = parseDateString(dueDate);
  const difference = differenceInDays(startOfDay(parsedDate), todayDate);

  if (difference > 0) return formatDate(parsedDate);
  return t('dateLabel', { count: -difference });
}

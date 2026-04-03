import type { Task } from '@/types/Task';

import { View, Text } from 'react-native';
import { AlertTriangle, Calendar, Clock, RefreshCw } from 'lucide-react-native';
import { RECURRENCE } from '@/types/Recurrence';
import { HEX_COLOR } from '@/types/Color';
import { isOverdue } from '@/utils/date';
import { format, parseISO } from 'date-fns';

import GestureButton from './GestureButton';

const RECURRENCE_LABEL: Record<number, string> = {
  [RECURRENCE.NONE]: '',
  [RECURRENCE.HOURLY]: 'Hourly',
  [RECURRENCE.DAILY]: 'Daily',
  [RECURRENCE.WEEKLY]: 'Weekly',
  [RECURRENCE.MONTHLY]: 'Monthly',
  [RECURRENCE.YEARLY]: 'Yearly',
};

export default function TaskCard({ task }: { task: Task }) {
  const overdue = isOverdue(task.dueDate, task.reminderTime);
  const taskColor = HEX_COLOR[task.color];
  const recurrenceLabel = RECURRENCE_LABEL[task.recurrence];

  return (
    <GestureButton className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
      <View
        className="absolute left-0 bottom-0 h-0.5 w-full"
        style={{ backgroundColor: taskColor }}
      />

      <View className="px-4 py-5 gap-2">
        <View className="flex-row items-start justify-between gap-5">
          <Text
            style={{ color: taskColor }}
            className="text-slate-800 font-semibold text-base font-primary flex-1"
            numberOfLines={1}
          >
            {task.name}
          </Text>

          <View
            className="size-2 rounded-full opacity-80 mt-0.5 mr-0.5"
            style={{ backgroundColor: taskColor }}
          />
        </View>

        <View className="flex-row items-center justify-between">
          <DateTimeRow
            dueDate={task.dueDate}
            reminderTime={task.reminderTime}
          />

          <View className="flex-row gap-2.5">
            {!overdue && <OverdueBadge />}
            {recurrenceLabel && (
              <RecurrencePill label={recurrenceLabel} color={taskColor} />
            )}
          </View>
        </View>
      </View>
    </GestureButton>
  );
}

function OverdueBadge() {
  return (
    <View className="flex-row items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
      <AlertTriangle size={10} color="#F59E0B" strokeWidth={3} />
      <Text className="text-amber-600 text-xs font-semibold font-secondary">
        Overdue
      </Text>
    </View>
  );
}

function DateTimeRow({
  dueDate,
  reminderTime,
}: {
  dueDate?: string | null;
  reminderTime?: string | null;
}) {
  if (!dueDate && !reminderTime) return null;

  const dateLabel = dueDate ? format(parseISO(dueDate), 'MMM d, yyyy') : null;
  const timeLabel = reminderTime
    ? format(parseISO(reminderTime), 'HH:mm')
    : null;

  return (
    <View className="flex-row items-center gap-3">
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

function RecurrencePill({ label, color }: { label: string; color: string }) {
  return (
    <View
      className="flex-row items-center gap-1 px-2 py-0.5 rounded-full border"
      style={{ backgroundColor: `${color}10`, borderColor: `${color}40` }}
    >
      <RefreshCw size={10} color={color} strokeWidth={3} />
      <Text style={{ color }} className="font-semibold text-xs font-secondary">
        {label}
      </Text>
    </View>
  );
}

import type { Lesson } from '../../types';
import { cn } from '../../lib/utils';
import { format, parseISO } from 'date-fns';
import {
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  AlertCircle,
  UserPlus
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Loader2 } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  onTakeClass?: (id: string) => Promise<void>;
}

const statusConfig = {
  Completed: {
    icon: CheckCircle,
    color: 'text-green-600 bg-green-100',
    label: 'Completed'
  },
  Confirmed: {
    icon: CheckCircle,
    color: 'text-blue-600 bg-blue-100',
    label: 'Confirmed'
  },
  Available: {
    icon: AlertCircle,
    color: 'text-amber-600 bg-amber-100',
    label: 'Available'
  },
  Confirming: {
    icon: Loader2,
    color: 'text-purple-600 bg-purple-100',
    label: 'Confirming...'
  }
};

export function LessonCard({ lesson, onTakeClass }: LessonCardProps) {
  const { takeClass, isLoading } = useStore();
  const status = statusConfig[lesson.status];
  const StatusIcon = status.icon;
  const date = parseISO(lesson.date);
  const isTaking = lesson.status === 'Confirming';

  const handleTakeClass = async () => {
    if (onTakeClass) {
      await onTakeClass(lesson.id);
    } else {
      await takeClass(lesson.id);
    }
  };

  return (
    <div className={cn(
      "bg-card rounded-xl border border-border p-5",
      "hover:shadow-md transition-all duration-200",
      "animate-in fade-in slide-in-from-bottom-2"
    )}>
      <div className="flex items-start justify-between gap-4">
        {/* Left - Date */}
        <div className="flex flex-col items-center min-w-[60px]">
          <span className="text-2xl font-bold text-foreground">
            {format(date, 'd')}
          </span>
          <span className="text-sm text-muted-foreground">
            {format(date, 'MMM')}
          </span>
        </div>

        {/* Middle - Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground line-clamp-1">
            {lesson.subject}
          </h3>

          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{format(date, 'h:mm a')}</span>
            </div>

            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{lesson.type}</span>
            </div>

            {lesson.students.length > 0 && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{lesson.students.join(', ')}</span>
              </div>
            )}

            {lesson.students.length === 0 && lesson.type === 'Available' && (
              <div className="flex items-center gap-1">
                <UserPlus className="w-4 h-4" />
                <span>Students needed</span>
              </div>
            )}
          </div>
        </div>

        {/* Right - Status/Action */}
        <div className="flex flex-col items-end gap-2">
          <span className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
            status.color
          )}>
            <StatusIcon className={cn("w-3.5 h-3.5", isTaking && "animate-spin")} />
            {status.label}
          </span>

          {lesson.type === 'Available' && lesson.status === 'Available' && (
            <button
              onClick={handleTakeClass}
              disabled={isLoading}
              className={cn(
                "px-4 py-2 bg-primary text-primary-foreground rounded-lg",
                "text-sm font-medium hover:bg-primary/90 transition-colors",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              Take Class
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

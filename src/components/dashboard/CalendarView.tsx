import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Lesson } from '../../types';
import { LessonCard } from './LessonCard';
import { useStore } from '../../store/useStore';
import { cn } from '../../lib/utils';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { Sheet, SheetContent } from '../ui/sheet';

interface CalendarViewProps {
  lessons: Lesson[];
  onTakeClass?: (id: string) => Promise<void>;
}

export function CalendarView({ lessons, onTakeClass }: CalendarViewProps) {
  const { t } = useTranslation();
  const { setSelectedMonth } = useStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Get month's lessons count per day
  const lessonsByDay = useMemo(() => {
    const map = new Map<string, Lesson[]>();
    lessons.forEach(lesson => {
      const dayKey = format(parseISO(lesson.date), 'yyyy-MM-dd');
      if (!map.has(dayKey)) {
        map.set(dayKey, []);
      }
      map.get(dayKey)!.push(lesson);
    });
    return map;
  }, [lessons]);

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    // Set the month filter to this day
    const monthIndex = day.getMonth();
    setSelectedMonth(monthIndex);
  };

  const handleSheetClose = () => {
    setSelectedDate(null);
  };

  // Get lessons for selected date
  const selectedDateLessons = useMemo(() => {
    if (!selectedDate) return [];
    const dayKey = format(selectedDate, 'yyyy-MM-dd');
    return lessonsByDay.get(dayKey) || [];
  }, [selectedDate, lessonsByDay]);

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1.5 text-sm hover:bg-accent rounded-lg transition-colors"
          >
            Today
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="py-3 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: calendarDays[0].getDay() }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="min-h-[100px] border-b border-r border-border bg-muted/20"
            />
          ))}

          {/* Calendar days */}
          {calendarDays.map(day => {
            const dayKey = format(day, 'yyyy-MM-dd');
            const dayLessons = lessonsByDay.get(dayKey) || [];
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            return (
              <button
                key={dayKey}
                onClick={() => handleDayClick(day)}
                className={cn(
                  "min-h-[100px] border-b border-r border-border p-2 text-left transition-colors",
                  "hover:bg-accent/50",
                  isSelected && "bg-primary/10",
                  !isSameMonth(day, currentMonth) && "text-muted-foreground bg-muted/10"
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-7 h-7 rounded-full text-sm",
                    isToday(day) && "bg-primary text-primary-foreground font-semibold"
                  )}
                >
                  {format(day, 'd')}
                </span>
                {dayLessons.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {dayLessons.slice(0, 3).map(lesson => (
                      <div
                        key={lesson.id}
                        className={cn(
                          "text-xs px-1.5 py-0.5 rounded truncate",
                          lesson.type === 'Available' && "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
                          lesson.type === 'Upcoming' && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
                          lesson.type === 'Historic' && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                        )}
                      >
                        {format(parseISO(lesson.date), 'h:mm')} {lesson.subject}
                      </div>
                    ))}
                    {dayLessons.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayLessons.length - 3} more
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sheet for selected date details */}
      <Sheet open={selectedDate !== null} onOpenChange={(open) => !open && handleSheetClose()}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d')}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('calendar.lessonsScheduled', { count: selectedDateLessons.length })}
                </p>
              </div>
            </div>

            {/* Lessons list */}
            {selectedDateLessons.length > 0 ? (
              <div className="space-y-3">
                {selectedDateLessons.map(lesson => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onTakeClass={onTakeClass}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">{t('calendar.noLessonsForDay')}</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

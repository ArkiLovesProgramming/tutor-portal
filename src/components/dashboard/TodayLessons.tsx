import type { Lesson } from '../../types';
import { LessonCard } from './LessonCard';
import { format, parseISO, isToday } from 'date-fns';
import { Calendar } from 'lucide-react';

interface TodayLessonsProps {
  lessons: Lesson[];
}

export function TodayLessons({ lessons }: TodayLessonsProps) {
  const todayLessons = lessons.filter(lesson => isToday(parseISO(lesson.date)));

  if (todayLessons.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Calendar className="w-5 h-5" />
          <h2 className="font-semibold">Today's Lessons</h2>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <p>No lessons scheduled for today</p>
          <p className="text-sm mt-1">Enjoy your free day!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-foreground">
          <Calendar className="w-5 h-5" />
          <h2 className="font-semibold">Today's Lessons</h2>
        </div>
        <span className="text-sm text-muted-foreground">
          {format(new Date(), 'EEEE, MMMM d')}
        </span>
      </div>

      <div className="space-y-3">
        {todayLessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}

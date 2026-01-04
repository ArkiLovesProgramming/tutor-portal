import { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { TodayLessons } from '../components/dashboard/TodayLessons';
import { LessonCard } from '../components/dashboard/LessonCard';
import { EmptyState } from '../components/dashboard/EmptyState';
import { MonthFilter } from '../components/dashboard/MonthFilter';
import { DateFilter } from '../components/dashboard/DateFilter';
import { useStore } from '../store/useStore';
import type { LessonType } from '../types';
import { cn } from '../lib/utils';
import { Loader2, RefreshCw } from 'lucide-react';
import { parseISO, isWithinInterval } from 'date-fns';
import { useTranslation } from 'react-i18next';

type TabType = 'historic' | 'upcoming' | 'available';

export function DashboardPage() {
  const { t } = useTranslation();
  const {
    lessons,
    isLoading,
    error,
    fetchLessons,
    takeClass,
    selectedMonth,
    dateRange
  } = useStore();

  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // Filter lessons based on selected month or date range
  const getFilteredLessons = (type: LessonType) => {
    let filtered = lessons.filter(l => l.type === type);

    if (dateRange.from && dateRange.to) {
      const from = dateRange.from;
      const to = dateRange.to;
      filtered = filtered.filter(l =>
        isWithinInterval(parseISO(l.date), { start: from, end: to })
      );
    } else if (selectedMonth !== null) {
      filtered = filtered.filter(l => {
        const lessonDate = parseISO(l.date);
        return lessonDate.getMonth() === selectedMonth;
      });
    }

    return filtered.sort((a, b) =>
      parseISO(a.date).getTime() - parseISO(b.date).getTime()
    );
  };

  const historicLessons = getFilteredLessons('Historic');
  const upcomingLessons = getFilteredLessons('Upcoming');
  const availableLessons = getFilteredLessons('Available');

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'historic', label: t('dashboard.tabs.historic'), count: historicLessons.length },
    { id: 'upcoming', label: t('dashboard.tabs.upcoming'), count: upcomingLessons.length },
    { id: 'available', label: t('dashboard.tabs.available'), count: availableLessons.length },
  ];

  const handleTakeClass = async (lessonId: string) => {
    try {
      await takeClass(lessonId);
    } catch (error) {
      console.error('Failed to take class:', error);
    }
  };

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-destructive text-lg mb-4">{error}</div>
          <button
            onClick={fetchLessons}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            {t('common.retry')}
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground">
              {t('dashboard.description')}
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <MonthFilter />
            <span className="text-muted-foreground">or</span>
            <DateFilter />
            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Today's Lessons */}
        <TodayLessons lessons={lessons} />

        {/* Tabs */}
        <div className="space-y-4">
          <div className="flex items-center gap-1 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
                <span className={cn(
                  "ml-2 px-2 py-0.5 rounded-full text-xs",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "bg-accent text-muted-foreground"
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-3">
                {activeTab === 'historic' && (
                  historicLessons.length > 0 ? (
                    historicLessons.map(lesson => (
                      <LessonCard key={lesson.id} lesson={lesson} />
                    ))
                  ) : (
                    <EmptyState type="historic" />
                  )
                )}

                {activeTab === 'upcoming' && (
                  upcomingLessons.length > 0 ? (
                    upcomingLessons.map(lesson => (
                      <LessonCard key={lesson.id} lesson={lesson} />
                    ))
                  ) : (
                    <EmptyState type="upcoming" />
                  )
                )}

                {activeTab === 'available' && (
                  availableLessons.length > 0 ? (
                    availableLessons.map(lesson => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        onTakeClass={handleTakeClass}
                      />
                    ))
                  ) : (
                    <EmptyState type="available" />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

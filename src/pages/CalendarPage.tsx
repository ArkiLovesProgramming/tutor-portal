import { useEffect } from 'react';
import { DashboardLayout } from '../components/layouts/DashboardLayout';
import { CalendarView } from '../components/dashboard/CalendarView';
import { useStore } from '../store/useStore';

export function CalendarPage() {
  const { lessons, isLoading, error, fetchLessons, takeClass } = useStore();

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

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
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <div className="text-destructive text-lg mb-4">{error}</div>
          <button
            onClick={fetchLessons}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Try Again
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">
            View your teaching schedule in a monthly calendar view
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <CalendarView
            lessons={lessons}
            onTakeClass={handleTakeClass}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

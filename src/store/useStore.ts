import { create } from 'zustand';
import type { Lesson, User, DateRange } from '../types';
import { api } from '../services/api';

interface DashboardState {
  // Data
  user: User | null;
  lessons: Lesson[];
  isLoading: boolean;
  error: string | null;

  // Filters
  selectedMonth: number | null; // 0-11, null means custom date range
  dateRange: DateRange;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchLessons: () => Promise<void>;
  takeClass: (lessonId: string) => Promise<void>;
  setSelectedMonth: (month: number | null) => void;
  setDateRange: (range: DateRange) => void;
}

export const useStore = create<DashboardState>((set, get) => ({
  // Initial state
  user: null,
  lessons: [],
  isLoading: false,
  error: null,
  selectedMonth: new Date().getMonth(),
  dateRange: { from: undefined, to: undefined },

  // Actions
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const user = await api.login(email, password);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: 'Invalid email or password', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({ user: null, lessons: [] });
  },

  fetchLessons: async () => {
    set({ isLoading: true, error: null });
    try {
      const lessons = await api.getLessons();
      set({ lessons, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch lessons', isLoading: false });
    }
  },

  takeClass: async (lessonId: string) => {
    const { user, lessons } = get();
    if (!user) return;

    // Save snapshot for rollback
    const previousLessons = [...lessons];

    // Optimistic update - immediately update UI
    set({
      lessons: lessons.map(l =>
        l.id === lessonId
          ? { ...l, status: 'Confirming' as const, tutor: user.name, type: 'Upcoming' as const }
          : l
      )
    });

    try {
      await api.assignLesson(lessonId, user.name);
    } catch (error) {
      // Rollback on failure
      set({ lessons: previousLessons });
      throw error;
    }
  },

  setSelectedMonth: (month: number | null) => {
    set({ selectedMonth: month, dateRange: { from: undefined, to: undefined } });
  },

  setDateRange: (range: DateRange) => {
    set({ selectedMonth: null, dateRange: range });
  }
}));

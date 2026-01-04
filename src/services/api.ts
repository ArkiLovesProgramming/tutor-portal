import type { Lesson, User } from '../types';
import { MOCK_LESSONS, MOCK_USER } from './mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory storage for mutations
let lessons = [...MOCK_LESSONS];

export const api = {
  // Login
  async login(email: string, _password: string): Promise<User> {
    await delay(800);
    if (email.includes('@')) {
      return MOCK_USER;
    }
    throw new Error('Invalid credentials');
  },

  // Get all lessons
  async getLessons(): Promise<Lesson[]> {
    await delay(500);
    return [...lessons];
  },

  // Assign a lesson to current tutor
  async assignLesson(lessonId: string, tutorName: string): Promise<Lesson> {
    await delay(1000); // Simulate network delay

    const lessonIndex = lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) {
      throw new Error('Lesson not found');
    }

    const updatedLesson: Lesson = {
      ...lessons[lessonIndex],
      tutor: tutorName,
      status: 'Confirmed',
      type: 'Upcoming'
    };

    lessons[lessonIndex] = updatedLesson;
    return updatedLesson;
  },

  // Reset lessons to initial state (for testing)
  resetLessons() {
    lessons = [...MOCK_LESSONS];
  }
};

export type LessonType = 'Historic' | 'Upcoming' | 'Available';
export type LessonStatus = 'Completed' | 'Confirmed' | 'Available' | 'Confirming';

export interface Lesson {
  id: string;
  date: string; // ISO datetime string
  type: LessonType;
  subject: string;
  students: string[];
  tutor: string | null;
  status: LessonStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

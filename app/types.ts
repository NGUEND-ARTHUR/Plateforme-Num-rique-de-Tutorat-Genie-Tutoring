// Genie Tutoring Types

export type Language = 'fr' | 'en';
export type Section = 'Francophone' | 'Anglophone';
export type UserRole = 'parent' | 'student' | 'tutor' | 'admin';
export type CourseStatus = 'Scheduled' | 'Ongoing' | 'Completed' | 'Cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  section: Section;
  parentId: string;
  avatar?: string;
  averageGrade?: number;
}

export interface Subject {
  id: string;
  name: string;
  icon?: string;
}

export interface Tutor extends User {
  role: 'tutor';
  subjects: string[];
  classes: string[];
  section: Section;
  experience: string;
  rating: number;
  hourlyRate: number;
  verified: boolean;
  availability?: string[];
  bio?: string;
}

export interface Course {
  id: string;
  studentId: string;
  tutorId: string;
  subjectId: string;
  date: string;
  time: string;
  duration: number;
  status: CourseStatus;
  meetingLink?: string;
}

export interface Objective {
  id: string;
  studentId: string;
  subjectId: string;
  title: string;
  description: string;
  targetDate: string;
  status: 'in_progress' | 'achieved';
  createdBy: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  value: number;
  date: string;
  period: string;
  tutorId: string;
}

export interface Homework {
  id: string;
  studentId: string;
  subjectId: string;
  title: string;
  description: string;
  deadline: string;
  status: 'pending' | 'completed';
  tutorId: string;
}

export interface Report {
  id: string;
  courseId: string;
  studentId: string;
  tutorId: string;
  date: string;
  attendance: boolean;
  topicsCovered: string[];
  comprehensionLevel: number;
  strengths: string[];
  difficulties: string[];
  homeworkAssigned: string[];
  recommendations: string;
}

export interface Feedback {
  id: string;
  courseId: string;
  fromUserId: string;
  tutorId: string;
  rating: number;
  comment: string;
  date: string;
  clarity?: boolean;
  punctuality?: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
}

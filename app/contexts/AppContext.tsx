import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/app/types';
import i18n from '../i18n';

type Language = 'en' | 'fr';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  fr: {
    // ... (French translations here, omitted for brevity)
  },
  en: {
    // App
    'app.title': 'Genie Tutoring',
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.myChildren': 'My Children',
    'nav.findTutor': 'Find a Tutor',
    'nav.schedule': 'Schedule a Course',
    'nav.courses': 'My Courses',
    'nav.virtualClassroom': 'Virtual Classroom',
    'nav.objectives': 'Objectives',
    'nav.grades': 'Grades & Assignments',
    'nav.reports': 'Reports',
    'nav.tracking': 'Reports & Tracking',
    'nav.messages': 'Messages',
    'nav.settings': 'Settings',
    'nav.students': 'My Students',
    'nav.myAvailability': 'Profile & Availability',
    'nav.pedagogicalTracking': 'Pedagogical Tracking',
    'nav.users': 'Users',
    'nav.tutorValidation': 'Tutors (validation)',
    'nav.studentsParents': 'Students & Parents',
    'nav.classesSubjects': 'Classes & Subjects',
    'nav.systemSettings': 'System Settings',
    'nav.logout': 'Logout',
    // Common
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    // ... (rest of English translations, omitted for brevity)
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('genie-lang');
    return (saved as Language) || (i18n.language as Language) || 'fr';
  });
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('genie-theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('genie-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('genie-lang', language);
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(language).catch(() => {});
    }
  }, [language]);

  useEffect(() => {
    localStorage.setItem('genie-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('genie-user', JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('genie-user');
  };

  const t = (key: string): string => {
    try {
      return i18n.t(key);
    } catch (e) {
      return translations[language]?.[key] || key;
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        currentUser,
        login,
        logout,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

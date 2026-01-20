import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, User, UserRole } from '@/app/types';

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

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // App
    'app.title': 'Genie Tutoring',
    
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.myChildren': 'Mes enfants',
    'nav.findTutor': 'Trouver un tuteur',
    'nav.schedule': 'Planifier un cours',
    'nav.courses': 'Mes cours',
    'nav.virtualClassroom': 'Classe virtuelle',
    'nav.objectives': 'Objectifs',
    'nav.grades': 'Notes & Devoirs',
    'nav.reports': 'Rapports',
    'nav.tracking': 'Rapports & Suivi',
    'nav.messages': 'Messages',
    'nav.settings': 'Paramètres',
    'nav.students': 'Mes élèves',
    'nav.myAvailability': 'Profil & Disponibilités',
    'nav.pedagogicalTracking': 'Suivi pédagogique',
    'nav.users': 'Utilisateurs',
    'nav.tutorValidation': 'Tuteurs (validation)',
    'nav.studentsParents': 'Élèves & Parents',
    'nav.classesSubjects': 'Classes & Matières',
    'nav.systemSettings': 'Paramètres système',
    'nav.logout': 'Déconnexion',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.register': 'Inscription',
    'auth.forgotPassword': 'Mot de passe oublié',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.phone': 'Téléphone',
    'auth.name': 'Nom complet',
    'auth.selectRole': 'Sélectionnez votre rôle',
    'auth.iAmStudent': 'Je suis Élève',
    'auth.iAmParent': 'Je suis Parent',
    'auth.iAmTutor': 'Je suis Tuteur',
    'auth.iAmAdmin': 'Je suis Administrateur',
    'auth.noAccount': 'Pas de compte ?',
    'auth.hasAccount': 'Déjà un compte ?',
    'auth.signUp': "S'inscrire",
    'auth.signIn': 'Se connecter',
    
    // Landing
    'landing.hero.title': 'Apprenez avec les meilleurs tuteurs',
    'landing.hero.subtitle': 'Plateforme de tutorat en ligne avec suivi personnalisé',
    'landing.cta.parent': 'Je suis Parent',
    'landing.cta.tutor': 'Je suis Tuteur',
    'landing.how.title': 'Comment ça marche ?',
    'landing.features.title': 'Nos Avantages',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenue',
    'dashboard.upcomingCourses': 'Cours à venir',
    'dashboard.progress': 'Progression',
    'dashboard.recentReports': 'Rapports récents',
    'dashboard.overview': "Vue d'ensemble",
    'dashboard.stats': 'Statistiques',
    
    // Common
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.view': 'Voir',
    'common.add': 'Ajouter',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.export': 'Exporter',
    'common.submit': 'Soumettre',
    'common.send': 'Envoyer',
    'common.close': 'Fermer',
    'common.confirm': 'Confirmer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.all': 'Tous',
    'common.none': 'Aucun',
    
    // Status
    'status.scheduled': 'Planifié',
    'status.ongoing': 'En cours',
    'status.completed': 'Terminé',
    'status.cancelled': 'Annulé',
    'status.pending': 'En attente',
    'status.validated': 'Validé',
    'status.rejected': 'Rejeté',
    
    // Messages
    'messages.title': 'Messagerie',
    'messages.conversations': 'Conversations',
    'messages.newMessage': 'Nouveau message',
    'messages.typeMessage': 'Tapez votre message...',
    'messages.noMessages': 'Aucun message',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.profile': 'Profil',
    'settings.account': 'Compte',
    'settings.notifications': 'Notifications',
    'settings.privacy': 'Confidentialité',
    'settings.language': 'Langue',
    'settings.theme': 'Thème',
    
    // Empty States
    'empty.noCourses': 'Aucun cours pour le moment',
    'empty.noStudents': 'Aucun élève',
    'empty.noTutors': 'Aucun tuteur',
    'empty.noReports': 'Aucun rapport',
    'empty.noMessages': 'Aucun message',
    
    // Tutors
    'tutors.find': 'Trouver un tuteur',
    'tutors.verified': 'Vérifié',
    'tutors.experience': 'Expérience',
    'tutors.hourlyRate': 'Tarif horaire',
    'tutors.bookCourse': 'Réserver un cours',
    'tutors.profile': 'Profil',
    
    // Courses
    'courses.title': 'Cours',
    'courses.upcoming': 'À venir',
    'courses.past': 'Passés',
    'courses.join': 'Rejoindre',
    'courses.schedule': 'Planifier',
    
    // Reports
    'reports.title': 'Rapports',
    'reports.create': 'Créer un rapport',
    'reports.view': 'Voir le rapport',
    
    // Virtual Classroom
    'classroom.title': 'Classe virtuelle',
    'classroom.live': 'En direct',
    'classroom.chat': 'Chat',
    'classroom.whiteboard': 'Tableau blanc',
    'classroom.shareScreen': 'Partager écran',
    'classroom.leave': 'Quitter',
    
    // Admin
    'admin.dashboard': 'Dashboard Admin',
    'admin.validate': 'Valider',
    'admin.reject': 'Rejeter',
    'admin.pending': 'En attente',
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
    'nav.grades': 'Grades & Homework',
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
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.forgotPassword': 'Forgot Password',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.phone': 'Phone',
    'auth.name': 'Full Name',
    'auth.selectRole': 'Select your role',
    'auth.iAmStudent': "I'm a Student",
    'auth.iAmParent': "I'm a Parent",
    'auth.iAmTutor': "I'm a Tutor",
    'auth.iAmAdmin': "I'm an Administrator",
    'auth.noAccount': 'No account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.signUp': 'Sign up',
    'auth.signIn': 'Sign in',
    
    // Landing
    'landing.hero.title': 'Learn with the best tutors',
    'landing.hero.subtitle': 'Online tutoring platform with personalized tracking',
    'landing.cta.parent': "I'm a Parent",
    'landing.cta.tutor': "I'm a Tutor",
    'landing.how.title': 'How does it work?',
    'landing.features.title': 'Our Advantages',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.upcomingCourses': 'Upcoming Courses',
    'dashboard.progress': 'Progress',
    'dashboard.recentReports': 'Recent Reports',
    'dashboard.overview': 'Overview',
    'dashboard.stats': 'Statistics',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
    'common.submit': 'Submit',
    'common.send': 'Send',
    'common.close': 'Close',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.all': 'All',
    'common.none': 'None',
    
    // Status
    'status.scheduled': 'Scheduled',
    'status.ongoing': 'Ongoing',
    'status.completed': 'Completed',
    'status.cancelled': 'Cancelled',
    'status.pending': 'Pending',
    'status.validated': 'Validated',
    'status.rejected': 'Rejected',
    
    // Messages
    'messages.title': 'Messages',
    'messages.conversations': 'Conversations',
    'messages.newMessage': 'New message',
    'messages.typeMessage': 'Type your message...',
    'messages.noMessages': 'No messages',
    
    // Settings
    'settings.title': 'Settings',
    'settings.profile': 'Profile',
    'settings.account': 'Account',
    'settings.notifications': 'Notifications',
    'settings.privacy': 'Privacy',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    
    // Empty States
    'empty.noCourses': 'No courses yet',
    'empty.noStudents': 'No students',
    'empty.noTutors': 'No tutors',
    'empty.noReports': 'No reports',
    'empty.noMessages': 'No messages',
    
    // Tutors
    'tutors.find': 'Find a tutor',
    'tutors.verified': 'Verified',
    'tutors.experience': 'Experience',
    'tutors.hourlyRate': 'Hourly rate',
    'tutors.bookCourse': 'Book a course',
    'tutors.profile': 'Profile',
    
    // Courses
    'courses.title': 'Courses',
    'courses.upcoming': 'Upcoming',
    'courses.past': 'Past',
    'courses.join': 'Join',
    'courses.schedule': 'Schedule',
    
    // Reports
    'reports.title': 'Reports',
    'reports.create': 'Create report',
    'reports.view': 'View report',
    
    // Virtual Classroom
    'classroom.title': 'Virtual Classroom',
    'classroom.live': 'Live',
    'classroom.chat': 'Chat',
    'classroom.whiteboard': 'Whiteboard',
    'classroom.shareScreen': 'Share screen',
    'classroom.leave': 'Leave',
    
    // Admin
    'admin.dashboard': 'Admin Dashboard',
    'admin.validate': 'Validate',
    'admin.reject': 'Reject',
    'admin.pending': 'Pending',
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('genie-lang');
    return (saved as Language) || 'fr';
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
    return translations[language][key] || key;
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

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// ...existing code...
import {
  GraduationCap,
  Home,
  Users,
  Calendar,
  Video,
  Target,
  ClipboardList,
  MessageSquare,
  Settings,
  BookOpen,
  Search,
  Menu,
  X,
  Bell,
  Moon,
  Sun,
  Languages,
  LogOut,
  UserPlus,
  TrendingUp,
} from 'lucide-react';

interface NavItem {
  icon: any;
  label: string;
  path: string;
}

export default function DashboardLayout({ children, role }: { children: React.ReactNode; role: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, currentUser, logout, language, setLanguage, theme, setTheme } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems: NavItem[] = 
    role === 'parent'
      ? [
          { icon: Home, label: t('nav.dashboard'), path: '/parent/dashboard' },
          { icon: Users, label: t('nav.myChildren'), path: '/parent/children' },
          { icon: Search, label: t('nav.findTutor'), path: '/parent/tutors' },
          { icon: Calendar, label: t('nav.schedule'), path: '/parent/schedule' },
          { icon: BookOpen, label: t('nav.courses'), path: '/parent/courses' },
          { icon: ClipboardList, label: t('nav.tracking'), path: '/parent/reports' },
          { icon: MessageSquare, label: t('nav.messages'), path: '/parent/messages' },
          { icon: Settings, label: t('nav.settings'), path: '/parent/settings' },
        ]
      : role === 'student'
      ? [
          { icon: Home, label: t('nav.dashboard'), path: '/student/dashboard' },
          { icon: BookOpen, label: t('nav.courses'), path: '/student/courses' },
          { icon: Video, label: t('nav.virtualClassroom'), path: '/student/classroom' },
          { icon: Target, label: t('nav.objectives'), path: '/student/objectives' },
          { icon: ClipboardList, label: t('nav.grades'), path: '/student/grades' },
          { icon: MessageSquare, label: t('nav.messages'), path: '/student/messages' },
          { icon: Settings, label: t('nav.settings'), path: '/student/settings' },
        ]
      : role === 'tutor'
      ? [
          { icon: Home, label: t('nav.dashboard'), path: '/tutor/dashboard' },
          { icon: Users, label: t('nav.students'), path: '/tutor/students' },
          { icon: Calendar, label: t('nav.courses'), path: '/tutor/courses' },
          { icon: Video, label: t('nav.virtualClassroom'), path: '/tutor/classroom' },
          { icon: TrendingUp, label: t('nav.pedagogicalTracking'), path: '/tutor/tracking' },
          { icon: ClipboardList, label: t('nav.reports'), path: '/tutor/reports' },
          { icon: MessageSquare, label: t('nav.messages'), path: '/tutor/messages' },
          { icon: Settings, label: t('nav.myAvailability'), path: '/tutor/profile' },
        ]
      : [
          { icon: Home, label: t('nav.dashboard'), path: '/admin/dashboard' },
          { icon: Users, label: t('nav.users'), path: '/admin/users' },
          { icon: Users, label: t('nav.adminUserManagement', 'User Management'), path: '/admin/user-management' },
          { icon: BookOpen, label: t('nav.adminClassSubjectManagement', 'Class & Subject Management'), path: '/admin/class-subject-management' },
          { icon: UserPlus, label: t('nav.tutorValidation'), path: '/admin/validation' },
          { icon: Users, label: t('nav.studentsParents'), path: '/admin/students-parents' },
          { icon: BookOpen, label: t('nav.classesSubjects'), path: '/admin/classes' },
          { icon: Calendar, label: t('nav.courses'), path: '/admin/courses' },
          { icon: ClipboardList, label: t('nav.reports'), path: '/admin/reports' },
          { icon: Settings, label: t('nav.systemSettings'), path: '/admin/settings' },
          { icon: Settings, label: t('nav.userSettings', 'User Settings'), path: '/admin/user-settings' },
        ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 border-r bg-white dark:bg-gray-900">
        <div className="p-4 border-b flex items-center gap-2">
          <GraduationCap className="size-8 text-indigo-600" />
          <span className="text-xl font-semibold">{t('app.title')}</span>
        </div>
        <ScrollArea className="flex-1">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 size-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <Separator className="my-4" />
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 size-5" />
              {t('nav.logout')}
            </Button>
          </nav>
        </ScrollArea>
      </aside>

      {/* Mobile Sidebar */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 h-full bg-white dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-8 text-indigo-600" />
                <span className="text-xl font-semibold">{t('app.title')}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 size-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Separator className="my-4" />
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 size-5" />
                {t('nav.logout')}
              </Button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-white dark:bg-gray-900 p-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold capitalize">
                {role} {t('nav.dashboard')}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('dashboard.welcome')}, {currentUser?.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            >
              <Languages className="size-5 mr-2" />
              <span className="hidden sm:inline">{language.toUpperCase()}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="size-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Avatar className="size-8">
                    <AvatarFallback>
                      {currentUser?.name?.substring(0, 2).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div>
                    <p className="font-medium">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/${role}/settings`)}>
                  <Settings className="mr-2 size-4" />
                  {t('nav.settings')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 size-4" />
                  {t('nav.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-950 overflow-auto">
          {children}
        </main>

        {/* Mobile Bottom Nav */}
        {isMobile && (
          <nav className="border-t bg-white dark:bg-gray-900 p-2 flex items-center justify-around md:hidden">
            {navItems.slice(0, 5).map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? 'default' : 'ghost'}
                  size="sm"
                  className="flex-col h-auto py-2 px-3"
                >
                  <item.icon className="size-5 mb-1" />
                  <span className="text-xs">{item.label.split(' ')[0]}</span>
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

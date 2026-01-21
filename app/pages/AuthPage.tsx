import { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Users, UserCheck, ShieldCheck, BookOpen } from 'lucide-react';
import { UserRole } from '@/types';

const ROLE_CONFIG = {
  student: {
    icon: BookOpen,
    color: 'bg-blue-500 hover:bg-blue-600',
    activeColor: 'ring-blue-500 bg-blue-50 dark:bg-blue-900/20',
  },
  parent: {
    icon: Users,
    color: 'bg-green-500 hover:bg-green-600',
    activeColor: 'ring-green-500 bg-green-50 dark:bg-green-900/20',
  },
  tutor: {
    icon: UserCheck,
    color: 'bg-purple-500 hover:bg-purple-600',
    activeColor: 'ring-purple-500 bg-purple-50 dark:bg-purple-900/20',
  },
  admin: {
    icon: ShieldCheck,
    color: 'bg-orange-500 hover:bg-orange-600',
    activeColor: 'ring-orange-500 bg-orange-50 dark:bg-orange-900/20',
  },
};

export default function AuthPage(props) {
    // Helper for sign up link
    const signUpLink = (
      <span>
        {t('auth.noAccount')}{' '}
        <Button
          variant="link"
          className="p-0 h-auto"
          onClick={() => navigate('/register')}
        >
          {t('auth.signUp')}
        </Button>
      </span>
    );
  const { login } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const type = location.pathname.includes('/register') ? 'register' : 'login';
  const [selectedRole, setSelectedRole] = useState<UserRole>((searchParams.get('role') as UserRole) || 'parent');
  // If admin is selected and type is register, force type to login
  const isAdmin = selectedRole === 'admin';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login
    const mockUser = {
      id: '1',
      name: formData.name || 'Utilisateur Test',
      email: formData.email,
      role: selectedRole,
      avatar: '',
    };
    
    login(mockUser);
    navigate(`/${selectedRole}/dashboard`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="size-12 text-indigo-600" />
          </div>
          <CardTitle className="text-center text-2xl">
            {type === 'login' ? t('auth.login') : t('auth.register')}
          </CardTitle>
          <CardDescription className="text-center">{t('app.title')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-base">{t('auth.selectRole')}</Label>
              <div className="grid grid-cols-2 gap-3">
                {(['student', 'parent', 'tutor', 'admin'] as UserRole[]).map((role) => {
                  const config = ROLE_CONFIG[role];
                  const Icon = config.icon;
                  const isActive = selectedRole === role;
                  
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`
                        relative p-4 border-2 rounded-lg transition-all
                        ${isActive ? `${config.activeColor} ring-2` : 'hover:bg-gray-50 dark:hover:bg-gray-800'}
                      `}
                    >
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className={`p-2 rounded-full ${isActive ? config.color.split(' ')[0] : 'bg-gray-100 dark:bg-gray-800'}`}>
                          <Icon className={`size-6 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />
                        </div>
                        <span className={`text-sm font-medium ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                          {t(`auth.iAm${role.charAt(0).toUpperCase() + role.slice(1)}`)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Fields */}
            {type === 'register' && !isAdmin && (
              <div className="space-y-2">
                <Label htmlFor="name">{t('auth.name')}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Jean Dupont"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {/* If admin and register, show info */}
            {type === 'register' && isAdmin && (
              <div className="text-center text-red-500 font-medium py-2">
                {t('auth.adminLoginOnly', 'Les administrateurs ne peuvent que se connecter.')} 
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {type === 'register' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('auth.phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <Button type="submit" className="w-full" size="lg">
              {type === 'login' ? t('auth.login') : t('auth.register')}
            </Button>

            {type === 'login' && (
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => navigate('/forgot-password')}
              >
                {t('auth.forgotPassword')}
              </Button>
            )}

            <div className="text-center text-sm">
              {type === 'login'
                ? (!isAdmin ? signUpLink : null)
                : (
                  <span>
                    {t('auth.hasAccount')}{' '}
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => navigate('/login')}
                    >
                      {t('auth.signIn')}
                    </Button>
                  </span>
                )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

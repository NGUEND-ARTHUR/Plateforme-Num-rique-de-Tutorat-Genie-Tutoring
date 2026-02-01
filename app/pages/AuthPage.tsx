import React, { useState } from 'react';
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
  const { login } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Helper for sign up link (defined after hooks to avoid temporal dead zone)
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
  const [uploadedDocs, setUploadedDocs] = useState([] as Array<{ name: string; content: string }>);
  const [availableParents, setAvailableParents] = useState<Array<any>>([]);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [newParent, setNewParent] = useState({ name: '', email: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If registering as tutor, persist uploaded documents into pending tutors list
      if (selectedRole === 'tutor' && location.pathname.includes('/register')) {
      const pendingKey = 'genie-pending-tutors';
      const existing = localStorage.getItem(pendingKey);
      const pending = existing ? JSON.parse(existing) : [];

      const tutorRecord = {
        id: `tutor_${Date.now()}`,
        name: formData.name || 'Tuteur Test',
        email: formData.email,
        phone: formData.phone,
        role: 'tutor',
        verificationStatus: 'PENDING_VERIFICATION',
        documents: uploadedDocs,
        createdAt: new Date().toISOString(),
      };

      pending.push(tutorRecord);
      localStorage.setItem(pendingKey, JSON.stringify(pending));

      // Log the tutor in locally with pending status
      login({ id: tutorRecord.id, name: tutorRecord.name, email: tutorRecord.email, role: 'tutor', verificationStatus: tutorRecord.verificationStatus });
      navigate('/tutor/dashboard');
      return;
    }

    // If registering as student, persist student and link to parent if provided
    if (selectedRole === 'student' && location.pathname.includes('/register')) {
      const key = 'genie-students';
      const existing = localStorage.getItem(key);
      const arr = existing ? JSON.parse(existing) : [];
      const studentRecord = {
        id: `student_${Date.now()}`,
        name: formData.name || 'Étudiant Test',
        email: formData.email,
        phone: formData.phone,
        role: 'student',
        parentId: selectedParentId,
        createdAt: new Date().toISOString(),
      };
      arr.push(studentRecord);
      localStorage.setItem(key, JSON.stringify(arr));

      // Log the student in locally
      login({ id: studentRecord.id, name: studentRecord.name, email: studentRecord.email, role: 'student' });
      navigate('/student/dashboard');
      return;
    }

    // Simulate login for other roles
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

  React.useEffect(() => {
    const raw = localStorage.getItem('genie-parents');
    const list = raw ? JSON.parse(raw) : [];
    setAvailableParents(list);
    if (list.length > 0 && !selectedParentId) setSelectedParentId(list[0].id);
  }, []);

  const handleAddParent = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newParent.name || !newParent.email) return;
    const key = 'genie-parents';
    const existing = localStorage.getItem(key);
    const arr = existing ? JSON.parse(existing) : [];
    const record = { id: `parent_${Date.now()}`, ...newParent };
    arr.push(record);
    localStorage.setItem(key, JSON.stringify(arr));
    setAvailableParents(arr);
    setSelectedParentId(record.id);
    setNewParent({ name: '', email: '', phone: '' });
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
                {/* Tutor-specific uploads */}
                {selectedRole === 'tutor' && (
                  <div className="space-y-2">
                    <Label htmlFor="tutorDocs">Documents pour validation (CV, pièce d'identité)</Label>
                      <input
                        id="tutorDocs"
                        aria-label="Documents pour validation"
                        title="Documents pour validation (CV, pièce d'identité)"
                        type="file"
                        multiple
                        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                          const files = e.target.files;
                          if (!files) return;
                          const arr = [] as Array<{ name: string; content: string }>;
                          for (let i = 0; i < files.length; i++) {
                            const f = files[i];
                            const data = await new Promise<string>((res) => {
                              const reader = new FileReader();
                              reader.onload = () => res(String(reader.result));
                              reader.readAsDataURL(f);
                            });
                            arr.push({ name: f.name, content: data });
                          }
                          setUploadedDocs(arr);
                        }}
                      />
                    {uploadedDocs.length > 0 && (
                      <ul className="text-sm mt-2">
                        {uploadedDocs.map((d) => (
                          <li key={d.name}>{d.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                {/* Student parent-link UI */}
                {selectedRole === 'student' && (
                  <div className="space-y-3">
                    <Label>Associer un parent</Label>
                    {availableParents.length > 0 ? (
                      <div className="flex gap-2 items-center">
                        <select id="parentSelect" title="Sélectionner un parent" aria-label="Sélectionner un parent" value={selectedParentId || ''} onChange={(e) => setSelectedParentId(e.target.value)} className="border rounded p-2">
                          {availableParents.map((p) => (
                            <option key={p.id} value={p.id}>{p.name} — {p.email}</option>
                          ))}
                        </select>
                        <span className="text-sm text-gray-500">ou</span>
                        <button type="button" className="underline text-sm" onClick={() => setSelectedParentId(null)}>Ajouter un nouveau parent</button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Aucun parent trouvé — ajoutez-en un ci-dessous.</p>
                    )}

                    {selectedParentId === null && (
                      <form onSubmit={handleAddParent} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Input placeholder="Nom du parent" value={newParent.name} onChange={(e) => setNewParent({ ...newParent, name: e.target.value })} required />
                        <Input placeholder="Email du parent" type="email" value={newParent.email} onChange={(e) => setNewParent({ ...newParent, email: e.target.value })} required />
                        <div className="flex gap-2">
                          <Input placeholder="Téléphone" value={newParent.phone} onChange={(e) => setNewParent({ ...newParent, phone: e.target.value })} />
                          <Button type="submit">Ajouter</Button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
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

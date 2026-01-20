import { useNavigate } from 'react-router-dom';
import { useApp } from '@/app/contexts/AppContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { GraduationCap, Users, Video, BarChart3, MessageSquare, Languages, Moon, Sun } from 'lucide-react';

export default function LandingPage() {
  const { t, language, setLanguage, theme, setTheme } = useApp();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-8 text-indigo-600" />
            <span className="text-2xl font-semibold">{t('app.title')}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            >
              <Languages className="size-5 mr-2" />
              {language.toUpperCase()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
            </Button>
            <Button variant="outline" onClick={() => navigate('/login')}>
              {t('auth.login')}
            </Button>
            <Button onClick={() => navigate('/register')}>
              {t('auth.register')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {t('landing.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => navigate('/register?role=parent')}>
              <Users className="mr-2 size-5" />
              {t('landing.cta.parent')}
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/register?role=tutor')}>
              <GraduationCap className="mr-2 size-5" />
              {t('landing.cta.tutor')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('landing.features.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Video} 
              title={language === 'fr' ? 'Classe Virtuelle' : 'Virtual Classroom'} 
              description={language === 'fr' ? 'Cours en direct avec partage d\'écran et tableau blanc' : 'Live courses with screen sharing and whiteboard'} 
            />
            <FeatureCard 
              icon={BarChart3} 
              title={language === 'fr' ? 'Suivi Pédagogique' : 'Pedagogical Tracking'} 
              description={language === 'fr' ? 'Objectifs, notes et rapports détaillés' : 'Objectives, grades and detailed reports'} 
            />
            <FeatureCard 
              icon={MessageSquare} 
              title="Communication" 
              description={language === 'fr' ? 'Messagerie directe avec les tuteurs' : 'Direct messaging with tutors'} 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2026 Genie Tutoring. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            <Icon className="size-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

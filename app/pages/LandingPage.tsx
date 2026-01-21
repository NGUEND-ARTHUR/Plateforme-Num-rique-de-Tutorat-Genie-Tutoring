import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, Video, BarChart3, MessageSquare, Languages, Moon, Sun } from 'lucide-react';

export default function LandingPage() {
  const { theme, setTheme } = useApp();
  const { t, i18n } = useTranslation();
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
              onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')}
            >
              <Languages className="size-5 mr-2" />
              {i18n.language.toUpperCase()}
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
            <Link to="/register?role=parent">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Users className="mr-2 size-5" />
                {t('landing.cta.parent')}
              </Button>
            </Link>
            <Link to="/login?role=student">
              <Button size="lg" variant="outline">
                <GraduationCap className="mr-2 size-5" />
                {t('landing.cta.student')}
              </Button>
            </Link>
            <Link to="/register?role=tutor">
              <Button size="lg" variant="outline">
                <GraduationCap className="mr-2 size-5" />
                {t('landing.cta.tutor')}
              </Button>
            </Link>
            <Link to="/login?role=admin">
              <Button size="lg" variant="outline">
                <GraduationCap className="mr-2 size-5" />
                {t('landing.cta.admin')}
              </Button>
            </Link>
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
              title={t('features.virtualClassroom.title')} 
              description={t('features.virtualClassroom.desc')} 
            />
            <FeatureCard 
              icon={BarChart3} 
              title={t('features.pedagogicalTracking.title')} 
              description={t('features.pedagogicalTracking.desc')} 
            />
            <FeatureCard 
              icon={MessageSquare} 
              title={t('features.communication.title')} 
              description={t('features.communication.desc')} 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* Advertisement / Offers Section */}
      <section className="py-16 bg-indigo-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('landing.offers.title', 'Our Offers')}</h2>
          {/* Replace the mockOffers array with dynamic data from admin in the future */}
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: t('offers.starter.title', 'Starter Pack'),
              desc: t('offers.starter.desc', 'Perfect for new students. Includes 2 free trial sessions.'),
              price: '0€',
            }, {
              title: t('offers.standard.title', 'Standard Plan'),
              desc: t('offers.standard.desc', 'Weekly online classes, progress tracking, and parent reports.'),
              price: '49€/mois',
            }, {
              title: t('offers.premium.title', 'Premium Plan'),
              desc: t('offers.premium.desc', 'Unlimited classes, dedicated tutor, and advanced analytics.'),
              price: '99€/mois',
            }].map((offer, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 flex flex-col items-center text-center">
                <h3 className="font-bold text-xl mb-2">{offer.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{offer.desc}</p>
                <div className="text-3xl font-bold text-indigo-600 mb-4">{offer.price}</div>
                <Button size="lg" className="w-full max-w-xs">{t('landing.offers.cta', 'Get Started')}</Button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8 text-sm">{t('landing.offers.note', 'Offers are managed by the admin and may change at any time.')}</p>
        </div>
      </section>
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

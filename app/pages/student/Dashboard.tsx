import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Award, Video, Clock } from 'lucide-react';

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={`p-3 ${color} rounded-lg`}>
            <Icon className="size-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">{t('dashboard.welcome')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.overview')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={BookOpen} label="Cours cette semaine" value="3" color="bg-blue-500" />
        <StatCard icon={Target} label={t('nav.objectives') + ' atteints'} value="7/10" color="bg-green-500" />
        <StatCard icon={Award} label="Moyenne" value="85%" color="bg-purple-500" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prochain cours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                <BookOpen className="size-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="font-medium">Mathématiques</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">avec Marie Lambert</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="size-4 text-gray-400" />
                  <span className="text-sm">Aujourd'hui à 14:00</span>
                </div>
              </div>
            </div>
            <Button>
              <Video className="mr-2 size-4" />
              {t('courses.join')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

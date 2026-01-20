import { useApp } from '@/app/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Progress } from '@/app/components/ui/progress';
import { Users, Calendar, TrendingUp, Clock, BookOpen, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockStudents = [
  { id: '1', name: 'Sophie Martin', class: 'CE1', section: 'Francophone', averageGrade: 85 },
  { id: '2', name: 'Lucas Dubois', class: 'CE2', section: 'Francophone', averageGrade: 78 },
];

const mockCourses = [
  { id: 'c1', studentName: 'Sophie Martin', tutorName: 'Marie Lambert', subject: 'Mathématiques', date: '2026-01-16', time: '14:00' },
  { id: 'c2', studentName: 'Lucas Dubois', tutorName: 'Jean Dupont', subject: 'Français', date: '2026-01-17', time: '16:00' },
];

const progressData = [
  { month: 'Sep', value: 70 },
  { month: 'Oct', value: 75 },
  { month: 'Nov', value: 78 },
  { month: 'Dec', value: 82 },
  { month: 'Jan', value: 85 },
];

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

export default function ParentDashboard() {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">{t('nav.dashboard')}</h2>
        <p className="text-gray-600 dark:text-gray-400">{t('dashboard.overview')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard icon={Users} label={t('nav.myChildren')} value="2" color="bg-blue-500" />
        <StatCard icon={Calendar} label={t('dashboard.upcomingCourses')} value="4" color="bg-green-500" />
        <StatCard icon={TrendingUp} label="Moyenne générale" value="81.5%" color="bg-purple-500" />
        <StatCard icon={Clock} label="Heures ce mois" value="12h" color="bg-orange-500" />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Children Cards */}
        <Card>
          <CardHeader>
            <CardTitle>{t('nav.myChildren')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {student.class} - {student.section}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-indigo-600">{student.averageGrade}%</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Moyenne</p>
                </div>
              </div>
            ))}
            <Link to="/parent/children">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 size-4" />
                {t('common.view')} {t('nav.myChildren')}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.progress')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Courses */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t('dashboard.upcomingCourses')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                      <BookOpen className="size-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium">{course.studentName}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {course.subject} avec {course.tutorName}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="size-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {course.date} à {course.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button>
                    <Video className="mr-2 size-4" />
                    {t('courses.join')}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

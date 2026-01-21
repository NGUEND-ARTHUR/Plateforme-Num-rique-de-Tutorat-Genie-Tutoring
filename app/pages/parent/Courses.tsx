import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Video, Clock, User } from 'lucide-react';

const mockCourses = [
	{
		id: '1',
		student: 'Sophie Martin',
		tutor: 'Marie Lambert',
		subject: 'Mathématiques',
		date: '2026-01-16',
		time: '14:00',
		status: 'Scheduled',
		duration: 60,
	},
	{
		id: '2',
		student: 'Lucas Dubois',
		tutor: 'Jean Dupont',
		subject: 'Français',
		date: '2026-01-17',
		time: '16:00',
		status: 'Scheduled',
		duration: 60,
	},
	{
		id: '3',
		student: 'Sophie Martin',
		tutor: 'Marie Lambert',
		subject: 'Mathématiques',
		date: '2026-01-10',
		time: '14:00',
		status: 'Completed',
		duration: 60,
	},
];

export default function ParentCourses() {
	const { t } = useTranslation();

	const upcomingCourses = mockCourses.filter((c) => c.status === 'Scheduled');
	const pastCourses = mockCourses.filter((c) => c.status === 'Completed');

	   return (
		   <div className="space-y-6">
			   <div>
				   <h2 className="text-2xl font-semibold mb-1">{t('nav.courses')}</h2>
				   <p className="text-gray-600 dark:text-gray-400">
					   {t('courses.manage', "Manage all your children's courses")}
				   </p>
			   </div>

			   <Tabs defaultValue="upcoming">
				   <TabsList>
					   <TabsTrigger value="upcoming">
						   {t('courses.upcoming')} ({upcomingCourses.length})
					   </TabsTrigger>
					   <TabsTrigger value="past">
						   {t('courses.past')} ({pastCourses.length})
					   </TabsTrigger>
				   </TabsList>

				   <TabsContent value="upcoming" className="space-y-4">
					   {upcomingCourses.length === 0 ? (
						   <div className="text-center text-gray-500 py-8">{t('empty.noUpcomingCourses', 'No upcoming courses.')}</div>
					   ) : (
						   upcomingCourses.map((course) => (
							   <Card key={course.id}>
								   <CardContent className="pt-6">
									   <div className="flex items-center justify-between">
										   <div className="flex items-center gap-4">
											   <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
												   <Calendar className="size-6 text-indigo-600 dark:text-indigo-400" />
											   </div>
											   <div>
												   <h3 className="font-semibold text-lg">
													   {course.subject}
												   </h3>
												   <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
													   <div className="flex items-center gap-1">
														   <User className="size-4" />
														   <span>{course.student}</span>
													   </div>
													   <div className="flex items-center gap-1">
														   <Clock className="size-4" />
														   <span>
															   {course.date} à {course.time}
														   </span>
													   </div>
												   </div>
												   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
													   avec {course.tutor}
												   </p>
											   </div>
										   </div>
										   <div className="flex items-center gap-2">
											   <Badge>{course.status}</Badge>
											   <Button>
												   <Video className="mr-2 size-4" />
												   {t('courses.join')}
											   </Button>
										   </div>
									   </div>
								   </CardContent>
							   </Card>
						   ))
					   )}
				   </TabsContent>

				   <TabsContent value="past" className="space-y-4">
					   {pastCourses.length === 0 ? (
						   <div className="text-center text-gray-500 py-8">{t('empty.noPastCourses', 'No past courses.')}</div>
					   ) : (
						   pastCourses.map((course) => (
							   <Card key={course.id}>
								   <CardContent className="pt-6">
									   <div className="flex items-center justify-between">
										   <div className="flex items-center gap-4">
											   <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
												   <Calendar className="size-6 text-gray-600 dark:text-gray-400" />
											   </div>
											   <div>
												   <h3 className="font-semibold text-lg">
													   {course.subject}
												   </h3>
												   <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
													   <div className="flex items-center gap-1">
														   <User className="size-4" />
														   <span>{course.student}</span>
													   </div>
													   <div className="flex items-center gap-1">
														   <Clock className="size-4" />
														   <span>
															   {course.date} à {course.time}
														   </span>
													   </div>
												   </div>
												   <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
													   avec {course.tutor}
												   </p>
											   </div>
										   </div>
										   <div className="flex items-center gap-2">
											   <Badge variant="secondary">{course.status}</Badge>
											   <Button variant="outline">
												   {t('common.view')} rapport
											   </Button>
										   </div>
									   </div>
								   </CardContent>
							   </Card>
						   ))
					   )}
				   </TabsContent>
			   </Tabs>
		   </div>
	   );
}

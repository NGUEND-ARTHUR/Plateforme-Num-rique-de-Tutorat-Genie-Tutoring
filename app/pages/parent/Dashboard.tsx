import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import * as React from 'react';
import { BookOpen, Target, Award, Users, Clock, Video } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

// Minimal StatCard component to avoid missing-reference runtime errors
function StatCard(props) {
	const { title, label, value, icon } = props || {}
	const heading = title ?? label
	const Icon = icon
	return (
				<Card>
			<CardHeader>
				<CardTitle>{heading}</CardTitle>
			</CardHeader>
			<CardContent className="flex items-center justify-between">
				<div className="text-2xl font-semibold">{value}</div>
				<div className="text-muted-foreground">{Icon ? <Icon className="w-6 h-6" /> : null}</div>
			</CardContent>
		</Card>
	)
}

// Lightweight mock data so dashboard renders during QA
const upcomingCourses = [
	{ id: '1', title: 'Math - Algebra', date: '2026-02-02', tutor: 'Mme. Dupont' },
	{ id: '2', title: 'Physics - Mechanics', date: '2026-02-05', tutor: 'M. Martin' },
];

const mockStudents = [
	{ id: 's1', name: 'Jean Dupont', class: '4ème', section: 'A', averageGrade: 88 },
	{ id: 's2', name: 'Marie Curie', class: '3ème', section: 'B', averageGrade: 92 },
];
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
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>{t('nav.myChildren')}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{mockStudents.length === 0 ? (
							<div className="text-center text-gray-500 py-8">{t('empty.noChildren', 'No children found.')}</div>
						) : (
							<>
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
								<RouterLink to="/parent/children">
									<Button variant="outline" className="w-full">
										<Users className="mr-2 size-4" />
										{t('common.view')} {t('nav.myChildren')}
									</Button>
								</RouterLink>
							</>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>{t('dashboard.progress')}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-48 flex items-center justify-center text-sm text-gray-500">
							{t('dashboard.progress_placeholder', 'Progress chart placeholder')}
						</div>
					</CardContent>
				</Card>
				<Card className="md:col-span-2">
					<CardHeader>
						<CardTitle>{t('dashboard.upcomingCourses')}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{upcomingCourses.length === 0 ? (
							<div className="text-center text-gray-500 py-8">{t('empty.noCourses', 'No upcoming courses.')}</div>
						) : (
							upcomingCourses.map((course) => (
								<div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
									<div className="flex items-center gap-4">
										<div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
											<BookOpen className="size-6 text-indigo-600 dark:text-indigo-400" />
										</div>
										<div>
											<p className="font-medium">{course.title}</p>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{course.title} avec {course.tutor}
											</p>
											<div className="flex items-center gap-2 mt-1">
												<Clock className="size-4 text-gray-400" />
												<span className="text-sm text-gray-600 dark:text-gray-400">
													{course.date}
												</span>
											</div>
										</div>
									</div>
									<Button>
										<Video className="mr-2 size-4" />
										{t('courses.join')}
									</Button>
								</div>
							))
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

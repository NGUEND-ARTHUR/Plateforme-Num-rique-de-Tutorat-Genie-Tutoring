import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye } from 'lucide-react';

const mockReports = [
	{
		id: '1',
		student: 'Sophie Martin',
		subject: 'Mathématiques',
		tutor: 'Marie Lambert',
		date: '2026-01-10',
		comprehension: 85,
		strengths: ['Algèbre', 'Géométrie'],
		difficulties: ['Fractions'],
	},
	{
		id: '2',
		student: 'Lucas Dubois',
		subject: 'Français',
		tutor: 'Jean Dupont',
		date: '2026-01-09',
		comprehension: 75,
		strengths: ['Orthographe', 'Grammaire'],
		difficulties: ['Conjugaison'],
	},
];

export default function ParentReports() {
	const { t } = useApp();

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-semibold mb-1">{t('nav.tracking')}</h2>
				<p className="text-gray-600 dark:text-gray-400">
					Consultez les rapports de cours et le suivi pédagogique
				</p>
			</div>

			<div className="space-y-4">
				{mockReports.map((report) => (
					<Card key={report.id}>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>
										{report.subject} - {report.student}
									</CardTitle>
									<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
										avec {report.tutor} • {report.date}
									</p>
								</div>
								<div className="flex gap-2">
									<Button variant="outline" size="sm">
										<Eye className="mr-2 size-4" />
										{t('common.view')}
									</Button>
									<Button variant="outline" size="sm">
										<Download className="mr-2 size-4" />
										PDF
									</Button>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-medium">
										Niveau de compréhension
									</span>
									<span className="text-lg font-semibold text-indigo-600">
										{report.comprehension}%
									</span>
								</div>
								<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
									<div
										className="h-full bg-indigo-600"
										style={{ width: `${report.comprehension}%` }}
									/>
								</div>
							</div>

							<div className="grid md:grid-cols-2 gap-4">
								<div>
									<p className="text-sm font-medium mb-2">Points forts</p>
									<div className="flex flex-wrap gap-2">
										{report.strengths.map((strength) => (
											<Badge
												key={strength}
												variant="default"
												className="bg-green-500"
											>
												{strength}
											</Badge>
										))}
									</div>
								</div>
								<div>
									<p className="text-sm font-medium mb-2">Difficultés</p>
									<div className="flex flex-wrap gap-2">
										{report.difficulties.map((difficulty) => (
											<Badge
												key={difficulty}
												variant="default"
												className="bg-orange-500"
											>
												{difficulty}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

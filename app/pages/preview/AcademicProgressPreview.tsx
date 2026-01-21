import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';

export default function AcademicProgressPreview() {
  const { t } = useTranslation();
  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('preview.academicProgress.title', 'Academic Progress Preview')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="font-medium">{t('preview.academicProgress.goals', 'Goals achieved')}</span>
            <Progress value={80} className="mt-2" />
            <span className="text-sm text-gray-500">8/10</span>
          </div>
          <div>
            <span className="font-medium">{t('preview.academicProgress.grades', 'Average grade')}</span>
            <Progress value={85} className="mt-2 bg-green-500" />
            <span className="text-sm text-gray-500">85%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

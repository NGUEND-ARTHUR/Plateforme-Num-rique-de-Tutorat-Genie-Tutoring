import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function SessionReportPreview() {
  const { t } = useTranslation();
  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('preview.sessionReport.title', 'Session Report Preview')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li><strong>{t('preview.sessionReport.student', 'Student')}:</strong> Sophie Martin</li>
            <li><strong>{t('preview.sessionReport.subject', 'Subject')}:</strong> Mathématiques</li>
            <li><strong>{t('preview.sessionReport.date', 'Date')}:</strong> 2026-01-16</li>
            <li><strong>{t('preview.sessionReport.status', 'Status')}:</strong> {t('status.completed')}</li>
            <li><strong>{t('preview.sessionReport.notes', 'Notes')}:</strong> {t('preview.sessionReport.notesSample', 'Great participation and progress!')}</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

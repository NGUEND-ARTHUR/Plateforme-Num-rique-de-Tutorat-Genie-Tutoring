import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VirtualClassroomPreview() {
  const { t } = useTranslation();
  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('preview.virtualClassroom.title', 'Virtual Classroom Preview')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Video className="size-16 text-indigo-600" />
          <p className="text-gray-600 dark:text-gray-400 text-center">
            {t('preview.virtualClassroom.desc', 'Experience a live online class with interactive tools and real-time communication.')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

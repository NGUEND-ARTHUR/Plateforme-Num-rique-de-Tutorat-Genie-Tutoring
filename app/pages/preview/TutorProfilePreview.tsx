import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function TutorProfilePreview() {
  const { t } = useTranslation();
  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('preview.tutorProfile.title', 'Tutor Profile Preview')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Avatar className="size-24">
            <AvatarFallback>MT</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">Marie Lambert</h2>
          <p className="text-gray-600 dark:text-gray-400">Mathématiques, 5 ans d'expérience</p>
          <Button>{t('preview.tutorProfile.cta', 'Book a Session')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}

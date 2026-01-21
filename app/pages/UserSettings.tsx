import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function UserSettings() {
  const { t } = useTranslation();
  return (
    <div className="max-w-xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.title', 'Settings')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">{t('settings.profile', 'Profile')}</label>
              <Input placeholder={t('auth.name', 'Full Name')} />
            </div>
            <div>
              <label className="block mb-1 font-medium">{t('auth.email', 'Email')}</label>
              <Input placeholder={t('auth.email', 'Email')} />
            </div>
            <Button type="submit">{t('common.save', 'Save')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

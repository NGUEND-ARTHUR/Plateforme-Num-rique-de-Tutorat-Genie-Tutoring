import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function Messaging() {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('messages.title', 'Messaging')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded mb-4 flex flex-col justify-end p-4">
            <div className="text-gray-400 text-center">{t('messages.noMessages', 'No messages')}</div>
          </div>
          <form className="flex gap-2">
            <Input placeholder={t('messages.typeMessage', 'Type your message...')} />
            <Button type="submit">{t('common.send', 'Send')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const mockTutors = [
  { id: 1, name: 'Marie Lambert', status: 'pending' },
  { id: 2, name: 'Jean Dupont', status: 'validated' },
];

export default function TutorVerification() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.tutorValidation', 'Tutor Verification')}</CardTitle>
        </CardHeader>
        <CardContent>
          {mockTutors.length === 0 ? (
            <div className="text-center text-gray-500 py-8">{t('empty.noTutors', 'No tutors pending validation.')}</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>{t('auth.name', 'Name')}</th>
                  <th>{t('status.pending', 'Status')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mockTutors.map((tutor) => (
                  <tr key={tutor.id} className="border-t">
                    <td>{tutor.name}</td>
                    <td>{t('status.' + tutor.status, tutor.status)}</td>
                    <td>
                      <Button size="sm" variant="secondary">{t('admin.validate', 'Validate')}</Button>
                      <Button size="sm" variant="destructive" className="ml-2">{t('admin.reject', 'Reject')}</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

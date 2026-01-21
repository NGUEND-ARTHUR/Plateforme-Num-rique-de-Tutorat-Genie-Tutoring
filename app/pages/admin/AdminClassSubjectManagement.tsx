import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const mockSubjects = [
  { id: 1, name: 'Mathématiques', class: 'CE1' },
  { id: 2, name: 'Français', class: 'CE2' },
];

export default function AdminClassSubjectManagement() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.classesSubjects', 'Class & Subject Management')}</CardTitle>
        </CardHeader>
        <CardContent>
          {mockSubjects.length === 0 ? (
            <div className="text-center text-gray-500 py-8">{t('empty.noSubjects', 'No classes or subjects found.')}</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>{t('admin.classesSubjects', 'Class & Subject')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mockSubjects.map((subject) => (
                  <tr key={subject.id} className="border-t">
                    <td>{subject.name} ({subject.class})</td>
                    <td><Button size="sm">{t('common.edit', 'Edit')}</Button></td>
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

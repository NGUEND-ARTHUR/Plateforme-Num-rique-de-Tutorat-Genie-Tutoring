import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const mockUsers = [
  { id: 1, name: 'Marie Lambert', role: 'tutor', email: 'marie@genie.com' },
  { id: 2, name: 'Lucas Dubois', role: 'student', email: 'lucas@genie.com' },
];

export default function AdminUserManagement() {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.users', 'User Management')}</CardTitle>
        </CardHeader>
        <CardContent>
          {mockUsers.length === 0 ? (
            <div className="text-center text-gray-500 py-8">{t('empty.noUsers', 'No users found.')}</div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>{t('auth.name', 'Name')}</th>
                  <th>{t('auth.email', 'Email')}</th>
                  <th>{t('auth.selectRole', 'Role')}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{t('roles.' + user.role, user.role)}</td>
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

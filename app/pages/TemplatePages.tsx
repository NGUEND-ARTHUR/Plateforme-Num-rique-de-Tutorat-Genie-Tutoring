// This file exports all remaining page templates
// Import and re-export as needed

import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Users as UsersIcon, Calendar, Video, Target, Clock, CheckCircle2, Eye, Plus, Edit, Trash2, Download } from 'lucide-react';

// ========== STUDENT PAGES ==========

export function StudentCourses() {
  const { t } = useApp();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{t('nav.courses')}</h2>
      <Card>
        <CardHeader>
          <CardTitle>{t('courses.upcoming')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                  <BookOpen className="size-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="font-medium">Mathématiques</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">avec Marie Lambert</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="size-4 text-gray-400" />
                    <span className="text-sm">2026-01-16 à 14:00</span>
                  </div>
                </div>
              </div>
              <Button>
                <Video className="mr-2 size-4" />
                {t('courses.join')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function VirtualClassroom() {
  const { t } = useApp();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{t('classroom.title')}</h2>
        <Badge variant="destructive">{t('classroom.live')}</Badge>
      </div>
      <div className="grid md:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
        <Card className="md:col-span-2 bg-gray-900 flex items-center justify-center text-white">
          <div className="text-center">
            <Video className="size-24 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Vidéo du tuteur</p>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('classroom.chat')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-full">
              <div className="flex-1" />
              <div className="flex gap-2">
                <Input placeholder={t('messages.typeMessage')} />
                <Button size="sm">Envoyer</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Objectives() {
  const { t } = useApp();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{t('nav.objectives')}</h2>
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-medium">Maîtriser les fractions</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mathématiques • Date cible: 2026-01-31</p>
                  <p className="text-sm mt-2">Compléter 10 exercices sur les fractions</p>
                </div>
              </div>
              <Badge className="bg-green-500">Atteint</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Target className="size-6 text-indigo-500 mt-1" />
                <div>
                  <h3 className="font-medium">Améliorer l'orthographe</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Français • Date cible: 2026-02-15</p>
                  <p className="text-sm mt-2">Dictée quotidienne et exercices</p>
                </div>
              </div>
              <Badge variant="secondary">En cours</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Grades() {
  const { t } = useApp();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{t('nav.grades')}</h2>
      <Tabs defaultValue="grades">
        <TabsList>
          <TabsTrigger value="grades">Notes</TabsTrigger>
          <TabsTrigger value="homework">Devoirs</TabsTrigger>
        </TabsList>
        <TabsContent value="grades">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Matière</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Mathématiques</TableCell>
                    <TableCell><Badge className="bg-green-500">85%</Badge></TableCell>
                    <TableCell>2026-01-10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Français</TableCell>
                    <TableCell><Badge className="bg-blue-500">78%</Badge></TableCell>
                    <TableCell>2026-01-09</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="homework">
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Exercices de géométrie</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">À rendre: 2026-01-18</p>
                  </div>
                  <Badge variant="secondary">En attente</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function StudentMessages() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Messages</h2>
      <Card>
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Fonctionnalité de messagerie identique à la page parent</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function StudentSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Paramètres</h2>
      <Card>
        <CardHeader>
          <CardTitle>Paramètres du compte</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Fonctionnalité de paramètres identique à la page parent</p>
        </CardContent>
      </Card>
    </div>
  );
}

// ========== TUTOR PAGES ==========

export function TutorDashboard() {
  const { t } = useApp();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{t('dashboard.welcome')}</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Élèves suivis</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <UsersIcon className="size-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Agenda du jour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                  <Clock className="size-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="font-medium">14:00 - Sophie Martin</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mathématiques - CE1</p>
                </div>
              </div>
              <Button size="sm">Démarrer</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function MyStudents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Mes élèves</h2>
        <Button>
          <Plus className="mr-2 size-4" />
          Ajouter
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Sophie Martin</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">CE1 - Mathématiques</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="mr-2 size-4" />
                Profil
              </Button>
              <Button size="sm" className="flex-1">Rapport</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function TutorCourses() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mes cours</h2>
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-600 dark:text-gray-400">Liste des cours planifiés et historique</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function TutorClassroom() {
  return <VirtualClassroom />;
}

export function PedagogicalTracking() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Suivi pédagogique</h2>
      <Tabs defaultValue="objectives">
        <TabsList>
          <TabsTrigger value="objectives">Objectifs</TabsTrigger>
          <TabsTrigger value="grades">Notes</TabsTrigger>
          <TabsTrigger value="homework">Devoirs</TabsTrigger>
        </TabsList>
        <TabsContent value="objectives">
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-600 dark:text-gray-400">Gérer les objectifs des élèves</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function TutorReports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Rapports de cours</h2>
        <Button>
          <Plus className="mr-2 size-4" />
          Nouveau rapport
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-600 dark:text-gray-400">Liste des rapports à compléter et historique</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function TutorMessages() {
  return <StudentMessages />;
}

export function TutorProfile() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Profil & Disponibilités</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations professionnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Expérience</Label>
              <Input defaultValue="5 ans" />
            </div>
            <div className="space-y-2">
              <Label>Tarif horaire (€)</Label>
              <Input type="number" defaultValue="25" />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Input defaultValue="Enseignante passionnée..." />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disponibilités</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">Calendrier de disponibilités</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ========== ADMIN PAGES ==========

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard Administrateur</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Parents</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <UsersIcon className="size-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function Users() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Gestion des utilisateurs</h2>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Jean Dupont</TableCell>
                <TableCell>jean@example.com</TableCell>
                <TableCell><Badge>Parent</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline"><Eye className="size-4" /></Button>
                    <Button size="sm" variant="outline"><Edit className="size-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function TutorValidation() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Validation des tuteurs</h2>
      <Card>
        <CardHeader>
          <CardTitle>Tuteurs en attente de validation</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Matières</TableHead>
                <TableHead>Expérience</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Pierre Rousseau</TableCell>
                <TableCell>Anglais, Histoire</TableCell>
                <TableCell>2 ans</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline"><Eye className="size-4" /></Button>
                    <Button size="sm"><CheckCircle2 className="size-4 mr-1" />Valider</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export function StudentsParents() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Élèves & Parents</h2>
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-600 dark:text-gray-400">Liste des élèves et parents inscrits</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function ClassesSubjects() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Classes & Matières</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Classes</CardTitle>
              <Button size="sm"><Plus className="size-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['CE1', 'CE2', 'CM1'].map((cls) => (
                <div key={cls} className="flex items-center justify-between p-3 border rounded-lg">
                  <span>{cls}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost"><Edit className="size-4" /></Button>
                    <Button size="sm" variant="ghost"><Trash2 className="size-4 text-red-500" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Matières</CardTitle>
              <Button size="sm"><Plus className="size-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Mathématiques', 'Français', 'Anglais'].map((subject) => (
                <div key={subject} className="flex items-center justify-between p-3 border rounded-lg">
                  <span>{subject}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost"><Edit className="size-4" /></Button>
                    <Button size="sm" variant="ghost"><Trash2 className="size-4 text-red-500" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AdminCourses() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Gestion des cours</h2>
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-600 dark:text-gray-400">Vue d'ensemble de tous les cours</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminReports() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Rapports & Feedback</h2>
      <Card>
        <CardContent className="pt-6">
          <p className="text-gray-600 dark:text-gray-400">Tous les rapports et feedbacks de la plateforme</p>
        </CardContent>
      </Card>
    </div>
  );
}

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Paramètres système</h2>
      <Card>
        <CardHeader>
          <CardTitle>Configuration de la plateforme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Nom de la plateforme</Label>
            <Input defaultValue="Genie Tutoring" />
          </div>
          <div className="space-y-2">
            <Label>Email de contact</Label>
            <Input defaultValue="contact@genietutor.com" />
          </div>
          <Button>Enregistrer</Button>
        </CardContent>
      </Card>
    </div>
  );
}
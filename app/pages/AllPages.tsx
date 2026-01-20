// This file contains all page components consolidated for easier management
// Import this file and export individual pages as needed

import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Video,
  BookOpen,
  Send,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  Share2,
  FileText,
  CheckCircle2,
  Circle,
  Star,
  TrendingUp,
  Target,
  Award,
  Download,
  Filter,
  MapPin,
} from 'lucide-react';
import { useState } from 'react';

// ========================================
// PARENT PAGES
// ========================================

export function MyChildren() {
  const { t } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);

  const children = [
    { id: '1', name: 'Sophie Martin', class: 'CE1', section: 'Francophone', averageGrade: 85, subjects: ['Mathématiques', 'Français'] },
    { id: '2', name: 'Lucas Dubois', class: 'CE2', section: 'Francophone', averageGrade: 78, subjects: ['Mathématiques', 'Sciences'] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{t('nav.myChildren')}</h2>
          <p className="text-gray-600 dark:text-gray-400">Gérez les profils de vos enfants</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 size-4" />
              {t('common.add')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un enfant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nom complet</Label>
                <Input placeholder="Nom de l'enfant" />
              </div>
              <div className="space-y-2">
                <Label>Classe</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ce1">CE1</SelectItem>
                    <SelectItem value="ce2">CE2</SelectItem>
                    <SelectItem value="cm1">CM1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Section</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Francophone</SelectItem>
                    <SelectItem value="en">Anglophone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">{t('common.save')}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {children.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback className="text-lg">{child.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{child.name}</CardTitle>
                    <CardDescription>{child.class} - {child.section}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="size-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Moyenne générale</span>
                  <span className="text-2xl font-bold text-indigo-600">{child.averageGrade}%</span>
                </div>
                <Progress value={child.averageGrade} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Matières suivies</p>
                <div className="flex flex-wrap gap-2">
                  {child.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">{subject}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <Eye className="mr-2 size-4" />
                  {t('common.view')} profil
                </Button>
                <Button className="flex-1" size="sm">
                  <Calendar className="mr-2 size-4" />
                  Planifier cours
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function FindTutor() {
  const { t } = useApp();
  const [search, setSearch] = useState('');

  const tutors = [
    { id: 't1', name: 'Marie Lambert', subjects: ['Mathématiques', 'Physique'], classes: ['CE1', 'CE2', 'CM1'], section: 'Francophone', experience: '5 ans', rating: 4.8, hourlyRate: 25, verified: true, bio: 'Enseignante passionnée avec 5 ans d\'expérience' },
    { id: 't2', name: 'Jean Dupont', subjects: ['Français', 'Histoire'], classes: ['CE1', 'CE2'], section: 'Francophone', experience: '3 ans', rating: 4.6, hourlyRate: 22, verified: true, bio: 'Spécialiste en littérature française' },
    { id: 't3', name: 'Sarah Wilson', subjects: ['Anglais', 'Sciences'], classes: ['CE1', 'CE2', 'CM1'], section: 'Anglophone', experience: '7 ans', rating: 4.9, hourlyRate: 28, verified: true, bio: 'Native English speaker with extensive teaching experience' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">{t('nav.findTutor')}</h2>
        <p className="text-gray-600 dark:text-gray-400">Parcourez notre sélection de tuteurs vérifiés</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>{t('common.search')}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <Input placeholder="Nom, matière..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Section</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="francophone">Francophone</SelectItem>
                  <SelectItem value="anglophone">Anglophone</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Matière</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="maths">Mathématiques</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="english">Anglais</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Classe</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="ce1">CE1</SelectItem>
                  <SelectItem value="ce2">CE2</SelectItem>
                  <SelectItem value="cm1">CM1</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tutors Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-4">
                <Avatar className="size-20">
                  <AvatarFallback className="text-xl">{tutor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-semibold text-lg">{tutor.name}</h3>
                    {tutor.verified && <CheckCircle2 className="size-5 text-green-500" />}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="size-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{tutor.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tutor.bio}</p>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {tutor.subjects.slice(0, 2).map((subject) => (
                      <Badge key={subject} variant="secondary">{subject}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="size-4" />
                    <span>{tutor.experience}</span>
                  </div>
                  <p className="font-semibold text-indigo-600">{tutor.hourlyRate}€/h</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">{t('common.view')} le profil</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Profil de {tutor.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="size-24">
                          <AvatarFallback className="text-2xl">{tutor.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{tutor.name}</h3>
                            {tutor.verified && <CheckCircle2 className="size-6 text-green-500" />}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="size-4 fill-yellow-400 text-yellow-400" />
                              <span>{tutor.rating}</span>
                            </div>
                            <span>{tutor.experience} d'expérience</span>
                            <span>{tutor.section}</span>
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-2">Bio</h4>
                        <p className="text-gray-600 dark:text-gray-400">{tutor.bio}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Matières</h4>
                        <div className="flex flex-wrap gap-2">
                          {tutor.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary">{subject}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Classes enseignées</h4>
                        <div className="flex flex-wrap gap-2">
                          {tutor.classes.map((cls) => (
                            <Badge key={cls} variant="outline">{cls}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-lg font-semibold">Tarif horaire</span>
                        <span className="text-2xl font-bold text-indigo-600">{tutor.hourlyRate}€/h</span>
                      </div>
                      <Button className="w-full" size="lg">
                        <Calendar className="mr-2 size-5" />
                        Réserver un cours
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ScheduleCourse() {
  const { t } = useApp();
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-semibold mb-1">{t('nav.schedule')}</h2>
        <p className="text-gray-600 dark:text-gray-400">Planifiez un nouveau cours en quelques étapes</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center size-8 rounded-full ${step >= i ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {i}
                  </div>
                  {i < 4 && <div className={`flex-1 h-1 mx-2 ${step > i ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                </div>
              ))}
            </div>

            {/* Step Content */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Sélectionner l'élève</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un enfant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Sophie Martin</SelectItem>
                    <SelectItem value="2">Lucas Dubois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Sélectionner la matière</h3>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une matière" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maths">Mathématiques</SelectItem>
                    <SelectItem value="french">Français</SelectItem>
                    <SelectItem value="english">Anglais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Choisir un tuteur</h3>
                <div className="grid gap-4">
                  {[
                    { name: 'Marie Lambert', rating: 4.8, price: 25 },
                    { name: 'Jean Dupont', rating: 4.6, price: 22 },
                  ].map((tutor) => (
                    <Card key={tutor.name} className="cursor-pointer hover:ring-2 hover:ring-indigo-500">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{tutor.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{tutor.name}</p>
                              <div className="flex items-center gap-1">
                                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{tutor.rating}</span>
                              </div>
                            </div>
                          </div>
                          <p className="font-semibold text-indigo-600">{tutor.price}€/h</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Date et heure</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Heure</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Durée (minutes)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="60 minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                {t('common.previous')}
              </Button>
              <Button
                onClick={() => {
                  if (step === 4) {
                    // Submit
                    alert('Cours planifié avec succès!');
                  } else {
                    setStep(Math.min(4, step + 1));
                  }
                }}
              >
                {step === 4 ? t('common.confirm') : t('common.next')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ... [File continues with more page components - I'll create separate files for each role due to length]

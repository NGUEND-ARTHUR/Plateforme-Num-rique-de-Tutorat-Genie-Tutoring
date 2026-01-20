import { useApp } from '@/app/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useState } from 'react';

const conversations = [
  { id: '1', name: 'Marie Lambert', role: 'Tuteur', lastMessage: 'Le cours de Sophie s\'est très bien passé !', time: '10:30', unread: 2 },
  { id: '2', name: 'Jean Dupont', role: 'Tuteur', lastMessage: 'Disponible demain à 16h', time: 'Hier', unread: 0 },
];

const messages = [
  { id: '1', from: 'Marie Lambert', content: 'Bonjour ! Comment allez-vous ?', time: '10:15', isSent: false },
  { id: '2', from: 'Moi', content: 'Très bien merci ! Et le cours de Sophie ?', time: '10:20', isSent: true },
  { id: '3', from: 'Marie Lambert', content: 'Le cours de Sophie s\'est très bien passé !', time: '10:30', isSent: false },
];

export default function ParentMessages() {
  const { t } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const [selectedConv, setSelectedConv] = useState(conversations[0]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">{t('nav.messages')}</h2>
        <p className="text-gray-600 dark:text-gray-400">Communiquez avec les tuteurs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{t('messages.conversations')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConv(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConv.id === conv.id
                        ? 'bg-indigo-50 dark:bg-indigo-900/20'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{conv.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium truncate">{conv.name}</p>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <div className="size-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="md:col-span-2 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{selectedConv.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{selectedConv.name}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedConv.role}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col pt-6">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${msg.isSent ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800'} rounded-lg p-3`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${msg.isSent ? 'text-indigo-200' : 'text-gray-500'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2">
              <Input
                placeholder={t('messages.typeMessage')}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMessage.trim()) {
                    // Send message logic
                    setNewMessage('');
                  }
                }}
              />
              <Button size="icon">
                <Send className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

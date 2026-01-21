import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useState } from 'react';

const conversations = [
	{
		id: '1',
		name: 'Marie Lambert',
		role: 'Tuteur',
		lastMessage: "Le cours de Sophie s'est très bien passé !",
		time: '10:30',
		unread: 2,
	},
	{
		id: '2',
		name: 'Jean Dupont',
		role: 'Tuteur',
		lastMessage: 'Disponible demain à 16h',
		time: 'Hier',
		unread: 0,
	},
];

const messages = [
	{
		id: '1',
		from: 'Marie Lambert',
		content: 'Bonjour ! Comment allez-vous ?',
		time: '10:15',
		isSent: false,
	},
	{
		id: '2',
		from: 'Moi',
		content: 'Très bien merci ! Et le cours de Sophie ?',
		time: '10:20',
		isSent: true,
	},
	{
		id: '3',
		from: 'Marie Lambert',
		content: "Le cours de Sophie s'est très bien passé !",
		time: '10:30',
		isSent: false,
	},
];

export default function ParentMessages() {
	const { t } = useTranslation();
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
				<div className="md:col-span-1">
					<Card>
						<CardHeader>
							<CardTitle>{t('messages.conversations')}</CardTitle>
						</CardHeader>
						<CardContent className="p-0">
							<ScrollArea className="h-64">
								{conversations.length === 0 ? (
									<div className="text-center text-gray-500 py-8">{t('empty.noConversations', 'No conversations yet.')}</div>
								) : (
									conversations.map((conv) => (
										<div
											key={conv.id}
											className={`flex items-center gap-3 p-4 border-b cursor-pointer ${selectedConv.id === conv.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
											onClick={() => setSelectedConv(conv)}
										>
											<Avatar>
												<AvatarFallback>{conv.name.substring(0, 2)}</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<p className="font-medium">{conv.name}</p>
												<p className="text-xs text-gray-500">{conv.lastMessage}</p>
											</div>
											{conv.unread > 0 && (
												<div className="size-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">
													{conv.unread}
												</div>
											)}
										</div>
									))
								)}
							</ScrollArea>
						</CardContent>
					</Card>
				</div>
				{/* Message Thread */}
				<div className="md:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>{selectedConv ? selectedConv.name : t('messages.noConversationSelected', 'No conversation selected')}</CardTitle>
						</CardHeader>
						<CardContent>
							<ScrollArea className="h-64 mb-4">
								{messages.length === 0 ? (
									<div className="text-center text-gray-500 py-8">{t('empty.noMessages', 'No messages yet.')}</div>
								) : (
									messages.map((msg) => (
										<div
											key={msg.id}
											className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'} mb-2`}
										>
											<div className={`rounded-lg px-4 py-2 max-w-xs ${msg.isSent ? 'bg-indigo-100 dark:bg-indigo-900 text-right' : 'bg-gray-100 dark:bg-gray-800'}`}>
												<p className="text-sm">{msg.content}</p>
												<p className="text-xs text-gray-400 mt-1">{msg.time}</p>
											</div>
										</div>
									))
								)}
							</ScrollArea>
							<form className="flex gap-2 mt-2">
								<Input
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder={t('messages.typeMessage')}
								/>
								<Button type="submit" size="icon">
									<Send className="size-4" />
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		   </div>
	   );
	}

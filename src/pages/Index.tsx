import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

type Message = {
  id: number;
  text: string;
  time: string;
  sent: boolean;
};

const mockChats: Chat[] = [
  { id: 1, name: 'Анна Смирнова', avatar: '', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 2, online: true },
  { id: 2, name: 'Дмитрий Иванов', avatar: '', lastMessage: 'Отправил тебе файлы', time: '13:15', unread: 0, online: true },
  { id: 3, name: 'Маша Петрова', avatar: '', lastMessage: 'Созвонимся завтра?', time: '12:45', unread: 1, online: false },
  { id: 4, name: 'Команда Разработки', avatar: '', lastMessage: 'Новое обновление готово!', time: '11:20', unread: 5, online: true },
  { id: 5, name: 'Александр Козлов', avatar: '', lastMessage: 'Спасибо за помощь!', time: '10:10', unread: 0, online: false },
];

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Привет! Как дела?', time: '14:30', sent: false },
    { id: 2, text: 'Отлично! Работаю над новым проектом', time: '14:31', sent: true },
    { id: 3, text: 'Звучит интересно! Расскажешь подробнее?', time: '14:32', sent: false },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [activeSection, setActiveSection] = useState('chats');
  const [themeColor, setThemeColor] = useState(0);
  const [fontSize, setFontSize] = useState(16);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }), sent: true }
      ]);
      setNewMessage('');
    }
  };

  const themeGradients = [
    'from-purple-500 to-pink-500',
    'from-cyan-500 to-purple-500',
    'from-orange-500 to-pink-500',
    'from-green-500 to-blue-500',
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-background" style={{ fontSize: `${fontSize}px` }}>
      <aside className="w-20 bg-sidebar border-r border-border flex flex-col items-center py-6 space-y-6">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${themeGradients[themeColor]} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}>
          <Icon name="MessageCircle" size={24} className="text-white" />
        </div>
        
        <nav className="flex-1 flex flex-col space-y-4">
          {[
            { id: 'chats', icon: 'MessagesSquare', label: 'Чаты' },
            { id: 'contacts', icon: 'Users', label: 'Контакты' },
            { id: 'calls', icon: 'Phone', label: 'Звонки' },
            { id: 'media', icon: 'Image', label: 'Медиа' },
            { id: 'profile', icon: 'User', label: 'Профиль' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeSection === item.id
                  ? `bg-gradient-to-br ${themeGradients[themeColor]} text-white shadow-lg scale-110`
                  : 'text-muted-foreground hover:bg-muted hover:scale-105'
              }`}
              title={item.label}
            >
              <Icon name={item.icon as any} size={20} />
            </button>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <button className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:scale-105 transition-all">
              <Icon name="Settings" size={20} />
            </button>
          </SheetTrigger>
          <SheetContent className="w-[400px]">
            <SheetHeader>
              <SheetTitle>Настройки интерфейса</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6">
              <div>
                <Label className="mb-3 block">Цветовая тема</Label>
                <div className="grid grid-cols-4 gap-3">
                  {themeGradients.map((gradient, index) => (
                    <button
                      key={index}
                      onClick={() => setThemeColor(index)}
                      className={`h-16 rounded-lg bg-gradient-to-br ${gradient} transition-transform hover:scale-105 ${
                        themeColor === index ? 'ring-4 ring-primary scale-110' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="mb-3 block">Размер шрифта: {fontSize}px</Label>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  min={12}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Настройки применяются мгновенно и сохраняются автоматически
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </aside>

      <div className="w-80 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск чатов..."
              className="pl-10 bg-muted border-none"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-3 rounded-xl flex items-center gap-3 chat-hover ${
                  selectedChat?.id === chat.id ? 'bg-muted' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback className={`bg-gradient-to-br ${themeGradients[themeColor]} text-white font-semibold`}>
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>
                
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-foreground truncate">{chat.name}</span>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                
                {chat.unread > 0 && (
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${themeGradients[themeColor]} flex items-center justify-center text-white text-xs font-bold`}>
                    {chat.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedChat.avatar} />
                  <AvatarFallback className={`bg-gradient-to-br ${themeGradients[themeColor]} text-white font-semibold`}>
                    {selectedChat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-foreground">{selectedChat.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.online ? 'В сети' : 'Был(а) недавно'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Icon name="Video" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sent ? 'justify-end' : 'justify-start'} message-bubble`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl ${
                        message.sent
                          ? `bg-gradient-to-br ${themeGradients[themeColor]} text-white`
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className={`text-xs mt-1 block ${message.sent ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {message.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 bg-card border-t border-border">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Icon name="Paperclip" size={20} />
                </Button>
                <Input
                  placeholder="Написать сообщение..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-muted border-none"
                />
                <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform">
                  <Icon name="Smile" size={20} />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className={`bg-gradient-to-br ${themeGradients[themeColor]} hover:scale-105 transition-transform`}
                  size="icon"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${themeGradients[themeColor]} flex items-center justify-center`}>
                <Icon name="MessageCircle" size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
              <p className="text-muted-foreground">Начните общение с друзьями и коллегами</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

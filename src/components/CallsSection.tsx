import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Call = {
  id: number;
  name: string;
  avatar: string;
  type: 'incoming' | 'outgoing' | 'missed';
  callType: 'voice' | 'video';
  time: string;
  duration: string;
};

const mockCalls: Call[] = [
  { id: 1, name: 'Анна Смирнова', avatar: '', type: 'incoming', callType: 'video', time: '14:32', duration: '12:34' },
  { id: 2, name: 'Дмитрий Иванов', avatar: '', type: 'outgoing', callType: 'voice', time: '13:15', duration: '05:12' },
  { id: 3, name: 'Маша Петрова', avatar: '', type: 'missed', callType: 'video', time: '12:45', duration: '00:00' },
  { id: 4, name: 'Команда Разработки', avatar: '', type: 'incoming', callType: 'voice', time: '11:20', duration: '25:45' },
  { id: 5, name: 'Александр Козлов', avatar: '', type: 'outgoing', callType: 'video', time: '10:10', duration: '08:30' },
];

type Props = {
  themeGradients: string[];
  themeColor: number;
  onStartCall: (type: 'voice' | 'video') => void;
};

const CallsSection = ({ themeGradients, themeColor, onStartCall }: Props) => {
  const getCallIcon = (call: Call) => {
    if (call.type === 'missed') return { icon: 'PhoneOff', color: 'text-red-500' };
    if (call.type === 'incoming') return { icon: 'PhoneIncoming', color: 'text-green-500' };
    return { icon: 'PhoneOutgoing', color: 'text-blue-500' };
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold mb-4">Звонки</h1>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Поиск звонков..." className="pl-10 bg-muted border-none" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="missed">Пропущенные</TabsTrigger>
            <TabsTrigger value="recent">Недавние</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-2">
            {mockCalls.map((call) => {
              const callIcon = getCallIcon(call);
              return (
                <div
                  key={call.id}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 hover:bg-muted transition-colors"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={call.avatar} />
                    <AvatarFallback className={`bg-gradient-to-br ${themeGradients[themeColor]} text-white font-semibold`}>
                      {call.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{call.name}</h3>
                      <Icon name={callIcon.icon as any} size={16} className={callIcon.color} />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name={call.callType === 'video' ? 'Video' : 'Phone'} size={14} />
                      <span>{call.time}</span>
                      {call.duration !== '00:00' && <span>• {call.duration}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onStartCall('voice')}
                      className="hover:scale-110 transition-transform"
                    >
                      <Icon name="Phone" size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onStartCall('video')}
                      className="hover:scale-110 transition-transform"
                    >
                      <Icon name="Video" size={18} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          <TabsContent value="missed" className="space-y-2">
            {mockCalls
              .filter((call) => call.type === 'missed')
              .map((call) => {
                const callIcon = getCallIcon(call);
                return (
                  <div
                    key={call.id}
                    className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={call.avatar} />
                      <AvatarFallback className={`bg-gradient-to-br ${themeGradients[themeColor]} text-white font-semibold`}>
                        {call.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{call.name}</h3>
                        <Icon name={callIcon.icon as any} size={16} className={callIcon.color} />
                      </div>
                      <p className="text-sm text-muted-foreground">{call.time}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onStartCall(call.callType)}
                    >
                      <Icon name="PhoneCall" size={18} />
                    </Button>
                  </div>
                );
              })}
          </TabsContent>

          <TabsContent value="recent" className="space-y-2">
            {mockCalls.slice(0, 3).map((call) => {
              const callIcon = getCallIcon(call);
              return (
                <div
                  key={call.id}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={call.avatar} />
                    <AvatarFallback className={`bg-gradient-to-br ${themeGradients[themeColor]} text-white font-semibold`}>
                      {call.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{call.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name={callIcon.icon as any} size={14} className={callIcon.color} />
                      <span>{call.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default CallsSection;

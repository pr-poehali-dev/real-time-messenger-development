import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type Contact = {
  id: number;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
};

const mockContacts: Contact[] = [
  { id: 1, name: 'Анна Смирнова', avatar: '', status: 'Работаю над проектом', online: true },
  { id: 2, name: 'Дмитрий Иванов', avatar: '', status: 'На встрече', online: true },
  { id: 3, name: 'Маша Петрова', avatar: '', status: 'Занята', online: false },
  { id: 4, name: 'Команда Разработки', avatar: '', status: 'Активны', online: true },
  { id: 5, name: 'Александр Козлов', avatar: '', status: 'Отошёл', online: false },
  { id: 6, name: 'Елена Волкова', avatar: '', status: 'Доступна', online: true },
  { id: 7, name: 'Игорь Морозов', avatar: '', status: 'В отпуске', online: false },
];

type Props = {
  themeGradients: string[];
  themeColor: number;
};

const ContactsSection = ({ themeGradients, themeColor }: Props) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold mb-4">Контакты</h1>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Поиск контактов..." className="pl-10 bg-muted border-none" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-card border border-border rounded-2xl p-4 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <Avatar className="w-14 h-14">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className={`bg-gradient-to-br ${themeGradients[themeColor]} text-white font-semibold`}>
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-semibold truncate">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{contact.status}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="MessageCircle" size={16} className="mr-1" />
                  Написать
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Icon name="Phone" size={16} className="mr-1" />
                  Позвонить
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactsSection;

import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';

type Props = {
  themeGradients: string[];
  themeColor: number;
};

const ProfileSection = ({ themeGradients, themeColor }: Props) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold">Профиль</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="w-32 h-32">
                <AvatarImage src="" />
                <AvatarFallback className={`bg-gradient-to-br ${themeGradients[themeColor]} text-white text-4xl font-bold`}>
                  ВИ
                </AvatarFallback>
              </Avatar>
              <button className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon name="Camera" size={32} className="text-white" />
              </button>
            </div>
            <Button variant="outline" className="gap-2">
              <Icon name="Upload" size={16} />
              Загрузить фото
            </Button>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Icon name="User" size={20} />
                Основная информация
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" defaultValue="Владимир Иванов" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input id="username" defaultValue="@vladimir_ivanov" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="bio">О себе</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Разработчик | Люблю создавать крутые проекты"
                    className="mt-1 min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Icon name="Mail" size={20} />
                Контактная информация
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="vladimir@example.com" className="mt-1" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" defaultValue="+7 (999) 123-45-67" className="mt-1" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Icon name="Bell" size={20} />
                Уведомления
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Уведомления о сообщениях</p>
                    <p className="text-sm text-muted-foreground">Получать уведомления о новых сообщениях</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Звук уведомлений</p>
                    <p className="text-sm text-muted-foreground">Воспроизводить звук при получении сообщения</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Уведомления о звонках</p>
                    <p className="text-sm text-muted-foreground">Показывать уведомления о входящих звонках</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Icon name="Lock" size={20} />
                Приватность и безопасность
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Показывать статус онлайн</p>
                    <p className="text-sm text-muted-foreground">Другие пользователи увидят, когда вы в сети</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Время последнего визита</p>
                    <p className="text-sm text-muted-foreground">Показывать время последнего посещения</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Двухфакторная аутентификация</p>
                    <p className="text-sm text-muted-foreground">Дополнительная защита вашего аккаунта</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className={`flex-1 bg-gradient-to-br ${themeGradients[themeColor]}`}>
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить изменения
              </Button>
              <Button variant="outline" className="flex-1">
                Отмена
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProfileSection;

import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type MediaItem = {
  id: number;
  type: 'image' | 'video' | 'file';
  name: string;
  size: string;
  date: string;
  thumbnail?: string;
};

const mockMedia: MediaItem[] = [
  { id: 1, type: 'image', name: 'Screenshot_2024.png', size: '2.3 MB', date: '14:32' },
  { id: 2, type: 'video', name: 'presentation.mp4', size: '45.1 MB', date: '13:15' },
  { id: 3, type: 'file', name: 'document.pdf', size: '1.2 MB', date: '12:45' },
  { id: 4, type: 'image', name: 'photo_2024.jpg', size: '3.8 MB', date: '11:20' },
  { id: 5, type: 'file', name: 'report.xlsx', size: '856 KB', date: '10:10' },
  { id: 6, type: 'video', name: 'video_call.mp4', size: '78.4 MB', date: '09:30' },
  { id: 7, type: 'image', name: 'design_mockup.png', size: '5.2 MB', date: '08:15' },
  { id: 8, type: 'file', name: 'contract.docx', size: '642 KB', date: '07:45' },
];

type Props = {
  themeGradients: string[];
  themeColor: number;
};

const MediaSection = ({ themeGradients, themeColor }: Props) => {
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return 'Image';
      case 'video': return 'Video';
      case 'file': return 'FileText';
      default: return 'File';
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'image': return 'text-blue-500';
      case 'video': return 'text-purple-500';
      case 'file': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold mb-4">Медиа и файлы</h1>
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Поиск файлов..." className="pl-10 bg-muted border-none" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="images">Фото</TabsTrigger>
            <TabsTrigger value="videos">Видео</TabsTrigger>
            <TabsTrigger value="files">Файлы</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockMedia.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className={`h-32 bg-gradient-to-br ${themeGradients[themeColor]} flex items-center justify-center`}>
                    <Icon name={getFileIcon(item.type) as any} size={48} className="text-white opacity-80" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-start gap-2 mb-2">
                      <Icon name={getFileIcon(item.type) as any} size={16} className={getFileColor(item.type)} />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.size}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="images">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockMedia
                .filter((item) => item.type === 'image')
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div className={`h-40 bg-gradient-to-br ${themeGradients[themeColor]} flex items-center justify-center`}>
                      <Icon name="Image" size={56} className="text-white opacity-80" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.size} • {item.date}</p>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockMedia
                .filter((item) => item.type === 'video')
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div className={`h-40 bg-gradient-to-br ${themeGradients[themeColor]} flex items-center justify-center relative`}>
                      <Icon name="Video" size={56} className="text-white opacity-80" />
                      <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
                        5:32
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.size} • {item.date}</p>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="files">
            <div className="space-y-2">
              {mockMedia
                .filter((item) => item.type === 'file')
                .map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${themeGradients[themeColor]} flex items-center justify-center`}>
                      <Icon name="FileText" size={24} className="text-white" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.size} • {item.date}</p>
                    </div>
                    <Icon name="Download" size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default MediaSection;

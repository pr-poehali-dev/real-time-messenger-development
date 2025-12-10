import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

type Props = {
  contactName: string;
  contactAvatar?: string;
  callType: 'voice' | 'video';
  themeGradients: string[];
  themeColor: number;
  onEndCall: () => void;
};

const CallScreen = ({ contactName, contactAvatar = '', callType, themeGradients, themeColor, onEndCall }: Props) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-fade-in">
      {callType === 'video' && (
        <div className="flex-1 relative bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Avatar className="w-32 h-32 mx-auto mb-4">
                <AvatarImage src={contactAvatar} />
                <AvatarFallback className={`bg-gradient-to-br ${themeGradients[themeColor]} text-white text-4xl font-bold`}>
                  {contactName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-white mb-2">{contactName}</h2>
              <p className="text-lg text-white/70">{formatDuration(callDuration)}</p>
            </div>
          </div>

          <div className="absolute bottom-32 right-6 w-48 h-64 bg-gray-900 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl">
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              {isCameraOff ? (
                <div className="text-center">
                  <Icon name="VideoOff" size={48} className="text-white/50 mx-auto mb-2" />
                  <p className="text-white/70 text-sm">Камера выключена</p>
                </div>
              ) : (
                <Icon name="User" size={64} className="text-white/30" />
              )}
            </div>
          </div>

          <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
            <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
              <p className="text-white font-medium">{formatDuration(callDuration)}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60"
            >
              <Icon name="Maximize2" size={20} />
            </Button>
          </div>
        </div>
      )}

      {callType === 'voice' && (
        <div className={`flex-1 bg-gradient-to-br ${themeGradients[themeColor]} flex items-center justify-center`}>
          <div className="text-center">
            <Avatar className="w-40 h-40 mx-auto mb-6 ring-8 ring-white/20 animate-scale-in">
              <AvatarImage src={contactAvatar} />
              <AvatarFallback className="bg-white/20 backdrop-blur-sm text-white text-5xl font-bold">
                {contactName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-3xl font-bold text-white mb-4">{contactName}</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-xl text-white/90">Соединение установлено</p>
            </div>
            <p className="text-2xl text-white/70 font-mono">{formatDuration(callDuration)}</p>
          </div>
        </div>
      )}

      <div className="bg-card/95 backdrop-blur-sm border-t border-border p-8">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className={`w-14 h-14 rounded-full ${isMuted ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
          </Button>

          {callType === 'video' && (
            <Button
              variant="outline"
              size="icon"
              className={`w-14 h-14 rounded-full ${isCameraOff ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
              onClick={() => setIsCameraOff(!isCameraOff)}
            >
              <Icon name={isCameraOff ? 'VideoOff' : 'Video'} size={24} />
            </Button>
          )}

          <Button
            size="icon"
            className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg hover:scale-110 transition-transform"
            onClick={onEndCall}
          >
            <Icon name="PhoneOff" size={28} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`w-14 h-14 rounded-full ${isSpeakerOn ? 'bg-primary text-white' : ''}`}
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
          >
            <Icon name={isSpeakerOn ? 'Volume2' : 'Volume'} size={24} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="w-14 h-14 rounded-full"
          >
            <Icon name="MoreVertical" size={24} />
          </Button>
        </div>

        <div className="mt-6 flex justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Wifi" size={16} />
            <span>Отличное соединение</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} />
            <span>Сквозное шифрование</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallScreen;

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactAvatar: string;
}

export default function VideoCallModal({ isOpen, onClose, contactName, contactAvatar }: VideoCallModalProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setIsConnected(false);
      setIsMuted(false);
      setIsVideoOff(false);
      setCallDuration(0);
      return;
    }

    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isConnected || !isOpen) return;

    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected, isOpen]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[600px] p-0 overflow-hidden">
        <div className="relative w-full h-full bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
          {isConnected ? (
            <div className="w-full h-full flex items-center justify-center bg-muted/50">
              {!isVideoOff ? (
                <div className="text-center">
                  <div className="text-8xl mb-4">{contactAvatar}</div>
                  <p className="text-muted-foreground">Видео собеседника</p>
                </div>
              ) : (
                <div className="text-center">
                  <Icon name="VideoOff" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Видео выключено</p>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className={`text-8xl mb-4 ${!isConnected ? 'animate-pulse' : ''}`}>
                  {contactAvatar}
                </div>
                <h3 className="text-2xl font-bold mb-2">{contactName}</h3>
                <p className="text-muted-foreground">Соединение...</p>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden">
            <div className="w-32 h-32 flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <div className="text-4xl mb-1">🎥</div>
                <p className="text-xs text-muted-foreground">Вы</p>
              </div>
            </div>
          </div>

          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <p className="text-sm font-medium">
              {isConnected ? formatDuration(callDuration) : 'Вызов...'}
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
            <Button
              variant={isMuted ? 'default' : 'outline'}
              size="lg"
              className="rounded-full w-14 h-14 bg-card/90 backdrop-blur-sm"
              onClick={() => setIsMuted(!isMuted)}
            >
              <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
            </Button>

            <Button
              variant={isVideoOff ? 'default' : 'outline'}
              size="lg"
              className="rounded-full w-14 h-14 bg-card/90 backdrop-blur-sm"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} />
            </Button>

            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-14 h-14"
              onClick={onClose}
            >
              <Icon name="PhoneOff" size={24} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

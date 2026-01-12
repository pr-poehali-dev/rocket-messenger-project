import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactAvatar: string;
}

export default function VoiceCallModal({ isOpen, onClose, contactName, contactAvatar }: VoiceCallModalProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setIsConnected(false);
      setIsMuted(false);
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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="relative">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-6xl ${!isConnected ? 'animate-pulse' : ''}`}>
              {contactAvatar}
            </div>
            {isConnected && (
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 text-white text-xs rounded-full">
                Подключен
              </div>
            )}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-1">{contactName}</h3>
            <p className="text-muted-foreground">
              {isConnected ? formatDuration(callDuration) : 'Соединение...'}
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant={isMuted ? 'default' : 'outline'}
              size="lg"
              className="rounded-full w-16 h-16"
              onClick={() => setIsMuted(!isMuted)}
            >
              <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} />
            </Button>

            <Button
              variant="destructive"
              size="lg"
              className="rounded-full w-16 h-16"
              onClick={onClose}
            >
              <Icon name="PhoneOff" size={24} />
            </Button>
          </div>

          {!isConnected && (
            <div className="flex gap-2 items-center text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Вызов...</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

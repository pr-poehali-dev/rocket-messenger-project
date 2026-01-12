import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [settings, setSettings] = useState({
    messages: true,
    calls: true,
    groups: true,
    mentions: true,
    sound: true,
    vibration: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Bell" size={24} className="text-primary" />
            Уведомления
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">Сообщения</span>
            </div>
            <Button
              variant={settings.messages ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSetting('messages')}
            >
              {settings.messages ? 'Вкл' : 'Выкл'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">Звонки</span>
            </div>
            <Button
              variant={settings.calls ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSetting('calls')}
            >
              {settings.calls ? 'Вкл' : 'Выкл'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Icon name="Users" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">Группы</span>
            </div>
            <Button
              variant={settings.groups ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSetting('groups')}
            >
              {settings.groups ? 'Вкл' : 'Выкл'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Icon name="AtSign" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">Упоминания</span>
            </div>
            <Button
              variant={settings.mentions ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSetting('mentions')}
            >
              {settings.mentions ? 'Вкл' : 'Выкл'}
            </Button>
          </div>

          <div className="h-px bg-border my-4" />

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Icon name="Volume2" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">Звук</span>
            </div>
            <Button
              variant={settings.sound ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSetting('sound')}
            >
              {settings.sound ? 'Вкл' : 'Выкл'}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Icon name="Vibrate" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">Вибрация</span>
            </div>
            <Button
              variant={settings.vibration ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleSetting('vibration')}
            >
              {settings.vibration ? 'Вкл' : 'Выкл'}
            </Button>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
        >
          Готово
        </Button>
      </DialogContent>
    </Dialog>
  );
}

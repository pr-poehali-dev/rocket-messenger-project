import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const [settings, setSettings] = useState({
    lastSeen: 'everyone',
    profilePhoto: 'everyone',
    about: 'everyone',
    readReceipts: true,
    groupAdd: 'everyone'
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Lock" size={24} className="text-primary" />
            Приватность и безопасность
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Время посещения</label>
            <div className="flex gap-2">
              <Button
                variant={settings.lastSeen === 'everyone' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setSettings(prev => ({ ...prev, lastSeen: 'everyone' }))}
              >
                Все
              </Button>
              <Button
                variant={settings.lastSeen === 'contacts' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setSettings(prev => ({ ...prev, lastSeen: 'contacts' }))}
              >
                Контакты
              </Button>
              <Button
                variant={settings.lastSeen === 'nobody' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setSettings(prev => ({ ...prev, lastSeen: 'nobody' }))}
              >
                Никто
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Фото профиля</label>
            <div className="flex gap-2">
              <Button
                variant={settings.profilePhoto === 'everyone' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setSettings(prev => ({ ...prev, profilePhoto: 'everyone' }))}
              >
                Все
              </Button>
              <Button
                variant={settings.profilePhoto === 'contacts' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setSettings(prev => ({ ...prev, profilePhoto: 'contacts' }))}
              >
                Контакты
              </Button>
              <Button
                variant={settings.profilePhoto === 'nobody' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setSettings(prev => ({ ...prev, profilePhoto: 'nobody' }))}
              >
                Никто
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">О себе</label>
            <div className="flex gap-2">
              <Button
                variant={settings.about === 'everyone' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setSettings(prev => ({ ...prev, about: 'everyone' }))}
              >
                Все
              </Button>
              <Button
                variant={settings.about === 'contacts' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setSettings(prev => ({ ...prev, about: 'contacts' }))}
              >
                Контакты
              </Button>
              <Button
                variant={settings.about === 'nobody' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setSettings(prev => ({ ...prev, about: 'nobody' }))}
              >
                Никто
              </Button>
            </div>
          </div>

          <div className="h-px bg-border my-4" />

          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
            <div className="flex items-center gap-3">
              <Icon name="CheckCheck" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">Статус прочтения</span>
            </div>
            <Button
              variant={settings.readReceipts ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSettings(prev => ({ ...prev, readReceipts: !prev.readReceipts }))}
            >
              {settings.readReceipts ? 'Вкл' : 'Выкл'}
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Icon name="Shield" size={16} className="text-green-500 mt-0.5" />
              <div className="text-xs text-muted-foreground">
                Все сообщения защищены сквозным шифрованием. Даже мы не можем их прочитать.
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
        >
          Сохранить
        </Button>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface AppearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppearanceModal({ isOpen, onClose }: AppearanceModalProps) {
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');

  const themes = [
    { id: 'light', name: 'Светлая', icon: 'Sun' },
    { id: 'dark', name: 'Тёмная', icon: 'Moon' },
    { id: 'system', name: 'Системная', icon: 'Laptop' }
  ];

  const fontSizes = [
    { id: 'small', name: 'Маленький' },
    { id: 'medium', name: 'Средний' },
    { id: 'large', name: 'Крупный' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Palette" size={24} className="text-primary" />
            Оформление
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium">Тема оформления</label>
            <div className="grid grid-cols-3 gap-3">
              {themes.map((t) => (
                <Button
                  key={t.id}
                  variant={theme === t.id ? 'default' : 'outline'}
                  className="flex-col h-auto py-4 gap-2"
                  onClick={() => setTheme(t.id)}
                >
                  <Icon name={t.icon as any} size={24} />
                  <span className="text-xs">{t.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Размер шрифта</label>
            <div className="space-y-2">
              {fontSizes.map((size) => (
                <Button
                  key={size.id}
                  variant={fontSize === size.id ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setFontSize(size.id)}
                >
                  <span className={size.id === 'small' ? 'text-sm' : size.id === 'large' ? 'text-lg' : 'text-base'}>
                    {size.name}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <span className="text-sm font-medium">Предпросмотр</span>
            </div>
            <div className="space-y-2 bg-card rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  😊
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${fontSize === 'small' ? 'text-sm' : fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
                    Пример сообщения
                  </div>
                  <div className={`text-muted-foreground ${fontSize === 'small' ? 'text-xs' : fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
                    Так будет выглядеть текст
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
        >
          Применить
        </Button>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (contact: { username: string, nickname: string }) => void;
}

export default function AddContactModal({ isOpen, onClose, onAdd }: AddContactModalProps) {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onAdd({
        username: username.trim(),
        nickname: nickname.trim() || username.trim()
      });
      setUsername('');
      setNickname('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="UserPlus" size={24} className="text-primary" />
            Добавить контакт
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Юзернейм
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                @
              </span>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-8"
                autoFocus
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Введите юзернейм пользователя
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Имя контакта (необязательно)
            </label>
            <Input
              type="text"
              placeholder="Как отображать в списке"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              disabled={!username.trim()}
              className="flex-1 bg-gradient-to-r from-secondary to-accent"
            >
              <Icon name="Plus" className="mr-2" size={18} />
              Добавить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

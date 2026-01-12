import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Checkbox } from './ui/checkbox';

interface User {
  id: number;
  name: string;
  avatar: string;
  username: string;
}

interface GroupChatCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, members: number[]) => void;
}

const mockUsers: User[] = [
  { id: 1, name: 'Александр', avatar: '😊', username: 'alex_rocket' },
  { id: 2, name: 'Мария', avatar: '🎨', username: 'maria_art' },
  { id: 3, name: 'Дмитрий', avatar: '🎮', username: 'dmitry_games' },
  { id: 4, name: 'Елена', avatar: '🌟', username: 'elena_star' },
  { id: 5, name: 'Иван', avatar: '⚡', username: 'ivan_pro' },
  { id: 6, name: 'Анна', avatar: '💎', username: 'anna_gem' },
];

export default function GroupChatCreator({ isOpen, onClose, onCreate }: GroupChatCreatorProps) {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMember = (userId: number) => {
    setSelectedMembers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreate = () => {
    if (groupName && selectedMembers.length > 0) {
      onCreate(groupName, selectedMembers);
      setGroupName('');
      setSelectedMembers([]);
      setSearchQuery('');
      onClose();
    }
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Создать группу
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="text-sm font-medium mb-2 block">Название группы</label>
            <Input
              type="text"
              placeholder="Например: Команда разработчиков"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="h-12"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Участники ({selectedMembers.length} выбрано)
            </label>
            <div className="relative mb-3">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Поиск пользователей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => toggleMember(user.id)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                    selectedMembers.includes(user.id)
                      ? 'bg-primary/10 border-2 border-primary'
                      : 'bg-muted/50 hover:bg-muted border-2 border-transparent'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl">
                    {user.avatar}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-muted-foreground">@{user.username}</div>
                  </div>
                  <Checkbox
                    checked={selectedMembers.includes(user.id)}
                    onCheckedChange={() => toggleMember(user.id)}
                  />
                </button>
              ))}
            </div>
          </div>

          {selectedMembers.length > 0 && (
            <div className="bg-muted/50 rounded-2xl p-4 animate-fade-in">
              <div className="text-sm font-medium mb-2">Выбранные участники:</div>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.map(memberId => {
                  const user = mockUsers.find(u => u.id === memberId);
                  return user ? (
                    <div key={user.id} className="flex items-center gap-2 bg-card px-3 py-1.5 rounded-full">
                      <span className="text-lg">{user.avatar}</span>
                      <span className="text-sm">{user.name}</span>
                      <button
                        onClick={() => toggleMember(user.id)}
                        className="ml-1 hover:text-destructive"
                      >
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12"
            >
              Отмена
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!groupName || selectedMembers.length === 0}
              className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary"
            >
              <Icon name="Users" className="mr-2" size={20} />
              Создать группу
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

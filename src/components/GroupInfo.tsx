import { useState } from 'react';
import { Button } from './ui/button';
import Icon from './ui/icon';
import { Avatar } from './ui/avatar';

interface Member {
  id: number;
  name: string;
  avatar: string;
  role: 'admin' | 'member';
  online: boolean;
}

const mockMembers: Member[] = [
  { id: 1, name: 'Александр', avatar: '😊', role: 'admin', online: true },
  { id: 2, name: 'Мария', avatar: '🎨', role: 'admin', online: true },
  { id: 3, name: 'Дмитрий', avatar: '🎮', role: 'member', online: false },
  { id: 4, name: 'Елена', avatar: '🌟', role: 'member', online: true },
  { id: 5, name: 'Иван', avatar: '⚡', role: 'member', online: false },
];

export default function GroupInfo() {
  const [members] = useState<Member[]>(mockMembers);

  return (
    <div className="w-80 border-l border-border bg-card/50 backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary to-secondary">
        <h2 className="text-lg font-bold text-white">Группа разработчиков</h2>
        <p className="text-sm text-white/80">{members.length} участников</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center space-y-3">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-5xl">
            💻
          </div>
          <Button variant="outline" className="w-full gap-2">
            <Icon name="Bell" size={18} />
            Уведомления
          </Button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Администраторы</h3>
            <span className="text-xs text-muted-foreground">
              {members.filter(m => m.role === 'admin').length}
            </span>
          </div>
          <div className="space-y-2">
            {members
              .filter(m => m.role === 'admin')
              .map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl">
                      {member.avatar}
                    </div>
                    {member.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{member.name}</p>
                      <Icon name="Shield" size={14} className="text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {member.online ? 'онлайн' : 'не в сети'}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Участники</h3>
            <span className="text-xs text-muted-foreground">
              {members.filter(m => m.role === 'member').length}
            </span>
          </div>
          <div className="space-y-2">
            {members
              .filter(m => m.role === 'member')
              .map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl">
                      {member.avatar}
                    </div>
                    {member.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.online ? 'онлайн' : 'не в сети'}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Icon name="UserPlus" size={18} />
            Добавить участника
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2">
            <Icon name="Settings" size={18} />
            Настройки группы
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
            <Icon name="LogOut" size={18} />
            Покинуть группу
          </Button>
        </div>
      </div>
    </div>
  );
}

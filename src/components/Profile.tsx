import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';
import { useState } from 'react';

interface ProfileProps {
  onBack: () => void;
}

export default function Profile({ onBack }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    nickname: 'Александр',
    username: 'alex_rocket',
    avatar: '😊',
    bio: 'Люблю современные технологии 🚀'
  });

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-card to-muted/20">
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary to-secondary">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h2 className="text-xl font-bold text-white">Профиль</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-6xl">
                {profile.avatar}
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-card" />
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  type="text"
                  value={profile.nickname}
                  onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                  className="text-center text-2xl font-bold"
                />
                <div className="relative">
                  <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    @
                  </span>
                  <Input
                    type="text"
                    value={profile.username}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                    className="text-center pl-8"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{profile.nickname}</h2>
                <p className="text-muted-foreground">@{profile.username}</p>
              </>
            )}
          </div>

          <div className="bg-card rounded-2xl p-4 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">О себе</span>
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Icon name="Pencil" size={16} />
                </Button>
              )}
            </div>
            {isEditing ? (
              <Input
                type="text"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              />
            ) : (
              <p className="text-sm text-muted-foreground">{profile.bio}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex gap-2 animate-fade-in">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsEditing(false)}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-secondary"
                onClick={() => setIsEditing(false)}
              >
                Сохранить
              </Button>
            </div>
          )}

          <div className="space-y-3 animate-fade-in">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12"
            >
              <Icon name="Bell" size={20} />
              Уведомления
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12"
            >
              <Icon name="Lock" size={20} />
              Приватность и безопасность
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12"
            >
              <Icon name="Database" size={20} />
              Использование данных
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 h-12"
            >
              <Icon name="Palette" size={20} />
              Оформление
            </Button>
          </div>

          <div className="bg-muted/50 rounded-2xl p-4 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Lock" size={16} className="text-green-500" />
              <span className="font-medium">Защита активна</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Все сообщения защищены сквозным шифрованием. Только вы и получатель можете прочитать переписку.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

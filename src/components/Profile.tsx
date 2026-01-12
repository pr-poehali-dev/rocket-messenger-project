import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

interface ProfileProps {
  onBack: () => void;
  userId?: string;
  isOwnProfile?: boolean;
  userProfile?: {nickname: string, username: string, avatar: string} | null;
}

export default function Profile({ onBack, userProfile }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [profile, setProfile] = useState({
    nickname: userProfile?.nickname || 'Александр',
    username: userProfile?.username || 'alex_rocket',
    avatar: userProfile?.avatar || '😊',
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

          <div className="bg-card rounded-2xl p-4 space-y-4 animate-fade-in">
            <h3 className="font-semibold flex items-center gap-2">
              <Icon name="BarChart3" size={18} />
              Статистика
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1,234</div>
                <div className="text-xs text-muted-foreground">Сообщений</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">56</div>
                <div className="text-xs text-muted-foreground">Звонков</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">789</div>
                <div className="text-xs text-muted-foreground">Файлов</div>
              </div>
            </div>
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

          {!isPremium && (
            <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-6 space-y-4 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 text-6xl opacity-10">✨</div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Crown" size={24} className="text-primary" />
                  <h3 className="text-xl font-bold">Rocket Premium</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Получите доступ ко всем возможностям мессенджера
                </p>
                <Button
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-gradient-to-r from-primary to-secondary h-12"
                >
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Оформить Premium
                </Button>
              </div>
            </div>
          )}

          {isPremium && (
            <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-6 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2">
                <Icon name="Crown" size={20} className="text-primary" />
                <span className="font-bold">Premium активен</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Подписка действует до 12 января 2027
              </p>
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

      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)}
        onSuccess={() => setIsPremium(true)}
      />
    </div>
  );
}
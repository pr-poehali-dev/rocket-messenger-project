import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';

interface RegistrationProps {
  onComplete: () => void;
}

export default function Registration({ onComplete }: RegistrationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: '',
    username: '',
    avatar: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && formData.nickname) {
      setStep(2);
    } else if (step === 2 && formData.username) {
      setStep(3);
    } else if (step === 3) {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4">
      <div className="w-full max-w-md bg-card rounded-3xl shadow-2xl p-8 animate-scale-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-fade-in">🚀</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Rocket Messenger
          </h1>
          <p className="text-muted-foreground">Защищенное общение для вас</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? 'w-12 bg-primary' : s < step ? 'w-8 bg-secondary' : 'w-8 bg-muted'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="animate-fade-in space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Как вас зовут?</label>
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="h-12 text-lg"
                  autoFocus
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Выберите уникальный юзернейм</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                  <Input
                    type="text"
                    placeholder="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="h-12 text-lg pl-8"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fade-in space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Выберите аватар</label>
                <div className="grid grid-cols-4 gap-3">
                  {['😊', '🎨', '🎮', '🎵', '⚡', '🌟', '🔥', '💎'].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: emoji })}
                      className={`text-4xl p-4 rounded-2xl transition-all hover:scale-110 ${
                        formData.avatar === emoji
                          ? 'bg-primary/20 ring-2 ring-primary scale-110'
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 h-12"
              >
                <Icon name="ChevronLeft" className="mr-2" size={20} />
                Назад
              </Button>
            )}
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              disabled={
                (step === 1 && !formData.nickname) ||
                (step === 2 && !formData.username) ||
                (step === 3 && !formData.avatar)
              }
            >
              {step === 3 ? 'Начать общение' : 'Продолжить'}
              {step < 3 && <Icon name="ChevronRight" className="ml-2" size={20} />}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Icon name="Lock" className="inline mr-1" size={16} />
          Защищено сквозным шифрованием
        </div>
      </div>
    </div>
  );
}

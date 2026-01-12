import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import Icon from './ui/icon';

interface DataUsageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DataUsageModal({ isOpen, onClose }: DataUsageModalProps) {
  const dataStats = {
    messages: 1234,
    photos: 456,
    videos: 78,
    files: 234,
    voice: 89,
    totalSize: '2.3 ГБ'
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Database" size={24} className="text-primary" />
            Использование данных
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl p-6 text-center">
            <div className="text-4xl font-bold mb-2">{dataStats.totalSize}</div>
            <p className="text-sm text-muted-foreground">Всего использовано</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Icon name="MessageSquare" size={20} className="text-primary" />
                <span className="text-sm font-medium">Сообщения</span>
              </div>
              <span className="text-sm text-muted-foreground">{dataStats.messages}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Icon name="Image" size={20} className="text-secondary" />
                <span className="text-sm font-medium">Фото</span>
              </div>
              <span className="text-sm text-muted-foreground">{dataStats.photos}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Icon name="Video" size={20} className="text-accent" />
                <span className="text-sm font-medium">Видео</span>
              </div>
              <span className="text-sm text-muted-foreground">{dataStats.videos}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Icon name="File" size={20} className="text-primary" />
                <span className="text-sm font-medium">Файлы</span>
              </div>
              <span className="text-sm text-muted-foreground">{dataStats.files}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Icon name="Mic" size={20} className="text-secondary" />
                <span className="text-sm font-medium">Голосовые</span>
              </div>
              <span className="text-sm text-muted-foreground">{dataStats.voice}</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              if (confirm('Вы уверены, что хотите очистить кеш? Это освободит место, но медиафайлы придётся загружать заново.')) {
                alert('Кеш очищен!');
              }
            }}
          >
            <Icon name="Trash2" className="mr-2" size={18} />
            Очистить кеш
          </Button>
        </div>

        <Button
          onClick={onClose}
          className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
        >
          Закрыть
        </Button>
      </DialogContent>
    </Dialog>
  );
}

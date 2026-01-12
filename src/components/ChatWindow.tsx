import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';
import StickerPicker from './StickerPicker';

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  type: 'text' | 'file' | 'voice' | 'image' | 'video' | 'music' | 'location';
  fileName?: string;
  duration?: string;
}

interface ChatWindowProps {
  chatId: number;
  onBack: () => void;
  onProfileClick?: (userId: string) => void;
}

const mockMessages: Message[] = [
  { id: 1, text: 'Привет! Как дела?', time: '14:30', isMine: false, type: 'text' },
  { id: 2, text: 'Отлично! Работаю над новым проектом', time: '14:31', isMine: true, type: 'text' },
  { id: 3, text: 'document.pdf', time: '14:32', isMine: false, type: 'file', fileName: 'document.pdf' },
  { id: 4, text: 'Голосовое сообщение', time: '14:33', isMine: true, type: 'voice', duration: '0:15' }
];

export default function ChatWindow({ chatId, onBack, onProfileClick }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const handleAttachment = (type: string) => {
    setShowAttachMenu(false);
    let newMessage: Message;

    switch (type) {
      case 'file':
        fileInputRef.current?.click();
        return;
      case 'photo':
        newMessage = {
          id: messages.length + 1,
          text: 'photo.jpg',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          isMine: true,
          type: 'image'
        };
        break;
      case 'video':
        newMessage = {
          id: messages.length + 1,
          text: 'video.mp4',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          isMine: true,
          type: 'video'
        };
        break;
      case 'music':
        newMessage = {
          id: messages.length + 1,
          text: 'song.mp3',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          isMine: true,
          type: 'music'
        };
        break;
      case 'location':
        newMessage = {
          id: messages.length + 1,
          text: 'Моя геолокация',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          isMine: true,
          type: 'location'
        };
        break;
      default:
        return;
    }

    setMessages([...messages, newMessage]);
  };

  const renderMessage = (message: Message) => {
    const baseClasses = `max-w-[70%] p-3 rounded-2xl animate-fade-in ${
      message.isMine
        ? 'ml-auto bg-gradient-to-br from-primary to-secondary text-white'
        : 'bg-muted'
    }`;

    switch (message.type) {
      case 'file':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2">
              <Icon name="File" size={20} />
              <span className="font-medium">{message.fileName}</span>
            </div>
            <div className="text-xs opacity-70 mt-1">{message.time}</div>
          </div>
        );
      case 'voice':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-3">
              <Button size="sm" className="rounded-full w-8 h-8 p-0">
                <Icon name="Play" size={16} />
              </Button>
              <div className="flex-1 h-1 bg-white/30 rounded-full">
                <div className="w-1/3 h-full bg-white rounded-full" />
              </div>
              <span className="text-xs">{message.duration}</span>
            </div>
            <div className="text-xs opacity-70 mt-1">{message.time}</div>
          </div>
        );
      case 'image':
        return (
          <div className={baseClasses}>
            <div className="w-48 h-48 bg-muted-foreground/20 rounded-xl flex items-center justify-center mb-2">
              <Icon name="Image" size={48} className="opacity-50" />
            </div>
            <div className="text-xs opacity-70">{message.time}</div>
          </div>
        );
      case 'video':
        return (
          <div className={baseClasses}>
            <div className="w-48 h-48 bg-muted-foreground/20 rounded-xl flex items-center justify-center mb-2">
              <Icon name="Video" size={48} className="opacity-50" />
            </div>
            <div className="text-xs opacity-70">{message.time}</div>
          </div>
        );
      case 'music':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-3">
              <Icon name="Music" size={24} />
              <div className="flex-1">
                <div className="font-medium">Музыкальный файл</div>
                <div className="text-xs opacity-70">song.mp3</div>
              </div>
            </div>
            <div className="text-xs opacity-70 mt-1">{message.time}</div>
          </div>
        );
      case 'location':
        return (
          <div className={baseClasses}>
            <div className="flex items-center gap-2 mb-2">
              <Icon name="MapPin" size={20} />
              <span className="font-medium">Геолокация</span>
            </div>
            <div className="w-48 h-32 bg-muted-foreground/20 rounded-xl flex items-center justify-center">
              <Icon name="Map" size={32} className="opacity-50" />
            </div>
            <div className="text-xs opacity-70 mt-1">{message.time}</div>
          </div>
        );
      default:
        return (
          <div className={baseClasses}>
            <div>{message.text}</div>
            <div className="text-xs opacity-70 mt-1">{message.time}</div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gradient-to-b from-card to-muted/20">
      <div className="p-4 border-b border-border bg-card/80 backdrop-blur-sm flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="md:hidden"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <button
          onClick={() => onProfileClick?.('user_1')}
          className="flex items-center gap-3 flex-1 hover:bg-muted/50 rounded-lg p-2 -ml-2 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl">
            😊
          </div>
          <div className="text-left">
            <h2 className="font-semibold">Александр</h2>
            <p className="text-xs text-muted-foreground">онлайн</p>
          </div>
        </button>
        <Button variant="ghost" size="sm">
          <Icon name="Phone" size={20} />
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="Video" size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="flex">
            {renderMessage(message)}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm">
        {showAttachMenu && (
          <div className="mb-3 flex flex-wrap gap-2 animate-fade-in">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAttachment('file')}
              className="gap-2"
            >
              <Icon name="File" size={16} />
              Файл
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAttachment('photo')}
              className="gap-2"
            >
              <Icon name="Image" size={16} />
              Фото
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAttachment('video')}
              className="gap-2"
            >
              <Icon name="Video" size={16} />
              Видео
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAttachment('music')}
              className="gap-2"
            >
              <Icon name="Music" size={16} />
              Музыка
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAttachment('location')}
              className="gap-2"
            >
              <Icon name="MapPin" size={16} />
              Локация
            </Button>
          </div>
        )}

        <div className="relative">
          {showStickerPicker && (
            <div className="absolute bottom-full right-0 mb-2">
              <StickerPicker
                onSelect={(type, content) => {
                  const newMessage: Message = {
                    id: messages.length + 1,
                    text: content,
                    time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
                    isMine: true,
                    type: 'text'
                  };
                  setMessages([...messages, newMessage]);
                }}
                onClose={() => setShowStickerPicker(false)}
              />
            </div>
          )}
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="shrink-0"
            >
              <Icon name="Paperclip" size={20} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStickerPicker(!showStickerPicker)}
              className="shrink-0"
            >
              <Icon name="Smile" size={20} />
            </Button>
            <Input
              type="text"
              placeholder="Сообщение..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button
              size="sm"
              onClick={handleSend}
              className="shrink-0 bg-gradient-to-r from-primary to-secondary"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            const newMessage: Message = {
              id: messages.length + 1,
              text: e.target.files[0].name,
              time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
              isMine: true,
              type: 'file',
              fileName: e.target.files[0].name
            };
            setMessages([...messages, newMessage]);
          }
        }}
      />
    </div>
  );
}
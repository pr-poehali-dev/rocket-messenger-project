import { useState } from 'react';
import { Input } from './ui/input';
import Icon from './ui/icon';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface ChatListProps {
  onSelectChat: (chatId: number) => void;
  selectedChat: number | null;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Александр',
    avatar: '😊',
    lastMessage: 'Привет! Как дела?',
    time: '14:32',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Мария',
    avatar: '🎨',
    lastMessage: 'Отправила файлы',
    time: '13:15',
    unread: 0,
    online: true
  },
  {
    id: 3,
    name: 'Группа разработчиков',
    avatar: '💻',
    lastMessage: 'Новое обновление готово',
    time: '12:00',
    unread: 5,
    online: false
  },
  {
    id: 4,
    name: 'Дмитрий',
    avatar: '🎮',
    lastMessage: 'Голосовое сообщение',
    time: '11:48',
    unread: 0,
    online: false
  },
  {
    id: 5,
    name: 'Бот поддержки',
    avatar: '🤖',
    lastMessage: 'Чем могу помочь?',
    time: 'Вчера',
    unread: 0,
    online: true
  }
];

export default function ChatList({ onSelectChat, selectedChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-all ${
              selectedChat === chat.id ? 'bg-primary/10 border-l-4 border-primary' : ''
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                {chat.avatar}
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
              )}
            </div>

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground ml-2">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="ml-2 min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

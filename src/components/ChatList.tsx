import { useState } from 'react';
import { Input } from './ui/input';
import Icon from './ui/icon';
import { Button } from './ui/button';

interface Contact {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isFavorite?: boolean;
}

interface ChatListProps {
  onSelectChat: (chatId: number) => void;
  selectedChat: number | null;
  contacts: Contact[];
  onToggleFavorite: (contactId: number) => void;
}

export default function ChatList({ onSelectChat, selectedChat, contacts, onToggleFavorite }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorite = !showFavoritesOnly || contact.isFavorite;
    return matchesSearch && matchesFavorite;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 space-y-2">
        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            type="text"
            placeholder="Поиск контактов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
        <Button
          variant={showFavoritesOnly ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className="w-full"
        >
          <Icon name="Star" className="mr-2" size={16} />
          {showFavoritesOnly ? 'Все контакты' : 'Избранное'}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-6 text-center">
            <Icon name="Users" size={48} className="mb-3 opacity-30" />
            <p className="text-sm">
              {contacts.length === 0 ? 'Нет контактов' : 'Ничего не найдено'}
            </p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-all group ${
                selectedChat === contact.id ? 'bg-primary/10 border-l-4 border-primary' : ''
              }`}
            >
              <button
                onClick={() => onSelectChat(contact.id)}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-2xl">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{contact.nickname}</h3>
                    {contact.isFavorite && (
                      <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">@{contact.username}</p>
                </div>
              </button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(contact.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon 
                  name="Star" 
                  size={18} 
                  className={contact.isFavorite ? 'text-yellow-500 fill-yellow-500' : ''}
                />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Icon from './ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface StickerPickerProps {
  onSelect: (type: 'sticker' | 'gif', content: string) => void;
  onClose: () => void;
}

const stickerPacks = {
  emotions: ['😀', '😂', '🥰', '😎', '🤔', '😴', '🤗', '🥳', '😇', '🤩', '😍', '🤪', '😜', '🙃', '😏', '😌'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔'],
  food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🥚', '🍳', '🧇', '🥞', '🧈', '🍞', '🥐', '🥨', '🥯'],
  activity: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍'],
  travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🦯', '🦽'],
  objects: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💾', '💿', '📀', '📼', '📷', '📹']
};

const gifCategories = [
  { name: 'Привет', emoji: '👋' },
  { name: 'Да', emoji: '✅' },
  { name: 'Нет', emoji: '❌' },
  { name: 'Смех', emoji: '😂' },
  { name: 'Любовь', emoji: '❤️' },
  { name: 'Грусть', emoji: '😢' },
  { name: 'Злость', emoji: '😠' },
  { name: 'Удивление', emoji: '😮' }
];

export default function StickerPicker({ onSelect, onClose }: StickerPickerProps) {
  const [activeTab, setActiveTab] = useState('stickers');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-card border border-border rounded-2xl shadow-2xl w-80 animate-scale-in">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Стикеры и GIF</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <Icon name="X" size={18} />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 p-2">
          <TabsTrigger value="stickers" className="gap-2">
            <Icon name="Smile" size={16} />
            Стикеры
          </TabsTrigger>
          <TabsTrigger value="gifs" className="gap-2">
            <Icon name="Film" size={16} />
            GIF
          </TabsTrigger>
        </TabsList>

        <div className="p-3">
          <div className="relative mb-3">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              type="text"
              placeholder={activeTab === 'stickers' ? 'Поиск стикеров...' : 'Поиск GIF...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          <TabsContent value="stickers" className="mt-0">
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {Object.entries(stickerPacks).map(([category, stickers]) => (
                <div key={category}>
                  <div className="text-xs font-medium text-muted-foreground mb-2 capitalize">
                    {category === 'emotions' && 'Эмоции'}
                    {category === 'animals' && 'Животные'}
                    {category === 'food' && 'Еда'}
                    {category === 'activity' && 'Активность'}
                    {category === 'travel' && 'Транспорт'}
                    {category === 'objects' && 'Объекты'}
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {stickers.map((sticker, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onSelect('sticker', sticker);
                          onClose();
                        }}
                        className="text-2xl p-2 rounded-lg hover:bg-muted transition-all hover:scale-125"
                      >
                        {sticker}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gifs" className="mt-0">
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {gifCategories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelect('gif', `${category.name} GIF`);
                    onClose();
                  }}
                  className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl hover:from-primary/20 hover:to-secondary/20 transition-all hover:scale-105"
                >
                  <div className="text-3xl mb-2">{category.emoji}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

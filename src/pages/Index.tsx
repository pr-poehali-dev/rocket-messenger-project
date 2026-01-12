import { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import Profile from '../components/Profile';
import Registration from '../components/Registration';

export default function Index() {
  const [currentView, setCurrentView] = useState<'chats' | 'profile' | 'registration'>('registration');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn && currentView === 'registration') {
    return <Registration onComplete={() => {
      setIsLoggedIn(true);
      setCurrentView('chats');
    }} />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="flex w-full max-w-7xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-card my-4">
        <div className={`${selectedChat !== null ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-96 border-r border-border bg-card/50 backdrop-blur-sm`}>
          <div className="p-4 border-b border-border bg-gradient-to-r from-primary to-secondary">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                🚀 Rocket
              </h1>
              <button
                onClick={() => setCurrentView(currentView === 'chats' ? 'profile' : 'chats')}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center text-white"
              >
                {currentView === 'chats' ? '👤' : '💬'}
              </button>
            </div>
          </div>
          
          {currentView === 'chats' ? (
            <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
          ) : (
            <Profile onBack={() => setCurrentView('chats')} />
          )}
        </div>

        {selectedChat !== null && (
          <ChatWindow chatId={selectedChat} onBack={() => setSelectedChat(null)} />
        )}
        
        {selectedChat === null && currentView === 'chats' && (
          <div className="hidden md:flex flex-1 items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-lg">Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

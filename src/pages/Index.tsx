import { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import Profile from '../components/Profile';
import Registration from '../components/Registration';
import GroupChatCreator from '../components/GroupChatCreator';
import AddContactModal from '../components/AddContactModal';
import { Button } from '../components/ui/button';
import Icon from '../components/ui/icon';

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

export default function Index() {
  const [currentView, setCurrentView] = useState<'chats' | 'profile' | 'registration'>('registration');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showGroupCreator, setShowGroupCreator] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [userProfile, setUserProfile] = useState<{nickname: string, username: string, avatar: string} | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const savedContacts = localStorage.getItem('rocket_contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const saveContacts = (newContacts: Contact[]) => {
    setContacts(newContacts);
    localStorage.setItem('rocket_contacts', JSON.stringify(newContacts));
  };

  const addContact = (contact: { username: string; nickname: string }) => {
    const newContact: Contact = {
      id: Date.now(),
      username: contact.username,
      nickname: contact.nickname,
      avatar: '👤',
      lastMessage: '',
      time: '',
      unread: 0,
      online: false,
      isFavorite: false
    };
    saveContacts([...contacts, newContact]);
  };

  const toggleFavorite = (contactId: number) => {
    const updated = contacts.map(c => 
      c.id === contactId ? {...c, isFavorite: !c.isFavorite} : c
    );
    saveContacts(updated);
  };

  if (!isLoggedIn && currentView === 'registration') {
    return <Registration onComplete={(profile) => {
      setUserProfile(profile);
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
            <>
              <div className="p-3 border-b border-border flex gap-2">
                <Button
                  onClick={() => setShowGroupCreator(true)}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary h-10"
                  size="sm"
                >
                  <Icon name="Users" className="mr-2" size={18} />
                  Группа
                </Button>
                <Button
                  onClick={() => setShowAddContact(true)}
                  className="flex-1 bg-gradient-to-r from-secondary to-accent h-10"
                  size="sm"
                >
                  <Icon name="UserPlus" className="mr-2" size={18} />
                  Контакт
                </Button>
              </div>
              <ChatList 
                onSelectChat={setSelectedChat} 
                selectedChat={selectedChat}
                contacts={contacts}
                onToggleFavorite={toggleFavorite}
              />
            </>
          ) : (
            <Profile onBack={() => setCurrentView('chats')} isOwnProfile={true} userProfile={userProfile} />
          )}
        </div>

        {selectedChat !== null && (
          <ChatWindow 
            chatId={selectedChat} 
            onBack={() => setSelectedChat(null)}
            onProfileClick={(userId) => setSelectedUserProfile(userId)}
            contact={contacts.find(c => c.id === selectedChat)}
          />
        )}

        {selectedUserProfile && (
          <div className="flex-1 bg-card">
            <Profile 
              onBack={() => setSelectedUserProfile(null)} 
              userId={selectedUserProfile}
              isOwnProfile={false}
            />
          </div>
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

      <GroupChatCreator
        isOpen={showGroupCreator}
        onClose={() => setShowGroupCreator(false)}
        onCreate={(name, members) => {
          console.log('Created group:', name, members);
          setShowGroupCreator(false);
        }}
      />

      <AddContactModal
        isOpen={showAddContact}
        onClose={() => setShowAddContact(false)}
        onAdd={(contact) => {
          addContact(contact);
          setShowAddContact(false);
        }}
      />
    </div>
  );
}
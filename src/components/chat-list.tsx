import React from 'react';
import { FlatList } from 'react-native';
import { ChatListProps, ChatData } from './shared/types';
import { ChatItem } from './chat-item';

const ChatList: React.FC<ChatListProps> = ({ chats, onChatPress }) => {
  const renderChatItem = ({ item }: { item: ChatData }) => (
    <ChatItem item={item} onPress={onChatPress} />
  );

  return (
    <FlatList
      data={chats}
      renderItem={renderChatItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      className={'flex-1'}
    />
  );
};

export { ChatList };

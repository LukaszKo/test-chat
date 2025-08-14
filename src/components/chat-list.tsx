import React from 'react';
import { FlatList, ViewStyle } from 'react-native';
import { ChatListProps, ChatData } from './shared/types';
import { ChatItem } from './chat-item';
import { useTheme } from '../theme/useTheme';

const ChatList: React.FC<ChatListProps> = ({ chats, onChatPress }) => {
  const theme = useTheme();

  const renderChatItem = ({ item }: { item: ChatData }) => (
    <ChatItem item={item} onPress={onChatPress} />
  );

  const listStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.colors.background,
  };

  return (
    <FlatList
      data={chats}
      renderItem={renderChatItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      style={listStyle}
    />
  );
};

export { ChatList };

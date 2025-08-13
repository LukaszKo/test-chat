import * as React from 'react';
import { View, Text } from 'react-native';

interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <View className={'bg-white px-4 py-4 border-b border-gray-100'}>
      <Text className={'text-2xl font-bold text-gray-900'}>{title}</Text>
    </View>
  );
};

export { ChatHeader };

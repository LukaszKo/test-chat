import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChatItemProps } from './shared/types';
import { ChatAvatar } from './shared';

const ChatItem: React.FC<ChatItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      className={'flex-row items-center px-4 py-3 bg-white border-b border-gray-100'}
      onPress={() => onPress(item)}
    >
      <View className={'mr-3'}>
        <ChatAvatar avatar={item.avatar} isOnline={item.isOnline} size='medium' />
      </View>

      <View className={'flex-1 mr-3'}>
        {/* Name and Time */}
        <View className={'flex-row justify-between items-center mb-1'}>
          <Text className={'text-base font-semibold text-gray-900 flex-1'}>{item.name}</Text>
          <Text className={'text-sm text-gray-500 ml-2'}>{item.time}</Text>
        </View>

        {/* Message */}
        <View className={'flex-row items-center'}>
          <Text className={'text-sm text-gray-600 flex-1'} numberOfLines={1}>
            {item.message}
          </Text>
          {item.unreadCount && (
            <View
              className={'w-5 h-5 bg-blue-500 rounded-full items-center justify-center ml-2'}
            >
              <Text className={'text-xs text-white font-bold'}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { ChatItem };

import React from 'react';
import { View, Text } from 'react-native';
import { ChatAvatarProps } from './types';

const ChatAvatar: React.FC<ChatAvatarProps> = ({ avatar, isOnline = false, size = 'medium' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  const getTextSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-2xl';
      default:
        return 'text-lg';
    }
  };

  const getIndicatorSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-3 h-3';
      case 'large':
        return 'w-6 h-6';
      default:
        return 'w-4 h-4';
    }
  };

  return (
    <View className='relative'>
      {/* Avatar */}
      <View
        className={`${getSizeClasses()} rounded-full bg-gray-200 items-center justify-center`}
      >
        <Text className={`${getTextSizeClasses()}`}>{avatar}</Text>
      </View>

      {/* Online indicator */}
      {isOnline && (
        <View
          className={`absolute -bottom-0.5 -right-0.5 ${getIndicatorSizeClasses()} bg-green-500 rounded-full border-2 border-white`}
        />
      )}
    </View>
  );
};

export default ChatAvatar;

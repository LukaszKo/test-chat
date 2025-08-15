import React from 'react';
import { View, Text } from 'react-native';
import { ChatAvatarProps } from './types';
import { useTheme } from '../theme/useTheme';

const ChatAvatar: React.FC<ChatAvatarProps> = ({ 
  avatar, 
  isOnline = false, 
  size = 'medium' 
}) => {
  const theme = useTheme();

  const getAvatarSize = () => {
    switch (size) {
      case 'small':
        return { width: 32, height: 32 };
      case 'large':
        return { width: 64, height: 64 };
      default:
        return { width: 48, height: 48 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return theme.typography.fontSize.sm;
      case 'large':
        return theme.typography.fontSize.xxl;
      default:
        return theme.typography.fontSize.lg;
    }
  };

  const getIndicatorSize = () => {
    switch (size) {
      case 'small':
        return { width: 12, height: 12 };
      case 'large':
        return { width: 24, height: 24 };
      default:
        return { width: 16, height: 16 };
    }
  };

  const avatarSize = getAvatarSize();
  const indicatorSize = getIndicatorSize();

  return (
    <View style={{ position: 'relative' }}>
      {/* Avatar */}
      <View style={[
        avatarSize,
        {
          borderRadius: theme.borderRadius.full,
          backgroundColor: theme.colors.gray[200],
          alignItems: 'center',
          justifyContent: 'center',
        }
      ]}>
        <Text style={{
          fontSize: getTextSize(),
          color: theme.colors.text,
        }}>
          {avatar}
        </Text>
      </View>
      
      {/* Online indicator */}
      {isOnline && (
        <View style={[
          indicatorSize,
          {
            position: 'absolute',
            bottom: -2,
            right: -2,
            backgroundColor: theme.colors.online,
            borderRadius: theme.borderRadius.full,
            borderWidth: 2,
            borderColor: theme.colors.background,
          }
        ]} />
      )}
    </View>
  );
};

export default ChatAvatar; 
import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { ChatAvatarProps } from './types';
import { useTheme } from '../../theme/useTheme';

const ChatAvatar: React.FC<ChatAvatarProps> = ({ avatar, isOnline = false, size = 'medium' }) => {
  const theme = useTheme();

  const getAvatarSize = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 64;
      default:
        return 48;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return theme.typography.fontSize.small;
      case 'large':
        return theme.typography.fontSize.xlarge;
      default:
        return theme.typography.fontSize.large;
    }
  };

  const getIndicatorSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 24;
      default:
        return 16;
    }
  };

  const avatarSize = getAvatarSize();
  const indicatorSize = getIndicatorSize();

  const containerStyle: ViewStyle = {
    position: 'relative',
  };

  const avatarStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textStyle: TextStyle = {
    fontSize: getTextSize(),
    color: theme.colors.text,
  };

  const indicatorStyle: ViewStyle = {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: indicatorSize,
    height: indicatorSize,
    backgroundColor: theme.colors.success,
    borderRadius: indicatorSize / 2,
    borderWidth: 2,
    borderColor: theme.colors.background,
  };

  return (
    <View style={containerStyle}>
      {/* Avatar */}
      <View style={avatarStyle}>
        <Text style={textStyle}>{avatar}</Text>
      </View>

      {/* Online indicator */}
      {isOnline && <View style={indicatorStyle} />}
    </View>
  );
};

export default ChatAvatar;

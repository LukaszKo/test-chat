import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { ChatItemProps } from './shared/types';
import { ChatAvatar } from './shared';
import { useTheme } from '../theme/useTheme';

const ChatItem: React.FC<ChatItemProps> = ({ item, onPress }) => {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  };

  const avatarContainerStyle: ViewStyle = {
    marginRight: theme.spacing.sm,
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    marginRight: theme.spacing.sm,
  };

  const headerRowStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs / 2,
  };

  const nameStyle: TextStyle = {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    flex: 1,
  };

  const timeStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  };

  const messageRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
  };

  const messageStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    flex: 1,
  };

  const badgeStyle: ViewStyle = {
    width: 20,
    height: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.xs,
  };

  const badgeTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: 'white',
    fontWeight: theme.typography.fontWeight.bold,
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={() => onPress(item)}>
      <View style={avatarContainerStyle}>
        <ChatAvatar avatar={item.avatar} isOnline={item.isOnline} size='medium' />
      </View>

      <View style={contentStyle}>
        {/* Name and Time */}
        <View style={headerRowStyle}>
          <Text style={nameStyle}>{item.name}</Text>
          <Text style={timeStyle}>{item.time}</Text>
        </View>

        {/* Message */}
        <View style={messageRowStyle}>
          <Text style={messageStyle} numberOfLines={1}>
            {item.message}
          </Text>
          {item.unreadCount && (
            <View style={badgeStyle}>
              <Text style={badgeTextStyle}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { ChatItem };

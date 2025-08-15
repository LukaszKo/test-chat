import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChatItemProps } from '../shared/types';
import { ChatAvatar } from '../shared';
import { useTheme } from '../theme/useTheme';

const ChatItem: React.FC<ChatItemProps> = ({ item, onPress }) => {
  const theme = useTheme();
  const hasUnreadMessages = item.unreadCount && item.unreadCount > 0;
  
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borderLight,
        backgroundColor: hasUnreadMessages ? theme.colors.unread : theme.colors.background,
      }}
      onPress={() => onPress(item)}
    >
      <View style={{ marginRight: theme.spacing.md }}>
        <ChatAvatar 
          avatar={item.avatar}
          isOnline={item.isOnline}
          size="medium"
        />
      </View>

      <View style={{ flex: 1, marginRight: theme.spacing.md }}>
        {/* Name and Time */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: theme.spacing.xs,
        }}>
          <Text style={{
            fontSize: theme.typography.fontSize.base,
            flex: 1,
            fontWeight: hasUnreadMessages ? theme.typography.fontWeight.bold : theme.typography.fontWeight.semibold,
            color: theme.colors.text,
          }}>
            {item.name}
          </Text>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            marginLeft: theme.spacing.sm,
            color: hasUnreadMessages ? theme.colors.gray[700] : theme.colors.textSecondary,
            fontWeight: hasUnreadMessages ? theme.typography.fontWeight.medium : theme.typography.fontWeight.normal,
          }}>
            {item.time}
          </Text>
        </View>

        {/* Message */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            flex: 1,
            color: hasUnreadMessages ? theme.colors.gray[800] : theme.colors.textSecondary,
            fontWeight: hasUnreadMessages ? theme.typography.fontWeight.medium : theme.typography.fontWeight.normal,
          }} numberOfLines={1}>
            {item.message}
          </Text>
          {item.unreadCount && (
            <View style={{
              width: 20,
              height: 20,
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.full,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: theme.spacing.sm,
            }}>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: 'white',
                fontWeight: theme.typography.fontWeight.bold,
              }}>
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem; 
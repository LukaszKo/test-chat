import React, { useRef } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { MessageItemProps } from '../shared/types';
import { formatMessageTime } from '../../../utils/dateUtils';
import ReplyBubble from './ReplyBubble';
import { useTheme } from '../theme/useTheme';

const MessageItem: React.FC<MessageItemProps> = ({ message, onLongPress, onReactionPress }) => {
  const theme = useTheme();
  const messageRef = useRef<View>(null);
  
  const handleLongPress = () => {
    if (messageRef.current) {
      messageRef.current.measure((x, y, width, height, pageX, pageY) => {
        onLongPress?.(message, { x: Math.round(pageX), y: Math.round(pageY), width, height });
      });
    } else {
      onLongPress?.(message);
    }
  };

  const handleReactionPress = () => {
    if (message.reactions && message.reactions.length > 0) {
      onReactionPress?.(message);
    }
  };

  return (
    <View style={{
      marginBottom: theme.spacing.md,
      alignItems: message.isMe ? 'flex-end' : 'flex-start',
    }}>
      <Pressable
        ref={messageRef}
        onLongPress={handleLongPress}
        delayLongPress={500}
        style={{
          maxWidth: '80%',
          borderRadius: theme.borderRadius.xl,
          borderBottomRightRadius: message.isMe ? 4 : theme.borderRadius.xl,
          borderBottomLeftRadius: message.isMe ? theme.borderRadius.xl : 4,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.md,
          backgroundColor: message.isMe ? theme.colors.messageBubble.sent : theme.colors.messageBubble.received,
        }}>
        {message.replyTo && (
          <ReplyBubble replyTo={message.replyTo} isMyMessage={message.isMe} />
        )}
        <Text style={{
          fontSize: theme.typography.fontSize.base,
          color: message.isMe ? theme.colors.messageBubble.sentText : theme.colors.messageBubble.receivedText,
        }}>
          {message.text}
        </Text>
      </Pressable>
      
      {/* Reactions */}
      {message.reactions && message.reactions.length > 0 && (
        <TouchableOpacity
          onPress={handleReactionPress}
          style={{
            marginTop: theme.spacing.xs,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius.full,
            justifyContent: message.isMe ? 'flex-end' : 'flex-start',
          }}>
          {message.reactions.map((reaction, index) => (
            <View
              key={`${reaction.emoji}-${index}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: theme.spacing.xs,
              }}>
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
              }}>
                {reaction.emoji}
              </Text>
              {reaction.count > 1 && (
                <Text style={{
                  fontSize: theme.typography.fontSize.xs,
                  color: theme.colors.textSecondary,
                  marginLeft: theme.spacing.xs,
                  fontWeight: theme.typography.fontWeight.medium,
                }}>
                  {reaction.count}
                </Text>
              )}
            </View>
          ))}
        </TouchableOpacity>
      )}
      
      <View style={{
        marginHorizontal: theme.spacing.sm,
        marginTop: theme.spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: message.isMe ? 'flex-end' : 'flex-start',
      }}>
        <Text style={{
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.textSecondary,
        }}>
          {formatMessageTime(message.timestamp)}
        </Text>
        {message.isMe && message.status && (
          <View style={{ marginLeft: theme.spacing.xs }}>
            {message.status === 'sent' && (
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.gray[400],
              }}>
                ✓
              </Text>
            )}
            {message.status === 'delivered' && (
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.gray[400],
              }}>
                ✓✓
              </Text>
            )}
            {message.status === 'read' && (
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.primary,
              }}>
                ✓✓
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default MessageItem; 
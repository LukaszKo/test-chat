import React, { useRef } from 'react';
import { View, Text, Pressable, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { MessageItemProps } from '../shared/types';
import { formatMessageTime } from '../../utils/dateUtils';
import ReplyBubble from './ReplyBubble';
import { useTheme } from '../../theme/useTheme';

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

  const containerStyle: ViewStyle = {
    marginBottom: theme.spacing.sm,
    alignItems: message.isMe ? 'flex-end' : 'flex-start',
  };

  const messageBubbleStyle: ViewStyle = {
    maxWidth: '80%',
    borderRadius: 16,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: message.isMe 
      ? theme.colors.messageBubble.sent 
      : theme.colors.messageBubble.received,
    borderBottomRightRadius: message.isMe ? 4 : 16,
    borderBottomLeftRadius: message.isMe ? 16 : 4,
  };

  const messageTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.medium,
    color: message.isMe 
      ? theme.colors.messageBubble.sentText 
      : theme.colors.messageBubble.receivedText,
    lineHeight: theme.typography.lineHeight.medium,
  };

  const reactionsContainerStyle: ViewStyle = {
    marginTop: theme.spacing.xs / 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    justifyContent: message.isMe ? 'flex-end' : 'flex-start',
  };

  const reactionItemStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.xs / 2,
  };

  const reactionEmojiStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
  };

  const reactionCountStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs / 2,
    fontWeight: theme.typography.fontWeight.medium,
  };

  const metaContainerStyle: ViewStyle = {
    marginHorizontal: theme.spacing.xs,
    marginTop: theme.spacing.xs / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: message.isMe ? 'flex-end' : 'flex-start',
  };

  const timeStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
  };

  const statusContainerStyle: ViewStyle = {
    marginLeft: theme.spacing.xs / 2,
  };

  const statusTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'read':
        return theme.colors.primary;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <View style={containerStyle}>
      <Pressable
        ref={messageRef}
        onLongPress={handleLongPress}
        delayLongPress={500}
        style={messageBubbleStyle}
      >
        {message.replyTo && <ReplyBubble replyTo={message.replyTo} isMyMessage={message.isMe} />}
        <Text style={messageTextStyle}>
          {message.text}
        </Text>
      </Pressable>

      {/* Reactions */}
      {message.reactions && message.reactions.length > 0 && (
        <TouchableOpacity
          onPress={handleReactionPress}
          style={reactionsContainerStyle}
        >
          {message.reactions.map((reaction, index) => (
            <View key={`${reaction.emoji}-${index}`} style={reactionItemStyle}>
              <Text style={reactionEmojiStyle}>{reaction.emoji}</Text>
              {reaction.count > 1 && (
                <Text style={reactionCountStyle}>{reaction.count}</Text>
              )}
            </View>
          ))}
        </TouchableOpacity>
      )}

      <View style={metaContainerStyle}>
        <Text style={timeStyle}>{formatMessageTime(message.timestamp)}</Text>
        {message.isMe && message.status && (
          <View style={statusContainerStyle}>
            {message.status === 'sent' && (
              <Text style={[statusTextStyle, { color: getStatusColor(message.status) }]}>✓</Text>
            )}
            {message.status === 'delivered' && (
              <Text style={[statusTextStyle, { color: getStatusColor(message.status) }]}>✓✓</Text>
            )}
            {message.status === 'read' && (
              <Text style={[statusTextStyle, { color: getStatusColor(message.status) }]}>✓✓</Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default MessageItem;

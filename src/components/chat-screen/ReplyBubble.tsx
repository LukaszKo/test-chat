import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { ReplyToMessage } from '../shared/types';
import { useTheme } from '../../theme/useTheme';

interface ReplyBubbleProps {
  replyTo: ReplyToMessage;
  isMyMessage: boolean;
}

const ReplyBubble: React.FC<ReplyBubbleProps> = ({ replyTo, isMyMessage }) => {
  const theme = useTheme();

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const containerStyle: ViewStyle = {
    marginBottom: theme.spacing.xs,
    borderRadius: 8,
    padding: theme.spacing.xs,
    backgroundColor: isMyMessage 
      ? 'rgba(255, 255, 255, 0.1)' 
      : theme.colors.surface,
    borderLeftWidth: 4,
    borderLeftColor: isMyMessage 
      ? 'white' 
      : theme.colors.primary,
  };

  const nameStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.medium,
    color: isMyMessage 
      ? 'rgba(59, 130, 246, 0.8)' // blue-200 equivalent
      : theme.colors.primary,
    marginBottom: theme.spacing.xs / 2,
  };

  const textStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: isMyMessage 
      ? 'rgba(255, 255, 255, 0.8)'
      : theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.small,
  };

  return (
    <View style={containerStyle}>
      <Text style={nameStyle}>
        {replyTo.isMe ? 'You' : (replyTo.senderName || 'Sender')}
      </Text>
      <Text style={textStyle}>
        {truncateText(replyTo.text)}
      </Text>
    </View>
  );
};

export default ReplyBubble;
import React from 'react';
import { View, Text } from 'react-native';
import { ReplyToMessage } from '../shared/types';
import { useTheme } from '../theme/useTheme';

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

  // Color scheme based on whether this is my message or theirs
  const borderColor = isMyMessage ? 'rgba(255, 255, 255, 0.3)' : theme.colors.primary;
  const nameColor = isMyMessage ? 'rgba(255, 255, 255, 0.8)' : theme.colors.primary;
  const textColor = isMyMessage ? 'rgba(255, 255, 255, 0.7)' : theme.colors.textSecondary;
  const backgroundColor = isMyMessage ? 'rgba(255, 255, 255, 0.1)' : theme.colors.surfaceSecondary;

  return (
    <View style={{
      marginBottom: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.sm,
      backgroundColor: backgroundColor,
      borderLeftWidth: 4,
      borderLeftColor: borderColor,
    }}>
      <Text style={{
        fontSize: theme.typography.fontSize.xs,
        fontWeight: theme.typography.fontWeight.medium,
        color: nameColor,
        marginBottom: theme.spacing.xs,
      }}>
        {replyTo.isMe ? 'You' : (replyTo.senderName || 'Sender')}
      </Text>
      <Text style={{
        fontSize: theme.typography.fontSize.sm,
        color: textColor,
        lineHeight: theme.typography.lineHeight.tight,
      }}>
        {truncateText(replyTo.text)}
      </Text>
    </View>
  );
};

export default ReplyBubble;
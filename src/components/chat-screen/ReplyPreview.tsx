import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { X } from 'lucide-react-native';
import { Message } from '../shared/types';
import { useTheme } from '../../theme/useTheme';

interface ReplyPreviewProps {
  replyToMessage: Message;
  onCancel: () => void;
}

const ReplyPreview: React.FC<ReplyPreviewProps> = ({ replyToMessage, onCancel }) => {
  const theme = useTheme();

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const hasExistingReply = !!replyToMessage.replyTo;

  const containerStyle: ViewStyle = {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  };

  const mainRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    marginRight: theme.spacing.sm,
  };

  const indicatorRowStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs / 2,
  };

  const indicatorStyle: ViewStyle = {
    width: 4,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    marginRight: theme.spacing.sm,
    height: hasExistingReply ? 48 : 32,
  };

  const textContentStyle: ViewStyle = {
    flex: 1,
  };

  const headerTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs / 2,
  };

  const originalReplyStyle: ViewStyle = {
    marginBottom: theme.spacing.xs,
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.border,
  };

  const originalReplyHeaderStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs / 2,
  };

  const originalReplyTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.small,
  };

  const messageTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.text,
    lineHeight: theme.typography.lineHeight.small,
  };

  const cancelButtonStyle: ViewStyle = {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: theme.colors.border,
  };

  return (
    <View style={containerStyle}>
      <View style={mainRowStyle}>
        <View style={contentStyle}>
          <View style={indicatorRowStyle}>
            <View style={indicatorStyle} />
            <View style={textContentStyle}>
              <Text style={headerTextStyle}>
                Replying to {replyToMessage.isMe ? 'yourself' : (replyToMessage.senderName || 'sender')}
                {hasExistingReply && ' (reply thread)'}
              </Text>
              
              {/* Show the original reply context if this message is already a reply */}
              {hasExistingReply && (
                <View style={originalReplyStyle}>
                  <Text style={originalReplyHeaderStyle}>
                    Originally replying to: {replyToMessage.replyTo!.isMe ? 'yourself' : (replyToMessage.replyTo!.senderName || 'sender')}
                  </Text>
                  <Text style={originalReplyTextStyle}>
                    {truncateText(replyToMessage.replyTo!.text, 40)}
                  </Text>
                </View>
              )}
              
              <Text style={messageTextStyle}>
                {truncateText(replyToMessage.text)}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={onCancel}
          style={cancelButtonStyle}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <X size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReplyPreview;
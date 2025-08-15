import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { Message } from '../shared/types';
import { useTheme } from '../theme/useTheme';

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

  return (
    <View style={{
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <View style={{
          flex: 1,
          marginRight: theme.spacing.md,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.xs,
          }}>
            <View style={{
              width: 4,
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.full,
              marginRight: theme.spacing.md,
              height: hasExistingReply ? 48 : 32,
            }} />
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.primary,
                marginBottom: theme.spacing.xs,
              }}>
                Replying to {replyToMessage.isMe ? 'yourself' : (replyToMessage.senderName || 'sender')}
                {hasExistingReply && ' (reply thread)'}
              </Text>
              
              {/* Show the original reply context if this message is already a reply */}
              {hasExistingReply && (
                <View style={{
                  marginBottom: theme.spacing.sm,
                  padding: theme.spacing.sm,
                  backgroundColor: theme.colors.surfaceSecondary,
                  borderRadius: theme.borderRadius.md,
                  borderLeftWidth: 2,
                  borderLeftColor: theme.colors.gray[300],
                }}>
                  <Text style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.textSecondary,
                    marginBottom: theme.spacing.xs,
                  }}>
                    Originally replying to: {replyToMessage.replyTo!.isMe ? 'yourself' : (replyToMessage.replyTo!.senderName || 'sender')}
                  </Text>
                  <Text style={{
                    fontSize: theme.typography.fontSize.xs,
                    color: theme.colors.textSecondary,
                    lineHeight: theme.typography.lineHeight.tight,
                  }}>
                    {truncateText(replyToMessage.replyTo!.text, 40)}
                  </Text>
                </View>
              )}
              
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.gray[700],
                lineHeight: theme.typography.lineHeight.tight,
              }}>
                {truncateText(replyToMessage.text)}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={onCancel}
          style={{
            height: 32,
            width: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.borderRadius.full,
            backgroundColor: theme.colors.gray[200],
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <X size={16} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReplyPreview;
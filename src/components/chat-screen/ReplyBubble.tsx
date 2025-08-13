import React from 'react';
import { View, Text } from 'react-native';
import { ReplyToMessage } from '../shared/types';

interface ReplyBubbleProps {
  replyTo: ReplyToMessage;
  isMyMessage: boolean;
}

const ReplyBubble: React.FC<ReplyBubbleProps> = ({ replyTo, isMyMessage }) => {
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Color scheme based on whether this is my message or theirs
  const borderColor = isMyMessage ? 'border-l-white' : 'border-l-blue-500';
  const nameColor = isMyMessage ? 'text-blue-200' : 'text-blue-600';
  const textColor = isMyMessage ? 'text-white/80' : 'text-gray-600';
  const backgroundColor = isMyMessage ? 'bg-white/10' : 'bg-gray-100';

  return (
    <View className={`mb-2 rounded-lg p-2 ${backgroundColor} border-l-4 ${borderColor}`}>
      <Text className={`text-xs font-medium ${nameColor} mb-1`}>
        {replyTo.isMe ? 'You' : (replyTo.senderName || 'Sender')}
      </Text>
      <Text className={`text-sm ${textColor} leading-4`}>
        {truncateText(replyTo.text)}
      </Text>
    </View>
  );
};

export default ReplyBubble;
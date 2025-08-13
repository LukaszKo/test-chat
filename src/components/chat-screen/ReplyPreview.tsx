import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { Message } from '../shared/types';

interface ReplyPreviewProps {
  replyToMessage: Message;
  onCancel: () => void;
}

const ReplyPreview: React.FC<ReplyPreviewProps> = ({ replyToMessage, onCancel }) => {
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const hasExistingReply = !!replyToMessage.replyTo;

  return (
    <View className="border-b border-gray-200 bg-gray-50 px-4 py-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 mr-3">
          <View className="flex-row items-center mb-1">
            <View className="w-1 bg-blue-500 rounded-full mr-3" style={{ height: hasExistingReply ? 48 : 32 }} />
            <View className="flex-1">
              <Text className="text-xs font-medium text-blue-600 mb-1">
                Replying to {replyToMessage.isMe ? 'yourself' : (replyToMessage.senderName || 'sender')}
                {hasExistingReply && ' (reply thread)'}
              </Text>
              
              {/* Show the original reply context if this message is already a reply */}
              {hasExistingReply && (
                <View className="mb-2 p-2 bg-gray-100 rounded-lg border-l-2 border-gray-300">
                  <Text className="text-xs text-gray-500 mb-1">
                    Originally replying to: {replyToMessage.replyTo!.isMe ? 'yourself' : (replyToMessage.replyTo!.senderName || 'sender')}
                  </Text>
                  <Text className="text-xs text-gray-600 leading-3">
                    {truncateText(replyToMessage.replyTo!.text, 40)}
                  </Text>
                </View>
              )}
              
              <Text className="text-sm text-gray-700 leading-4">
                {truncateText(replyToMessage.text)}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={onCancel}
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-200"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <X size={16} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReplyPreview;
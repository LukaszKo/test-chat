import React, { useRef } from 'react';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { MessageItemProps } from '../shared/types';
import { formatMessageTime } from '../../utils/dateUtils';
import ReplyBubble from './ReplyBubble';

const MessageItem: React.FC<MessageItemProps> = ({ message, onLongPress, onReactionPress }) => {
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
    <View className={`mb-3 ${message.isMe ? 'items-end' : 'items-start'}`}>
      <Pressable
        ref={messageRef}
        onLongPress={handleLongPress}
        delayLongPress={500}
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          message.isMe ? 'rounded-br-none bg-blue-500' : 'rounded-bl-none bg-gray-200'
        }`}
      >
        {message.replyTo && <ReplyBubble replyTo={message.replyTo} isMyMessage={message.isMe} />}
        <Text className={`text-base ${message.isMe ? 'text-white' : 'text-gray-900'}`}>
          {message.text}
        </Text>
      </Pressable>

      {/* Reactions */}
      {message.reactions && message.reactions.length > 0 && (
        <TouchableOpacity
          onPress={handleReactionPress}
          className={`mt-1 flex-row items-center bg-white rounded-full ${
            message.isMe ? 'justify-end' : 'justify-start'
          }`}
        >
          {message.reactions.map((reaction, index) => (
            <View key={`${reaction.emoji}-${index}`} className='flex-row items-center p-1'>
              <Text className='text-sm'>{reaction.emoji}</Text>
              {reaction.count > 1 && (
                <Text className='text-xs text-gray-600 ml-1 font-medium'>{reaction.count}</Text>
              )}
            </View>
          ))}
        </TouchableOpacity>
      )}

      <View
        className={`mx-2 mt-1 flex-row items-center ${
          message.isMe ? 'justify-end' : 'justify-start'
        }`}
      >
        <Text className='text-xs text-gray-500'>{formatMessageTime(message.timestamp)}</Text>
        {message.isMe && message.status && (
          <View className='ml-1'>
            {message.status === 'sent' && <Text className='text-xs text-gray-400'>✓</Text>}
            {message.status === 'delivered' && <Text className='text-xs text-gray-400'>✓✓</Text>}
            {message.status === 'read' && <Text className='text-xs text-blue-500'>✓✓</Text>}
          </View>
        )}
      </View>
    </View>
  );
};

export default MessageItem;

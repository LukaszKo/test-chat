import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, Info, Phone, Video, MessageSquare } from 'lucide-react-native';
import { ChatScreenHeaderProps } from '../shared/types';

const ChatScreenHeader: React.FC<ChatScreenHeaderProps> = ({
  name = 'George Alan',
  isOnline = true,
  onBack,
  onVideoCall,
  onVoiceCall,
  onInfo,
  onSimulateTyping,
}) => {
  return (
    <View className="flex-row items-center justify-between border-b border-gray-100 bg-white px-4 py-3 z-50">
      <View className="flex-1 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-3">
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center">
          {/* Avatar */}
          <View className="relative mr-3">
            <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <Text className="text-base">👤</Text>
            </View>
            {isOnline && (
              <View className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-white bg-green-500" />
            )}
          </View>

          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">{name}</Text>
            <Text className="text-sm text-gray-500">{isOnline ? 'Online' : 'Offline'}</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center space-x-4 gap-4">
        {onSimulateTyping && (
          <TouchableOpacity onPress={onSimulateTyping}>
            <MessageSquare size={24} color="#374151" />
          </TouchableOpacity>
        )}
        {onVideoCall && (
          <TouchableOpacity onPress={onVideoCall}>
            <Video size={24} color="#374151" />
          </TouchableOpacity>
        )}
        {onVoiceCall && (
          <TouchableOpacity onPress={onVoiceCall}>
            <Phone size={24} color="#374151" />
          </TouchableOpacity>
        )}
        {onInfo && (
          <TouchableOpacity onPress={onInfo}>
            <Info size={24} color="#374151" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatScreenHeader; 
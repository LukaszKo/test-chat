import * as React from 'react';
import { View, Text } from 'react-native';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}


interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <View className={cn('bg-white px-4 py-4 border-b border-gray-100')}>
      <Text className={cn('text-4xl font-bold text-gray-900')}>{title}</Text>
    </View>
  );
};

export { ChatHeader };

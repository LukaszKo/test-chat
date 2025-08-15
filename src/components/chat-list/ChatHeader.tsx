import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/useTheme';

interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  const theme = useTheme();
  
  return (
    <View style={{
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    }}>
      <Text style={{
        fontSize: theme.typography.fontSize.xxl,
        fontWeight: theme.typography.fontWeight.bold,
        color: theme.colors.text,
      }}>
        {title}
      </Text>
    </View>
  );
};

export default ChatHeader; 
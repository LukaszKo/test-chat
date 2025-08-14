import * as React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme/useTheme';

interface ChatHeaderProps {
  title: string;
  style?: ViewStyle;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, style }) => {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...style,
  };

  const titleStyle: TextStyle = {
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    lineHeight: theme.typography.lineHeight.large,
  };

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
    </View>
  );
};

export { ChatHeader };

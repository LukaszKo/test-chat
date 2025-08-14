import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { DateSeparatorProps } from '../shared/types';
import { useTheme } from '../../theme/useTheme';

const DateSeparator: React.FC<DateSeparatorProps> = ({ displayDate }) => {
  const theme = useTheme();

  const containerStyle: ViewStyle = {
    marginVertical: theme.spacing.lg,
    alignItems: 'center',
  };

  const badgeStyle: ViewStyle = {
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
  };

  const textStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    fontWeight: theme.typography.fontWeight.medium,
  };

  return (
    <View style={containerStyle}>
      <View style={badgeStyle}>
        <Text style={textStyle}>
          {displayDate}
        </Text>
      </View>
    </View>
  );
};

export default DateSeparator; 
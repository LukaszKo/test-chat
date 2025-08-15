import React from 'react';
import { View, Text } from 'react-native';
import { DateSeparatorProps } from '../shared/types';
import { useTheme } from '../theme/useTheme';

const DateSeparator: React.FC<DateSeparatorProps> = ({ displayDate }) => {
  const theme = useTheme();
  
  return (
    <View style={{
      marginVertical: theme.spacing.lg,
      alignItems: 'center',
    }}>
      <View style={{
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.surfaceSecondary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
      }}>
        <Text style={{
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.textSecondary,
          fontWeight: theme.typography.fontWeight.medium,
        }}>
          {displayDate}
        </Text>
      </View>
    </View>
  );
};

export default DateSeparator; 
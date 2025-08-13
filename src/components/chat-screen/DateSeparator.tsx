import React from 'react';
import { View, Text } from 'react-native';
import { DateSeparatorProps } from '../shared/types';

const DateSeparator: React.FC<DateSeparatorProps> = ({ displayDate }) => {
  return (
    <View className="my-4 items-center">
      <View className="rounded-full bg-gray-100 px-3 py-1">
        <Text className="text-xs text-gray-600 font-medium">
          {displayDate}
        </Text>
      </View>
    </View>
  );
};

export default DateSeparator; 
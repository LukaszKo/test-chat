import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';

interface ChatListSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

const ChatListSearchBar: React.FC<ChatListSearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = "Search chats...",
}) => {
  const theme = useTheme();
  
  return (
    <View style={{
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
    }}>
      <View style={{ position: 'relative' }}>
        <View style={{
          position: 'absolute',
          left: theme.spacing.md,
          top: '50%',
          transform: [{ translateY: -10 }],
          zIndex: 10,
        }}>
          <Search size={20} color={theme.colors.textMuted} />
        </View>
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          style={{
            backgroundColor: theme.colors.surfaceSecondary,
            borderRadius: theme.borderRadius.full,
            paddingLeft: 48,
            paddingRight: 40,
            paddingVertical: theme.spacing.md,
            color: theme.colors.text,
            fontSize: theme.typography.fontSize.base,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never"
        />
        
        {value.length > 0 && (
          <TouchableOpacity
            onPress={onClear}
            style={{
              position: 'absolute',
              right: theme.spacing.md,
              top: '50%',
              transform: [{ translateY: -10 }],
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={20} color={theme.colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatListSearchBar;

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, Info, Phone, Video, MessageSquare } from 'lucide-react-native';
import { ChatScreenHeaderProps } from '../shared/types';
import { useTheme } from '../theme/useTheme';

const ChatScreenHeader: React.FC<ChatScreenHeaderProps> = ({
  name = 'George Alan',
  isOnline = true,
  onBack,
  onVideoCall,
  onVoiceCall,
  onInfo,
  onSimulateTyping,
}) => {
  const theme = useTheme();
  
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderLight,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      zIndex: 50,
    }}>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <TouchableOpacity onPress={onBack} style={{ marginRight: theme.spacing.md }}>
          <ArrowLeft size={24} color={theme.colors.gray[700]} />
        </TouchableOpacity>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          {/* Avatar */}
          <View style={{
            position: 'relative',
            marginRight: theme.spacing.md,
          }}>
            <View style={{
              height: 40,
              width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: theme.borderRadius.full,
              backgroundColor: theme.colors.gray[200],
            }}>
              <Text style={{
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.text,
              }}>
                👤
              </Text>
            </View>
            {isOnline && (
              <View style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                height: 12,
                width: 12,
                borderRadius: theme.borderRadius.full,
                borderWidth: 1,
                borderColor: theme.colors.background,
                backgroundColor: theme.colors.online,
              }} />
            )}
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text,
            }}>
              {name}
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.textSecondary,
            }}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.lg,
      }}>
        {onSimulateTyping && (
          <TouchableOpacity onPress={onSimulateTyping}>
            <MessageSquare size={24} color={theme.colors.gray[700]} />
          </TouchableOpacity>
        )}
        {onVideoCall && (
          <TouchableOpacity onPress={onVideoCall}>
            <Video size={24} color={theme.colors.gray[700]} />
          </TouchableOpacity>
        )}
        {onVoiceCall && (
          <TouchableOpacity onPress={onVoiceCall}>
            <Phone size={24} color={theme.colors.gray[700]} />
          </TouchableOpacity>
        )}
        {onInfo && (
          <TouchableOpacity onPress={onInfo}>
            <Info size={24} color={theme.colors.gray[700]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatScreenHeader; 
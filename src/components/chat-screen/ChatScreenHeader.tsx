import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { ArrowLeft, Info, Phone, Video, MessageSquare } from 'lucide-react-native';
import { ChatScreenHeaderProps } from '../shared/types';
import { useTheme } from '../../theme/useTheme';

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

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    zIndex: 50,
  };

  const leftSectionStyle: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  };

  const backButtonStyle: ViewStyle = {
    marginRight: 12,
  };

  const userInfoSectionStyle: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  };

  const avatarContainerStyle: ViewStyle = {
    position: 'relative',
    marginRight: 12,
  };

  const avatarStyle: ViewStyle = {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
  };

  const onlineIndicatorStyle: ViewStyle = {
    position: 'absolute',
    bottom: -2,
    right: -2,
    height: 12,
    width: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.success,
  };

  const userInfoStyle: ViewStyle = {
    flex: 1,
  };

  const nameTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    lineHeight: theme.typography.lineHeight.large,
  };

  const statusTextStyle: TextStyle = {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.small,
  };

  const actionButtonsStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  };

  return (
    <View style={containerStyle}>
      <View style={leftSectionStyle}>
        <TouchableOpacity onPress={onBack} style={backButtonStyle}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={userInfoSectionStyle}>
          {/* Avatar */}
          <View style={avatarContainerStyle}>
            <View style={avatarStyle}>
              <Text style={{ fontSize: theme.typography.fontSize.medium }}>👤</Text>
            </View>
            {isOnline && (
              <View style={onlineIndicatorStyle} />
            )}
          </View>

          <View style={userInfoStyle}>
            <Text style={nameTextStyle}>{name}</Text>
            <Text style={statusTextStyle}>{isOnline ? 'Online' : 'Offline'}</Text>
          </View>
        </View>
      </View>

      <View style={actionButtonsStyle}>
        {onSimulateTyping && (
          <TouchableOpacity onPress={onSimulateTyping}>
            <MessageSquare size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        {onVideoCall && (
          <TouchableOpacity onPress={onVideoCall}>
            <Video size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        {onVoiceCall && (
          <TouchableOpacity onPress={onVoiceCall}>
            <Phone size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
        {onInfo && (
          <TouchableOpacity onPress={onInfo}>
            <Info size={24} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatScreenHeader; 
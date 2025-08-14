import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Plus, Send, Mic } from 'lucide-react-native';
import { MessageInputProps, AttachmentResult } from '../shared/types';
import { AttachmentMenu } from '../shared/AttachmentMenu';
// import { useAttachmentMenu } from '../../hooks/useAttachmentMenu';
import ReplyPreview from './ReplyPreview';
import { useTheme } from '../../theme/useTheme';

interface MessageInputRef {
  focus: () => void;
}

const MessageInput = forwardRef<MessageInputRef, MessageInputProps>(
  (
    {
      value,
      onChangeText,
      onSend,
      onFocus,
      height,
      onContentSizeChange,
      replyToMessage,
      onCancelReply,
    },
    ref
  ) => {
    const theme = useTheme();
    const textInputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        textInputRef.current?.focus();
      },
    }));

    // Handle attachment results
    const handleAttachmentSelected = useCallback((result: AttachmentResult) => {
      console.log('Attachment selected:', result);

      // Here you can process the attachment and add it to the message
      // For example, you might want to:
      // 1. Upload the file to your server
      // 2. Add the attachment to the message context
      // 3. Show a preview in the input area
      // 4. Send as a special message type

      switch (result.type) {
        case 'image':
          console.log('Image attachment:', result.data.uri);
          // You might want to show image preview and then send
          break;
        case 'document':
          console.log('Document attachment:', result.data.name);
          // Show document info and then send
          break;
        case 'location':
          console.log('Location attachment:', result.data.coordinates);
          // Send location message
          break;
        case 'contact':
          console.log('Contact attachment:', result.data);
          // Send contact info
          break;
        default:
          console.log('Other attachment:', result);
      }
    }, []);

    // const attachmentMenu = useAttachmentMenu(handleAttachmentSelected);

    const handleContentSizeChange = useCallback(
      (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
        const { height: contentHeight } = event.nativeEvent.contentSize;
        const minHeight = 50;
        const maxHeight = 100;
        const newHeight = Math.max(minHeight, Math.min(maxHeight, contentHeight + 16));
        onContentSizeChange(newHeight);
      },
      [onContentSizeChange]
    );

    const handleSend = useCallback(() => {
      if (value.trim()) {
        onSend();
      }
    }, [value, onSend]);

    const containerStyle: ViewStyle = {
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    };

    const inputRowStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xs,
      minHeight: height,
    };

    const attachButtonStyle: ViewStyle = {
      marginRight: theme.spacing.sm,
    };

    const inputContainerStyle: ViewStyle = {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 25,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.xs,
    };

    const textInputStyle: TextStyle = {
      flex: 1,
      fontSize: theme.typography.fontSize.medium,
      maxHeight: 70,
      minHeight: 18,
      paddingTop: Platform.OS === 'ios' ? 6 : 3,
      paddingBottom: Platform.OS === 'ios' ? 6 : 3,
      color: theme.colors.text,
    };

    const sendButtonStyle: ViewStyle = {
      marginLeft: theme.spacing.sm,
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      backgroundColor: value.trim() ? theme.colors.primary : theme.colors.border,
    };

    return (
      <>
        {replyToMessage && onCancelReply && (
          <ReplyPreview replyToMessage={replyToMessage} onCancel={onCancelReply} />
        )}
        <View style={containerStyle}>
          <View style={inputRowStyle}>
            <TouchableOpacity style={attachButtonStyle} onPress={() => {}}>
              <Plus size={24} color={theme.colors.textSecondary} />
            </TouchableOpacity>

            <View style={inputContainerStyle}>
              <TextInput
                ref={textInputRef}
                style={textInputStyle}
                value={value}
                onChangeText={onChangeText}
                placeholder='Napisz wiadomość...'
                placeholderTextColor={theme.colors.textSecondary}
                multiline
                maxLength={1000}
                onFocus={onFocus}
                onContentSizeChange={handleContentSizeChange}
                returnKeyType='default'
                textAlignVertical='center'
              />
            </View>

            <TouchableOpacity
              onPress={handleSend}
              style={sendButtonStyle}
              disabled={!value.trim()}
            >
              {value.trim() ? (
                <Send size={18} color='white' />
              ) : (
                <Mic size={18} color='white' />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* <AttachmentMenu
        ref={attachmentMenu.menuRef}
        onOptionSelect={attachmentMenu.handleOptionSelect}
        options={attachmentMenu.options}
      /> */}
      </>
    );
  }
);

MessageInput.displayName = 'MessageInput';

export default MessageInput;
export type { MessageInputRef };

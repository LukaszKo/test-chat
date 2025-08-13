import React, { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from 'react-native';
import { Plus, Send, Mic } from 'lucide-react-native';
import { MessageInputProps, AttachmentResult } from '../shared/types';
import { AttachmentMenu } from '../shared/AttachmentMenu';
// import { useAttachmentMenu } from '../../hooks/useAttachmentMenu';
import ReplyPreview from './ReplyPreview';

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

    return (
      <>
        {replyToMessage && onCancelReply && (
          <ReplyPreview replyToMessage={replyToMessage} onCancel={onCancelReply} />
        )}
        <View className='border-t border-gray-100 bg-white'>
          <View className='flex-row items-center bg-white px-4 py-2' style={{ minHeight: height }}>
            <TouchableOpacity className='mr-3' onPress={() => {}}>
              <Plus size={24} color='#6B7280' />
            </TouchableOpacity>

            <View className='flex-1 flex-row items-center rounded-full bg-gray-100 px-4 py-1.5'>
              <TextInput
                ref={textInputRef}
                style={[
                  {
                    flex: 1,
                    fontSize: 16,
                    maxHeight: 70,
                    minHeight: 18,
                    paddingTop: Platform.OS === 'ios' ? 6 : 3,
                    paddingBottom: Platform.OS === 'ios' ? 6 : 3,
                    color: '#000',
                  },
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder='Napisz wiadomość...'
                placeholderTextColor='#999'
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
              className='ml-3 h-10 w-10 items-center justify-center rounded-full'
              style={{ backgroundColor: value.trim() ? '#3B82F6' : '#D1D5DB' }}
              disabled={!value.trim()}
            >
              {value.trim() ? <Send size={18} color='white' /> : <Mic size={18} color='white' />}
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

import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, KeyboardProvider } from 'react-native-keyboard-controller';
import { useChatMessages } from '../../hooks/useChatMessages';
import { useMessageInput } from '../../hooks/useMessageInput';
import { useReactionDetails } from '../../hooks/useReactionDetails';
import { MessageList, MessageInput, MessageListRef, MessageActionSheet, ChatScreenHeader } from '.';
import ReactionDetailsSheet from './ReactionDetailsSheet';
import { MessageInputRef } from './MessageInput';
import { Message } from '../shared/types';

const Chat = ({ name }: { name: string }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Action sheet state
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messagePosition, setMessagePosition] = useState<
    { x: number; y: number; width: number; height: number } | undefined
  >(undefined);

  // Reply state
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);

  const messageListRef = useRef<MessageListRef>(null);
  const messageInputRef = useRef<MessageInputRef>(null);

  // Chat messages hook
  const { messages, sendMessage, addReaction } = useChatMessages(name as string);

  // Reaction details hook
  const {
    isReactionDetailsVisible,
    selectedReactions,
    selectedMessageText,
    showReactionDetails,
    hideReactionDetails,
    removeReaction,
    addReaction: addReactionFromDetails,
  } = useReactionDetails();

  // Handle input focus (no scrolling needed with inverted FlatList)
  const handleInputFocus = useCallback(() => {
    // With inverted FlatList, latest messages are naturally visible
  }, []);

  // Message action handlers
  const handleMessageLongPress = useCallback(
    (message: Message, position?: { x: number; y: number; width: number; height: number }) => {
      console.log('message', position);
      setSelectedMessage(message);
      setMessagePosition(position);
      setActionSheetVisible(true);
    },
    []
  );

  const handleActionSheetClose = useCallback(() => {
    setActionSheetVisible(false);
    setSelectedMessage(null);
    setMessagePosition(undefined);
  }, []);

  const handleActionPress = useCallback(
    (action: string) => {
      console.log(`Action pressed: ${action}`, selectedMessage);

      if (action === 'reply' && selectedMessage) {
        setReplyToMessage(selectedMessage);
        // Focus input after a short delay to ensure action sheet is closed
        setTimeout(() => {
          messageInputRef.current?.focus();
        }, 100);
      }

      // TODO: Implement other action logic (copy, translate, etc.)
    },
    [selectedMessage]
  );

  const handleEmojiReact = useCallback(
    (emoji: string) => {
      console.log(`Emoji reaction: ${emoji}`, selectedMessage);
      if (selectedMessage) {
        addReaction(selectedMessage.id, emoji);
      }
      handleActionSheetClose();
    },
    [selectedMessage, addReaction, handleActionSheetClose]
  );

  // Reaction details handlers
  const handleReactionPress = useCallback(
    (message: Message) => {
      if (message.reactions && message.reactions.length > 0) {
        showReactionDetails(message.reactions, message.text);
      }
    },
    [showReactionDetails]
  );

  // Handle adding reaction from details sheet
  const handleAddReactionFromDetails = useCallback(
    (emoji: string) => {
      console.log('Adding reaction from details sheet:', emoji);
      // Find the message that was being viewed in details
      const messageWithReactions = messages.find(
        (msg) => msg.reactions && msg.reactions.length > 0 && msg.text === selectedMessageText
      );

      if (messageWithReactions) {
        addReaction(messageWithReactions.id, emoji);
        hideReactionDetails();
      }
    },
    [messages, selectedMessageText, addReaction, hideReactionDetails]
  );

  // Reply handlers
  const handleCancelReply = useCallback(() => {
    setReplyToMessage(null);
  }, []);

  const handleReplyMessage = useCallback(
    (messageText: string) => {
      if (replyToMessage) {
        // Create reply context from the original message
        const replyContext = {
          id: replyToMessage.id,
          text: replyToMessage.text,
          senderName: replyToMessage.senderName,
          isMe: replyToMessage.isMe,
        };

        // Send message with reply context
        console.log('Sending reply:', { originalMessage: replyToMessage, replyText: messageText });
        sendMessage(messageText, replyContext);
        setReplyToMessage(null);
      } else {
        sendMessage(messageText);
      }
    },
    [replyToMessage, sendMessage]
  );

  // Message input hook
  const { message, composerHeight, setComposerHeight, handleTextChange, handleSend, handleFocus } =
    useMessageInput({
      onSend: handleReplyMessage,
      onFocus: handleInputFocus,
      onTextChange: (text: string) => {
        // Simulate other user typing when we start typing
      },
    });

  // Handle layout during initialization
  const onInitialLayoutViewLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (isInitialized) return;

      const { layout } = e.nativeEvent;
      if (layout.height <= 0) return;

      setIsInitialized(true);
    },
    [isInitialized]
  );

  // Handle sending message (no scroll needed with inverted FlatList)
  const handleSendMessage = useCallback(() => {
    handleSend();
    // New message will appear naturally at top of inverted list
  }, [handleSend]);

  // Handle header actions
  const handleBack = useCallback(() => {
    // router.back();
  }, []);

  const handleVideoCall = useCallback(() => {
    // Implement video call logic
    console.log('Video call pressed');
  }, []);

  const handleVoiceCall = useCallback(() => {
    // Implement voice call logic
    console.log('Voice call pressed');
  }, []);

  const handleInfo = useCallback(() => {
    // Implement info logic
    console.log('Info pressed');
  }, []);

  if (!isInitialized) {
    return (
      <KeyboardProvider>
        <SafeAreaView style={styles.container}>
          <ChatScreenHeader
            name={name as string}
            onBack={handleBack}
            onVideoCall={handleVideoCall}
            onVoiceCall={handleVoiceCall}
            onInfo={handleInfo}
          />
          <View style={styles.chatContainer} onLayout={onInitialLayoutViewLayout}>
            <View style={styles.loadingContainer}>
              {/* You could add a loading component here */}
            </View>
          </View>
        </SafeAreaView>
      </KeyboardProvider>
    );
  }

  return (
    <KeyboardProvider>
      <SafeAreaView style={styles.container}>
        <ChatScreenHeader
          name={name as string}
          onBack={handleBack}
          onVideoCall={handleVideoCall}
          onVoiceCall={handleVoiceCall}
          onInfo={handleInfo}
        />

        <KeyboardAvoidingView
          behavior='padding'
          style={styles.chatContainer}
          keyboardVerticalOffset={0}
        >
          <View style={styles.fill}>
            <MessageList
              ref={messageListRef}
              messages={messages}
              onMessageLongPress={handleMessageLongPress}
              onReactionPress={handleReactionPress}
              isTyping={false}
            />

            <MessageInput
              ref={messageInputRef}
              value={message}
              onChangeText={handleTextChange}
              onSend={handleSendMessage}
              onFocus={handleFocus}
              height={composerHeight}
              onContentSizeChange={setComposerHeight}
              replyToMessage={replyToMessage}
              onCancelReply={handleCancelReply}
            />
          </View>
        </KeyboardAvoidingView>

        <MessageActionSheet
          visible={actionSheetVisible}
          onClose={handleActionSheetClose}
          isMyMessage={selectedMessage?.isMe || false}
          selectedMessage={selectedMessage || undefined}
          messagePosition={messagePosition}
          onActionPress={handleActionPress}
          onEmojiReact={handleEmojiReact}
        />

        <ReactionDetailsSheet
          visible={isReactionDetailsVisible}
          onClose={hideReactionDetails}
          reactions={selectedReactions}
          messageText={selectedMessageText}
          onAddReaction={handleAddReactionFromDetails}
        />
      </SafeAreaView>
    </KeyboardProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Chat };

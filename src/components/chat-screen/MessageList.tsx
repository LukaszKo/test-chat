import React, { useRef, useCallback, forwardRef, useImperativeHandle, useMemo } from 'react';
import { View, FlatList, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { MessageListProps, MessageListItem } from '../shared/types';
import MessageItem from './MessageItem';
import DateSeparator from './DateSeparator';
import TypingIndicator from './TypingIndicator';
import { groupMessagesWithDateSeparators } from '../../../utils/dateUtils';

export interface MessageListRef {
  scrollToEnd: (animated?: boolean) => void;
}

interface ExtendedMessageListProps extends MessageListProps {
  isTyping?: boolean;
  typingUserName?: string;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const MessageList = forwardRef<MessageListRef, ExtendedMessageListProps>(
  ({ messages, onContentSizeChange, onMessageLongPress, onReactionPress, isTyping, onScroll }, ref) => {
    const flatListRef = useRef<FlatList>(null);

    // Group messages with date separators and reverse for inverted FlatList
    const messageItems = useMemo(() => {
      const groupedMessages = groupMessagesWithDateSeparators(messages);
      return groupedMessages.reverse(); // Reverse so newest messages appear first in inverted list
    }, [messages]);

    const scrollToEnd = useCallback((animated = true) => {
      if (!flatListRef?.current) return;
      flatListRef.current.scrollToEnd({ animated });
    }, []);

    useImperativeHandle(ref, () => ({
      scrollToEnd,
    }));

    const renderItem = useCallback(
      ({ item }: { item: MessageListItem }) => {
        if (item.type === 'date-separator') {
          return <DateSeparator date={item.date} displayDate={item.displayDate} />;
        } else {
          return (
            <MessageItem
              message={item}
              onLongPress={onMessageLongPress}
              onReactionPress={onReactionPress}
            />
          );
        }
      },
      [onMessageLongPress, onReactionPress]
    );

    const keyExtractor = useCallback((item: MessageListItem) => {
      if (item.type === 'date-separator') {
        return item.id;
      } else {
        return item.id.toString();
      }
    }, []);

    const handleContentSizeChange = useCallback(() => {
      // With inverted FlatList, no need to scroll - new messages appear naturally at top
      onContentSizeChange?.();
    }, [onContentSizeChange]);

    return (
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messageItems}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={handleContentSizeChange}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          windowSize={10}
          inverted={true}
        />
        {isTyping && <TypingIndicator isVisible={isTyping} />}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexGrow: 1,
    // Remove justifyContent since inverted FlatList handles positioning
  },
});

MessageList.displayName = 'MessageList';

export default MessageList;

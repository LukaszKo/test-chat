import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { Reply, Copy, Languages, MoreHorizontal, Plus } from 'lucide-react-native';
import { Message } from '../shared/types';
import ReplyBubble from './ReplyBubble';
import EmojiPickerComponent from './EmojiPicker';
import { BlurView } from 'expo-blur';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MessageActionSheetProps {
  visible: boolean;
  onClose: () => void;
  isMyMessage: boolean;
  selectedMessage?: Message;
  messagePosition?: { x: number; y: number; width: number; height: number };
  onActionPress: (action: string) => void;
  onEmojiReact?: (emoji: string) => void;
}

const MessagePreview = ({
  message,
  positions,
  messagePosition,
}: {
  message: Message;
  positions: any;
  messagePosition: any;
}) => {
  const topAnim = useRef(new Animated.Value(messagePosition.y)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Check if this is an edge case that needs animation
    const isEdgeCase = positions.isNearAverageHeight || positions.isNearTop;

    if (isEdgeCase && !hasAnimated.current) {
      // Start from original position
      topAnim.setValue(messagePosition.y);
      opacityAnim.setValue(0);

      // Animate to center position
      Animated.parallel([
        Animated.timing(topAnim, {
          toValue: positions.messagePreviewTop,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        hasAnimated.current = true;
      });
    } else {
      // For normal cases, set final position immediately
      topAnim.setValue(positions.messagePreviewTop);
      opacityAnim.setValue(1);
      hasAnimated.current = true;
    }
  }, [positions, messagePosition]);

  return (
    <Animated.View
      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
        message.isMe ? 'rounded-br-md bg-blue-500' : 'rounded-bl-md bg-gray-200'
      }`}
      style={{
        position: 'absolute',
        top: topAnim,
        left: messagePosition.x,
        width: messagePosition.width,
        height: messagePosition.height,
        zIndex: 1000,
        opacity: opacityAnim,
      }}>
      {message.replyTo && <ReplyBubble replyTo={message.replyTo} isMyMessage={message.isMe} />}
      <Text className={`text-base ${message.isMe ? 'text-white' : 'text-gray-900'}`}>
        {message.text}
      </Text>
    </Animated.View>
  );
};

const MessageActionSheet: React.FC<MessageActionSheetProps> = ({
  visible,
  onClose,
  isMyMessage,
  selectedMessage,
  messagePosition,
  onActionPress,
  onEmojiReact,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Animation values for emoji bar and action menu
  const emojiBarOpacityAnim = useRef(new Animated.Value(0)).current;
  const actionMenuOpacityAnim = useRef(new Animated.Value(0)).current;
  const hasAnimated = useRef(false);

  const handleActionPress = (action: string) => {
    onActionPress(action);
    onClose();
  };

  const handleEmojiPress = (emoji: string) => {
    onEmojiReact?.(emoji);
    onClose();
  };

  const handleMoreReactions = () => {
    // Show the custom emoji picker instead of native keyboard
    setShowEmojiPicker(true);
  };

  const handleEmojiPickerClose = () => {
    setShowEmojiPicker(false);
  };

  const handleEmojiPickerSelect = (emoji: string) => {
    onEmojiReact?.(emoji);
    setShowEmojiPicker(false);
    onClose();
  };

  const emojis = ['❤️', '😂', '😮', '😢', '😡', '👍'];

  // Calculate positions for emoji bar and action menu
  const getPositions = () => {
    if (!messagePosition) {
      return {
        emojiBar: { top: screenHeight / 2 - 200, left: screenWidth / 2 - 160 },
        actionMenu: { top: screenHeight / 2 + 50, left: screenWidth / 2 - 100 },
      };
    }

    const emojiBarWidth = 320;
    const emojiBarHeight = 60;
    const actionMenuWidth = 200;
    const actionMenuHeight = 160;
    const padding = 20;
    const spacing = 8; // Space between components and message
    const averageScreenHeight = 844; // iPhone 14 Pro height, adjust as needed
    const centerThreshold = 300; // Distance from average height to trigger center positioning

    // Check if message is close to average screen height or top of screen
    const isNearAverageHeight = Math.abs(messagePosition.y - averageScreenHeight) < centerThreshold;
    const isNearTop = messagePosition.y < 200; // Close to top of screen

    let emojiLeft, emojiTop, actionLeft, actionTop, messagePreviewTop;

    if (isNearAverageHeight || isNearTop) {
      // Center positioning: Stack everything in the center of the screen
      const centerY = screenHeight / 2;
      const totalHeight =
        emojiBarHeight + spacing + messagePosition.height + spacing + actionMenuHeight;
      const startY = centerY - totalHeight / 2;

      emojiTop = startY;
      messagePreviewTop = startY + emojiBarHeight + spacing;
      actionTop = startY + emojiBarHeight + spacing + messagePosition.height + spacing;
    } else {
      // Normal positioning: Relative to message
      emojiTop = messagePosition.y - emojiBarHeight - spacing;
      messagePreviewTop = messagePosition.y;
      actionTop = messagePosition.y + messagePosition.height + spacing;
    }

    emojiLeft = messagePosition.x;
    actionLeft = messagePosition.x;

    if (emojiLeft + emojiBarWidth > screenWidth - padding) {
      emojiLeft = screenWidth - emojiBarWidth - padding;
    }
    if (emojiLeft < padding) {
      emojiLeft = padding;
    }

    // Adjust action menu horizontal position
    if (actionLeft + actionMenuWidth > screenWidth - padding) {
      actionLeft = screenWidth - actionMenuWidth - padding;
    }
    if (actionLeft < padding) {
      actionLeft = padding;
    }

    // Apply boundary adjustments only for normal positioning
    if (!isNearAverageHeight) {
      // Adjust emoji bar horizontal position if it would go off screen

      // Adjust emoji bar vertical position if it would go off screen
      if (emojiTop < padding) {
        emojiTop = messagePosition.y + messagePosition.height + spacing;
      }

      // Adjust action menu vertical position if it would go off screen
      if (actionTop + actionMenuHeight > screenHeight - padding) {
        actionTop = messagePosition.y - actionMenuHeight - spacing;
      }
    }

    return {
      emojiBar: { top: emojiTop, left: emojiLeft },
      actionMenu: { top: actionTop, left: actionLeft },
      messagePreviewTop,
      isNearAverageHeight,
      isNearTop,
    };
  };

  const positions = getPositions();

  // Animation effect for emoji bar and action menu
  useEffect(() => {
    if (visible && messagePosition && !hasAnimated.current) {
      // Reset opacity to 0
      emojiBarOpacityAnim.setValue(0);
      actionMenuOpacityAnim.setValue(0);

      // Use requestAnimationFrame to ensure components are rendered before animation
      requestAnimationFrame(() => {
        // Animate to final positions with staggered timing
        Animated.sequence([
          // First animate emoji bar
          Animated.timing(emojiBarOpacityAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false,
          }),
          // Then animate action menu with slight delay
          Animated.timing(actionMenuOpacityAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false,
          }),
        ]).start(() => {
          hasAnimated.current = true;
        });
      });
    }
  }, [visible, messagePosition, positions]);

  // Reset animation state when sheet becomes invisible
  useEffect(() => {
    if (!visible) {
      hasAnimated.current = false;
      emojiBarOpacityAnim.setValue(0);
      actionMenuOpacityAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Dark overlay with spotlight effect */}
      <BlurView style={styles.spotlightOverlay} intensity={20}>
        <Pressable style={styles.overlayPressable} onPress={onClose} />
      </BlurView>

      {/* Rendered copy of the selected message bubble */}
      {messagePosition && selectedMessage && (
        <MessagePreview
          message={selectedMessage}
          positions={positions}
          messagePosition={messagePosition}
        />
      )}

      {/* Emoji Bar */}
      <Animated.View
        style={[
          styles.emojiBar,
          {
            position: 'absolute',
            top: positions.emojiBar.top,
            left: positions.emojiBar.left,
            opacity: emojiBarOpacityAnim,
          },
        ]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.emojiContainer}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity
              key={index}
              style={styles.emojiButton}
              onPress={() => handleEmojiPress(emoji)}>
              <Text style={styles.emojiText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addEmojiButton} onPress={handleMoreReactions}>
            <Plus size={20} color="#666" />
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      {/* Action Menu */}
      <Animated.View
        style={[
          styles.actionMenu,
          {
            position: 'absolute',
            top: positions.actionMenu.top,
            left: positions.actionMenu.left,
            opacity: actionMenuOpacityAnim,
          },
        ]}>
        <View style={styles.actionItems}>
          {!isMyMessage && (
            <TouchableOpacity style={styles.actionRow} onPress={() => handleActionPress('reply')}>
              <Reply size={18} color="#333" />
              <Text style={styles.actionLabel}>Reply</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.actionRow} onPress={() => handleActionPress('copy')}>
            <Copy size={18} color="#333" />
            <Text style={styles.actionLabel}>Copy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow} onPress={() => handleActionPress('translate')}>
            <Languages size={18} color="#333" />
            <Text style={styles.actionLabel}>Translate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionRow} onPress={() => handleActionPress('more')}>
            <MoreHorizontal size={18} color="#333" />
            <Text style={styles.actionLabel}>More</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Custom Emoji Picker */}
      <EmojiPickerComponent
        visible={showEmojiPicker}
        onClose={handleEmojiPickerClose}
        onEmojiSelected={handleEmojiPickerSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  spotlightOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 998,
  },
  overlayPressable: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  emojiBar: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 1001,
    maxWidth: 320,
  },
  emojiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  emojiButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  emojiText: {
    fontSize: 18,
  },
  addEmojiButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  actionMenu: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 1001,
    minWidth: 160,
    maxWidth: 200,
  },
  actionItems: {
    paddingVertical: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44,
  },
  actionLabel: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  hiddenEmojiInput: {
    position: 'absolute',
    left: -9999,
    opacity: 0,
    height: 0,
    width: 0,
  },
});

export default MessageActionSheet;

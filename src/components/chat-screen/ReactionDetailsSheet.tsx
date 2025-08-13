import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { MessageReaction } from '../shared/types';
import EmojiPickerComponent from './EmojiPicker';

interface ReactionDetailsSheetProps {
  visible: boolean;
  onClose: () => void;
  reactions: MessageReaction[];
  messageText: string;
  onAddReaction?: (emoji: string) => void;
}

interface UserReaction {
  id: string;
  name: string;
  avatar?: string;
  emoji: string;
  timestamp: string;
}

const ReactionDetailsSheet: React.FC<ReactionDetailsSheetProps> = ({
  visible,
  onClose,
  reactions,
  messageText,
  onAddReaction,
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Show/hide action sheet based on visible prop
  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.show();
    } else {
      actionSheetRef.current?.hide();
    }
  }, [visible]);

  // Mock user data - in real app this would come from a user service
  const getUserReactions = (): UserReaction[] => {
    const userReactions: UserReaction[] = [];
    
    reactions.forEach((reaction) => {
      // Mock users for each reaction
      const mockUsers = [
        { id: '1', name: 'Ty', avatar: '👤' },
        { id: '2', name: 'Anna', avatar: '👩' },
        { id: '3', name: 'Młody Żuku', avatar: '🚗' },
        { id: '4', name: 'Lele', avatar: '🎭' },
        { id: '5', name: 'Igła', avatar: '🏠' },
      ];

      // Create user reactions based on count
      for (let i = 0; i < Math.min(reaction.count, mockUsers.length); i++) {
        userReactions.push({
          id: `${reaction.emoji}-${i}`,
          name: mockUsers[i].name,
          avatar: mockUsers[i].avatar,
          emoji: reaction.emoji,
          timestamp: new Date().toISOString(),
        });
      }
    });

    return userReactions;
  };

  const userReactions = getUserReactions();
  const totalReactions = reactions.reduce((sum, reaction) => sum + reaction.count, 0);

  const handleRemoveReaction = (userReaction: UserReaction) => {
    console.log('Remove reaction:', userReaction);
    // TODO: Implement remove reaction logic
  };

  const handleAddReaction = () => {
    // Close the reaction details sheet first
    actionSheetRef.current?.hide();
    onClose();
    
    // Then open the emoji picker after a short delay
    setTimeout(() => {
      setShowEmojiPicker(true);
    }, 300);
  };

  const handleEmojiPickerClose = () => {
    setShowEmojiPicker(false);
  };

  const handleEmojiPickerSelect = (emoji: string) => {
    console.log('Selected emoji from picker:', emoji);
    onAddReaction?.(emoji);
    setShowEmojiPicker(false);
  };

  const handleClose = () => {
    actionSheetRef.current?.hide();
    onClose();
  };

  return (
    <>
      <ActionSheet
        ref={actionSheetRef}
        onClose={handleClose}
        containerStyle={styles.container}
        headerAlwaysVisible={true}
        gestureEnabled={true}
        closeOnTouchBackdrop={true}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{totalReactions} reakcje</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Message Preview */}
        <View style={styles.messagePreview}>
          <Text style={styles.messageText} numberOfLines={2}>
            {messageText}
          </Text>
        </View>

        {/* Reaction Buttons */}
        <View style={styles.reactionButtons}>
          <TouchableOpacity style={styles.addReactionButton} onPress={handleAddReaction}>
            <Text style={styles.addReactionIcon}>😊</Text>
            <Text style={styles.addReactionText}>+</Text>
          </TouchableOpacity>

          {reactions.map((reaction, index) => (
            <View key={index} style={styles.reactionButton}>
              <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
              <Text style={styles.reactionCount}>{reaction.count}</Text>
            </View>
          ))}
        </View>

        {/* User Reactions List */}
        <ScrollView style={styles.userReactionsList} showsVerticalScrollIndicator={false}>
          {userReactions.map((userReaction) => (
            <View key={userReaction.id} style={styles.userReactionItem}>
              <View style={styles.userInfo}>
                <Text style={styles.userAvatar}>{userReaction.avatar}</Text>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{userReaction.name}</Text>
                  {userReaction.name === 'Ty' && (
                    <Text style={styles.removeText}>Kliknij, aby usunąć</Text>
                  )}
                </View>
              </View>
              <View style={styles.userReactionEmoji}>
                <Text style={styles.emojiText}>{userReaction.emoji}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ActionSheet>

      {/* Emoji Picker */}
      <EmojiPickerComponent
        visible={showEmojiPicker}
        onClose={handleEmojiPickerClose}
        onEmojiSelected={handleEmojiPickerSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  messagePreview: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  reactionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  addReactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addReactionIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  addReactionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  reactionEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  reactionCount: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  userReactionsList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  userReactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  removeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  userReactionEmoji: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  emojiText: {
    fontSize: 16,
  },
});

export default ReactionDetailsSheet; 
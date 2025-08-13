import { useState, useCallback } from 'react';
import { MessageReaction } from '../components/chat/shared/types';

interface UseReactionDetailsReturn {
  isReactionDetailsVisible: boolean;
  selectedReactions: MessageReaction[];
  selectedMessageText: string;
  showReactionDetails: (reactions: MessageReaction[], messageText: string) => void;
  hideReactionDetails: () => void;
  removeReaction: (emoji: string) => void;
  addReaction: (emoji: string) => void;
}

export const useReactionDetails = (): UseReactionDetailsReturn => {
  const [isReactionDetailsVisible, setIsReactionDetailsVisible] = useState(false);
  const [selectedReactions, setSelectedReactions] = useState<MessageReaction[]>([]);
  const [selectedMessageText, setSelectedMessageText] = useState('');

  const showReactionDetails = useCallback((reactions: MessageReaction[], messageText: string) => {
    setSelectedReactions(reactions);
    setSelectedMessageText(messageText);
    setIsReactionDetailsVisible(true);
  }, []);

  const hideReactionDetails = useCallback(() => {
    setIsReactionDetailsVisible(false);
    // Clear the data after a short delay to allow animation to complete
    setTimeout(() => {
      setSelectedReactions([]);
      setSelectedMessageText('');
    }, 300);
  }, []);

  const removeReaction = useCallback((emoji: string) => {
    console.log('Remove reaction:', emoji);
    // TODO: Implement remove reaction logic
    // This would typically call a service to remove the reaction from the backend
  }, []);

  const addReaction = useCallback((emoji: string) => {
    console.log('Add reaction from details:', emoji);
    // TODO: Implement add reaction logic
    // This would typically call a service to add the reaction to the backend
    // For now, this is handled by the parent component through the onAddReaction callback
  }, []);

  return {
    isReactionDetailsVisible,
    selectedReactions,
    selectedMessageText,
    showReactionDetails,
    hideReactionDetails,
    removeReaction,
    addReaction,
  };
}; 
import { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import { Message, ReplyToMessage } from '../components/chat';
import { MessageReaction } from '../components/chat/shared/types';

interface UseChatMessagesReturn {
  messages: Message[];
  sendMessage: (text: string, replyTo?: ReplyToMessage) => void;
  updateMessageStatus: (messageId: number, status: 'sent' | 'delivered' | 'read') => void;
  addReaction: (messageId: number, emoji: string) => void;
}

// Create dates for the demo using dayjs
const today = dayjs();
const yesterday = today.subtract(1, 'day');
const twoDaysAgo = today.subtract(2, 'day');
const threeDaysAgo = today.subtract(3, 'day');

const initialMessages: Message[] = [
  { 
    id: 1, 
    text: 'Cześć! Jak się masz?', 
    isMe: false, 
    timestamp: threeDaysAgo.hour(10).minute(30).toISOString(),
    senderName: 'Anna'
  },
  { 
    id: 2, 
    text: 'Hej! Świetnie, dzięki! A Ty?', 
    isMe: true, 
    timestamp: threeDaysAgo.hour(10).minute(31).toISOString(),
    reactions: [
      { emoji: '❤️', count: 1, users: ['anna'] }
    ]
  },
  { 
    id: 3, 
    text: 'Też dobrze! Co robimy dziś wieczorem?', 
    isMe: false, 
    timestamp: twoDaysAgo.hour(14).minute(20).toISOString(),
    senderName: 'Anna'
  },
  { 
    id: 4, 
    text: 'Może pójdziemy do kina?', 
    isMe: true, 
    timestamp: twoDaysAgo.hour(14).minute(25).toISOString(),
    reactions: [
      { emoji: '👍', count: 2, users: ['anna', 'me'] },
      { emoji: '🎬', count: 1, users: ['anna'] }
    ]
  },
  { 
    id: 5, 
    text: 'Dobry pomysł! Sprawdzę repertuar', 
    isMe: false, 
    timestamp: yesterday.hour(9).minute(15).toISOString(),
    senderName: 'Anna'
  },
  { 
    id: 6, 
    text: 'Super! Jakie filmy Cię interesują?', 
    isMe: true, 
    timestamp: yesterday.hour(9).minute(20).toISOString()
  },
  { 
    id: 7, 
    text: 'Może coś z akcją albo komedia?', 
    isMe: false, 
    timestamp: today.hour(8).minute(30).toISOString(),
    senderName: 'Anna',
    reactions: [
      { emoji: '😂', count: 1, users: ['me'] },
      { emoji: '🎭', count: 1, users: ['anna'] }
    ]
  },
  { 
    id: 8, 
    text: 'Brzmi świetnie! Sprawdzę co grają', 
    isMe: true, 
    timestamp: today.hour(8).minute(35).toISOString()
  },
  { 
    id: 9, 
    text: 'Idealnie! O której się spotykamy?', 
    isMe: false, 
    timestamp: today.hour(9).minute(10).toISOString(),
    senderName: 'Anna',
    replyTo: {
      id: 8,
      text: 'Brzmi świetnie! Sprawdzę co grają',
      senderName: undefined,
      isMe: true
    }
  },
  { 
    id: 10, 
    text: 'Może o 19:00? Seans jest o 20:00', 
    isMe: true, 
    timestamp: today.hour(9).minute(15).toISOString(),
    replyTo: {
      id: 9,
      text: 'Idealnie! O której się spotykamy?',
      senderName: 'Anna',
      isMe: false
    },
    reactions: [
      { emoji: '👍', count: 1, users: ['anna'] },
      { emoji: '⏰', count: 1, users: ['me'] }
    ]
  },
];

export const useChatMessages = (senderName?: string): UseChatMessagesReturn => {
  // Update initial messages with dynamic sender name
  const initialMessagesWithSender = initialMessages.map(msg => 
    msg.isMe ? msg : { ...msg, senderName: senderName || msg.senderName }
  );
  
  const [messages, setMessages] = useState<Message[]>(initialMessagesWithSender);

  const sendMessage = useCallback((text: string, replyTo?: ReplyToMessage) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now(), // Use timestamp as simple ID generator
      text: text.trim(),
      isMe: true,
      timestamp: dayjs().toISOString(), // Use dayjs for current timestamp
      status: 'sent',
      replyTo: replyTo,
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'delivered' as const } : msg
        )
      );
    }, 1000);

    // Simulate read status after 3 seconds
    setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: 'read' as const } : msg
        )
      );
    }, 3000);
  }, []);

  const updateMessageStatus = useCallback((messageId: number, status: 'sent' | 'delivered' | 'read') => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, status } : msg
      )
    );
  }, []);

  const addReaction = useCallback((messageId: number, emoji: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => {
        if (msg.id === messageId) {
          const currentReactions = msg.reactions || [];
          const existingReactionIndex = currentReactions.findIndex(r => r.emoji === emoji);
          
          if (existingReactionIndex >= 0) {
            // Update existing reaction count
            const updatedReactions = [...currentReactions];
            updatedReactions[existingReactionIndex] = {
              ...updatedReactions[existingReactionIndex],
              count: updatedReactions[existingReactionIndex].count + 1,
              users: [...updatedReactions[existingReactionIndex].users, 'me'] // Add current user
            };
            return { ...msg, reactions: updatedReactions };
          } else {
            // Add new reaction
            const newReaction: MessageReaction = {
              emoji,
              count: 1,
              users: ['me']
            };
            return { 
              ...msg, 
              reactions: [...currentReactions, newReaction] 
            };
          }
        }
        return msg;
      })
    );
  }, []);

  return {
    messages,
    sendMessage,
    updateMessageStatus,
    addReaction,
  };
}; 
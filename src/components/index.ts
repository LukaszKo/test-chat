// Chat List exports
export { default as ChatHeader } from './chat-list/ChatHeader';
export { default as ChatItem } from './chat-list/ChatItem';
export { default as ChatList } from './chat-list/ChatList';
export { default as ChatListSearchBar } from './chat-list/ChatListSearchBar';

// Chat Screen exports
export { default as ChatScreenHeader } from './chat-screen/ChatScreenHeader';
export { default as DateSeparator } from './chat-screen/DateSeparator';
export { default as MessageInput } from './chat-screen/MessageInput';
export { default as MessageItem } from './chat-screen/MessageItem';
export {
  default as MessageList,
  type MessageListRef,
} from './chat-screen/MessageList';
export { default as MessageActionSheet } from './chat-screen/MessageActionSheet';
export { default as ScrollToBottomButton } from './chat-screen/ScrollToBottomButton';

export { ThemeProvider } from '../components/theme/ThemeProvider';

// Shared exports
export { ChatAvatar, AttachmentMenu } from './shared';
export type {
  // Chat types
  ChatData,
  ChatItemProps,
  ChatListProps,
  // Message types
  Message,
  ReplyToMessage,
  MessageItemProps,
  MessageListProps,
  MessageInputProps,
  // Header types
  ChatScreenHeaderProps,
  // Date separator types
  DateSeparator as DateSeparatorType,
  MessageWithType,
  MessageListItem,
  DateSeparatorProps,
  // Avatar types
  ChatAvatarProps,
  // Attachment menu types
  AttachmentMenuProps,
  AttachmentMenuRef,
  AttachmentOption,
  UseAttachmentMenuReturn,
  // Attachment result types
  AttachmentResult,
  ImageAttachmentData,
  DocumentAttachmentData,
  LocationAttachmentData,
  ContactAttachmentData,
} from './shared/types';

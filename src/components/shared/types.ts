export interface ChatData {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
  unreadCount?: number;
  isOnline?: boolean;
  hasAttachment?: boolean;
}

export interface ChatItemProps {
  item: ChatData;
  onPress: (chat: ChatData) => void;
}

export interface ChatListProps {
  chats: ChatData[];
  onChatPress: (chat: ChatData) => void;
}

export interface ChatAvatarProps {
  avatar: string;
  isOnline?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// New Message types for chat screen
export interface ReplyToMessage {
  id: number;
  text: string;
  senderName?: string;
  isMe: boolean;
}

// Reaction types for emoji reactions
export interface MessageReaction {
  emoji: string;
  count: number;
  users: string[]; // Array of user IDs who reacted
}

export interface Message {
  id: number;
  text: string;
  isMe: boolean;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  senderName?: string;
  replyTo?: ReplyToMessage;
  reactions?: MessageReaction[]; // Array of reactions on this message
}

export interface MessageItemProps {
  message: Message;
  onLongPress?: (message: Message, position?: { x: number; y: number; width: number; height: number }) => void;
  onReactionPress?: (message: Message) => void;
}

export interface MessageListProps {
  messages: Message[];
  onContentSizeChange?: () => void;
  onMessageLongPress?: (message: Message, position?: { x: number; y: number; width: number; height: number }) => void;
  onReactionPress?: (message: Message) => void;
  isTyping?: boolean;
  typingUserName?: string;
}

export interface MessageInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onFocus?: () => void;
  height: number;
  onContentSizeChange: (height: number) => void;
  replyToMessage?: Message | null;
  onCancelReply?: () => void;
}

export interface ChatScreenHeaderProps {
  name?: string;
  isOnline?: boolean;
  onBack: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
  onInfo?: () => void;
  onSimulateTyping?: () => void;
}

// Date separator types
export interface DateSeparator {
  id: string;
  type: 'date-separator';
  date: string;
  displayDate: string;
}

export interface MessageWithType extends Message {
  type: 'message';
}

export type MessageListItem = MessageWithType | DateSeparator;

export interface DateSeparatorProps {
  date: string;
  displayDate: string;
}

// Attachment Menu types
export interface AttachmentOption {
  id: string;
  label: string;
  icon: any; // Icon component from lucide-react-native
  color: string;
}

export interface AttachmentMenuProps {
  onOptionSelect: (optionId: string) => void;
  options: AttachmentOption[];
}

export interface AttachmentMenuRef {
  show: () => void;
  hide: () => void;
}

export interface UseAttachmentMenuReturn {
  menuRef: React.RefObject<AttachmentMenuRef | null>;
  handleOptionSelect: (optionId: string) => void;
}

// Attachment result types
export interface AttachmentResult {
  type: 'image' | 'document' | 'location' | 'contact' | 'poll' | 'event';
  data: any;
}

export interface ImageAttachmentData {
  uri: string;
  width: number;
  height: number;
  fileSize?: number;
  fileName: string;
}

export interface DocumentAttachmentData {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}

export interface LocationAttachmentData {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address?: any;
  timestamp: number;
}

export interface ContactAttachmentData {
  id?: string;
  name?: string;
  phoneNumbers?: any[];
  emails?: any[];
} 
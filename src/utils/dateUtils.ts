import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import { Message, MessageListItem, DateSeparator, MessageWithType } from '../components/chat/shared/types';

// Extend dayjs with plugins
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const formatDateForSeparator = (dateStr: string): string => {
  const date = dayjs(dateStr);
  
  if (date.isToday()) {
    return 'Today';
  } else if (date.isYesterday()) {
    return 'Yesterday';
  } else {
    return date.format('ddd D MMMM'); // e.g., "Sun 19 June"
  }
};

export const getDateKey = (dateStr: string): string => {
  return dayjs(dateStr).format('YYYY-MM-DD'); // Consistent date key without time
};

export const groupMessagesWithDateSeparators = (messages: Message[]): MessageListItem[] => {
  if (messages.length === 0) return [];

  const result: MessageListItem[] = [];
  let lastDateKey: string | null = null;

  messages.forEach((message, index) => {
    const currentDateKey = getDateKey(message.timestamp);
    
    // Add date separator if this is the first message or date changed
    if (lastDateKey !== currentDateKey) {
      const displayDate = formatDateForSeparator(message.timestamp);
      const dateSeparator: DateSeparator = {
        id: `date-${currentDateKey}`,
        type: 'date-separator',
        date: currentDateKey,
        displayDate,
      };
      result.push(dateSeparator);
      lastDateKey = currentDateKey;
    }

    // Add the message with type
    const messageWithType: MessageWithType = {
      ...message,
      type: 'message',
    };
    result.push(messageWithType);
  });

  return result;
};

// Utility function for formatting time display in messages
export const formatMessageTime = (timestamp: string): string => {
  return dayjs(timestamp).format('HH:mm');
}; 
import { useState, useCallback } from 'react';

interface UseMessageInputReturn {
  message: string;
  setMessage: (text: string) => void;
  composerHeight: number;
  setComposerHeight: (height: number) => void;
  handleTextChange: (text: string) => void;
  handleSend: () => void;
  handleFocus: () => void;
  clearMessage: () => void;
}

interface UseMessageInputProps {
  onSend: (text: string) => void;
  onFocus?: () => void;
  onTextChange?: (text: string) => void;
  minHeight?: number;
  maxHeight?: number;
}

export const useMessageInput = ({
  onSend,
  onFocus,
  onTextChange,
  minHeight = 50,
  maxHeight = 100,
}: UseMessageInputProps): UseMessageInputReturn => {
  const [message, setMessage] = useState('');
  const [composerHeight, setComposerHeight] = useState(minHeight);

  const handleTextChange = useCallback((text: string) => {
    setMessage(text);
    onTextChange?.(text);
  }, [onTextChange]);

  const clearMessage = useCallback(() => {
    setMessage('');
    setComposerHeight(minHeight);
  }, [minHeight]);

  const handleSend = useCallback(() => {
    if (message.trim()) {
      onSend(message.trim());
      clearMessage();
    }
  }, [message, onSend, clearMessage]);

  const handleFocus = useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  const updateComposerHeight = useCallback((height: number) => {
    setComposerHeight(height);
  }, []);

  return {
    message,
    setMessage,
    composerHeight,
    setComposerHeight: updateComposerHeight,
    handleTextChange,
    handleSend,
    handleFocus,
    clearMessage,
  };
}; 
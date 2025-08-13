import React, { useState, useEffect } from 'react';
import EmojiPicker, { type EmojiType } from 'rn-emoji-keyboard';

interface EmojiPickerProps {
  visible: boolean;
  onClose: () => void;
  onEmojiSelected: (emoji: string) => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerProps> = ({
  visible,
  onClose,
  onEmojiSelected,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-open emoji picker when component becomes visible
  useEffect(() => {
    if (visible) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [visible]);

  // Handle emoji selection
  const handlePick = (emojiObject: EmojiType) => {
    console.log('Selected emoji:', emojiObject);
    onEmojiSelected(emojiObject.emoji);
    setIsOpen(false);
    onClose();
  };

  // Handle closing the emoji picker
  const handleCloseEmojiPicker = () => {
    setIsOpen(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <EmojiPicker
      onEmojiSelected={handlePick}
      open={isOpen}
      onClose={handleCloseEmojiPicker}
      enableSearchBar
    />
  );
};

export default EmojiPickerComponent;

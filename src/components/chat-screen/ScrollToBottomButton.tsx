import React from 'react';
import { Pressable, Animated } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';

interface ScrollToBottomButtonProps {
  visible: boolean;
  onPress: () => void;
}

const ScrollToBottomButton = ({ visible, onPress }: ScrollToBottomButtonProps) => {
  const theme = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(visible);
    });
  }, [visible, opacity]);

  if (!visible && !isVisible) {
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      {({ pressed }) => (
        <Animated.View style={[
          {
            position: 'absolute',
            bottom: 80, // Position above the message input
            right: theme.spacing.lg,
            zIndex: 1000,
            width: 32,
            height: 32,
            backgroundColor: theme.colors.background,
            borderRadius: theme.borderRadius.xl,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            opacity,
            transform: pressed ? [{ scale: 0.95 }] : [],
          }
        ]}>
          <ChevronDown size={20} color={theme.colors.text} />
        </Animated.View>
      )}
    </Pressable>
  );
};



export default ScrollToBottomButton;

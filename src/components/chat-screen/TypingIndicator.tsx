import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

interface TypingIndicatorProps {
  isVisible: boolean;
}

/**
 * TypingIndicator component that shows animated dots similar to WhatsApp
 * when someone is typing. The dots animate in sequence with a bouncing effect.
 */
const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  const masterAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isVisible) {
      // Reset animation when not visible
      masterAnimation.setValue(0);
      return;
    }

    // Create a single master animation that controls the wave
    const waveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(masterAnimation, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(masterAnimation, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    // Start the master animation
    waveAnimation.start();

    return () => {
      waveAnimation.stop();
    };
  }, [isVisible, masterAnimation]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <View style={styles.dotsContainer}>
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: masterAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 1, 0.3],
                }),
                transform: [
                  {
                    translateY: masterAnimation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0, -4, 0],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: masterAnimation.interpolate({
                  inputRange: [0.33, 0.83, 1.33],
                  outputRange: [0.3, 1, 0.3],
                }),
                transform: [
                  {
                    translateY: masterAnimation.interpolate({
                      inputRange: [0.33, 0.83, 1.33],
                      outputRange: [0, -4, 0],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: masterAnimation.interpolate({
                  inputRange: [0.66, 1.16, 1.66],
                  outputRange: [0.3, 1, 0.3],
                }),
                transform: [
                  {
                    translateY: masterAnimation.interpolate({
                      inputRange: [0.66, 1.16, 1.66],
                      outputRange: [0, -4, 0],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  bubble: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  senderNameContainer: {
    marginBottom: 4,
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#999',
    marginHorizontal: 3,
  },
});

export default TypingIndicator;

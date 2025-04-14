'use client'; // Важливо для клієнтських компонентів

import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const CARD_WIDTH = 300;
const CARD_HEIGHT = 450;

type CardType = {
  id: number;
  text: string;
  color: string;
};

const Card = ({ 
  text, 
  color, 
  onSwipeComplete,
  index,
  totalCards
}: {
  text: string;
  color: string;
  onSwipeComplete: () => void;
  index: number;
  totalCards: number;
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1 - index * 0.05);
  const zIndex = totalCards - index;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startX: number; startY: number }) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
      rotate.value = (translateX.value / CARD_WIDTH) * 10;
    },
    onEnd: (event) => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        const direction = translateX.value > 0 ? 1 : -1;
        translateX.value = withSpring(direction * SCREEN_WIDTH * 1.5);
        translateY.value = withSpring(event.velocityY / 2);
        rotate.value = withSpring(direction * 45);
        runOnJS(onSwipeComplete)();
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotate.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
    zIndex,
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.card, animatedStyle, { backgroundColor: color }]}>
        <Text style={styles.cardText}>{text}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

export const CardSwipe = () => {
  const [cards, setCards] = useState<CardType[]>([
    { id: 1, text: 'Картка 1', color: '#ffcccc' },
    { id: 2, text: 'Картка 2', color: '#ccffcc' },
    { id: 3, text: 'Картка 3', color: '#ccccff' },
    { id: 4, text: 'Картка 4', color: '#ffffcc' },
  ]);

  const handleSwipeComplete = (id: number) => {
    setCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          text={card.text}
          color={card.color}
          onSwipeComplete={() => handleSwipeComplete(card.id)}
          index={index}
          totalCards={cards.length}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
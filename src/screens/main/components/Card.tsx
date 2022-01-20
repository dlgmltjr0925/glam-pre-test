import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Dimensions, GestureResponderEvent, Platform } from 'react-native';
import FastImage, { Priority } from 'react-native-fast-image';
import React, { useCallback } from 'react';

import { Color } from '../../../constants/Color';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import styled from 'styled-components/native';

export interface Item {
  age: number;
  company: string;
  distance: number;
  height: number;
  id: number;
  introduction: string | null;
  job: string;
  location: string;
  name: string;
  pictures: string[];
}

export interface CardProps {
  item: Item;
  priority?: Priority;
}

export const CARD_WIDTH = Dimensions.get('screen').width - 12;
export const CARD_HEIGHT = CARD_WIDTH * 1.4;
export const ITEM_HEIGHT = CARD_HEIGHT + 12;

export const BASE_URL = 'https://test.dev.cupist.de';

const HAPTIC_TRIGGER_OPTIONS = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
};

const HAPTIC_TRIGGER_TYPE = Platform.select({
  ios: 'selection',
  android: 'impactMedium',
}) as ReactNativeHapticFeedback.HapticFeedbackTypes;

export default function Card({ item, priority = 'normal' }: CardProps) {
  const pictureIndex = useSharedValue<number>(0);
  const { pictures } = item;

  const animatedStyle = useAnimatedStyle(() => ({
    width: CARD_WIDTH * pictures.length,
    transform: [{ translateX: pictureIndex.value * CARD_WIDTH * -1 }],
  }));

  const handlePress = useCallback(
    ({ nativeEvent: { locationX, locationY } }: GestureResponderEvent) => {
      if (locationY > (CARD_HEIGHT * 2) / 3) {
        // 프로필 상세보기
      } else if (locationX < CARD_WIDTH / 2) {
        // 이전 사진
        ReactNativeHapticFeedback.trigger(
          HAPTIC_TRIGGER_TYPE,
          HAPTIC_TRIGGER_OPTIONS,
        );
        if (pictureIndex.value > 0) {
          pictureIndex.value--;
        }
      } else {
        // 다음 사진
        ReactNativeHapticFeedback.trigger(
          HAPTIC_TRIGGER_TYPE,
          HAPTIC_TRIGGER_OPTIONS,
        );
        if (pictureIndex.value < pictures.length - 1) {
          pictureIndex.value++;
        }
      }
    },
    [pictureIndex, pictures],
  );

  return (
    <Container>
      <PictureWrapper style={animatedStyle}>
        {pictures.map(picture => (
          <FastImage
            key={picture}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
            source={{
              uri: BASE_URL + picture,
              priority,
            }}
          />
        ))}
      </PictureWrapper>
      <PagingPressable onPress={handlePress} />
    </Container>
  );
}

const Container = styled(Animated.View)`
  align-self: center;
  margin: 12px 0 0;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${Color.Gray0};
`;

const PictureWrapper = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  height: ${CARD_HEIGHT}px;
  flex-direction: row;
`;

const PagingPressable = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

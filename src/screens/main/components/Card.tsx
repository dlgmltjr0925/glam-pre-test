import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  Platform,
} from 'react-native';
import FastImage, { Priority } from 'react-native-fast-image';
import React, { useCallback, useMemo, useState } from 'react';

import { Color } from '../../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
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
  todayRecommendation?: boolean;
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
  android: 'impactLight',
}) as ReactNativeHapticFeedback.HapticFeedbackTypes;

export default function Card({
  item,
  priority = 'normal',
  todayRecommendation = false,
}: CardProps) {
  const [pictureIndex, setPictureIndex] = useState<number>(0);
  const { pictures } = item;

  const animatedStyle = useAnimatedStyle(() => ({
    width: CARD_WIDTH * pictures.length,
    transform: [{ translateX: pictureIndex * CARD_WIDTH * -1 }],
  }));

  const info = useMemo(() => {
    const { name, age, introduction, job, height } = item;

    const distance =
      item.distance < 1000
        ? item.distance + 'm'
        : `${item.distance / 1000}`.slice(0, 3) + 'km';

    return {
      main: `${name}, ${age}`,
      introduction,
      sub: `${job} · ${distance}`,
      height: `${height}cm`,
    };
  }, [item]);

  const handlePressPicture = useCallback(
    ({ nativeEvent: { locationX, locationY } }: GestureResponderEvent) => {
      if (locationY > (CARD_HEIGHT * 2) / 3) {
        // 프로필 상세보기
        console.log('Profile Detail');
      } else if (locationX < CARD_WIDTH / 2) {
        // 이전 사진
        ReactNativeHapticFeedback.trigger(
          HAPTIC_TRIGGER_TYPE,
          HAPTIC_TRIGGER_OPTIONS,
        );
        if (pictureIndex > 0) {
          setPictureIndex(pictureIndex - 1);
        }
      } else {
        // 다음 사진
        ReactNativeHapticFeedback.trigger(
          HAPTIC_TRIGGER_TYPE,
          HAPTIC_TRIGGER_OPTIONS,
        );
        if (pictureIndex < pictures.length - 1) {
          setPictureIndex(pictureIndex + 1);
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
      <InfoWrapper>
        <InfoLinearGradient
          colors={['rgba(51, 51, 51, 0)', 'rgba(51, 51, 51, 1)']}
        />
        {todayRecommendation && (
          <HorizontalView>
            <TodayRecommendationText>오늘의 추천</TodayRecommendationText>
          </HorizontalView>
        )}
        <HorizontalView marginTop={12}>
          <MainInfoText>{info.main}</MainInfoText>
          <InfoIcon source={require('../../../assets/icon/main/info.png')} />
        </HorizontalView>
        <DetailInfoWrapper>
          {pictureIndex === 0 && info.introduction ? (
            <IntroductionText numberOfLines={2} ellipsizeMode="tail">
              {info.introduction}
            </IntroductionText>
          ) : (
            <>
              <SubInfoText>{info.sub}</SubInfoText>
              <HeightText>{info.height}</HeightText>
            </>
          )}
        </DetailInfoWrapper>
      </InfoWrapper>
      <PicturePressable onPress={handlePressPicture} />
      <ButtonWrapper>
        <DeleteButton>
          <Image source={require('../../../assets/icon/main/delete.png')} />
        </DeleteButton>
        <LikeButton>
          <LikeButtonText>좋아요</LikeButtonText>
        </LikeButton>
      </ButtonWrapper>
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
  justify-content: flex-end;
`;

const PictureWrapper = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  height: ${CARD_HEIGHT}px;
  flex-direction: row;
`;

const InfoWrapper = styled.View`
  padding: 0 16px;
`;

const HorizontalView = styled.View<{ marginTop?: number }>`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ marginTop = 0 }) => marginTop}px;
`;

const TodayRecommendationText = styled.Text`
  font-size: 14px;
  color: ${Color.White};
  padding: 5px 12px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.25);
  overflow: hidden;
`;

const MainInfoText = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${Color.White};
`;

const InfoIcon = styled.Image`
  margin-left: 4px;
`;

const DetailInfoWrapper = styled.View`
  margin-top: 8px;
`;

const IntroductionText = styled.Text`
  font-size: 16px;
  color: ${Color.White};
`;

const SubInfoText = styled.Text`
  font-size: 16px;
  color: ${Color.White};
`;

const HeightText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4px;
`;

const PicturePressable = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  padding: 20px 16px 16px;
  background-color: #333333;
`;

const DeleteButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 44px;
  margin-right: 8px;
  background-color: ${Color.DarkGray1};
  border-radius: 4px;s
`;

const LikeButton = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 44px;
  background-color: ${Color.GlamBlue};
  border-radius: 4px;s
`;

const LikeButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.White};
`;

const InfoLinearGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

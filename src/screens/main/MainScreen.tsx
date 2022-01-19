import Animated, { useSharedValue } from 'react-native-reanimated';
import {
  Dimensions,
  GestureResponderEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import React, { useCallback, useRef } from 'react';

import styled from 'styled-components/native';

const width = Dimensions.get('screen').width - 6;
const height = width * 1.4;
const contentHeight = height + 12;

export default function MainScreen() {
  const scrollViewRef = useRef(null);
  const contentOffsetY = useSharedValue<number>(0);
  const locationY = useSharedValue<number>(0);
  const timestamp = useSharedValue<number>(new Date().valueOf());

  const handleScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      contentOffsetY.value = nativeEvent.contentOffset.y;
    },
    [contentOffsetY],
  );

  const handleScrollEndDrag = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      console.log('handleScrollEndDrag');
      if (!scrollViewRef.current) {
        return;
      }

      const velocity = nativeEvent.velocity?.y || 0;
      const offsetY = contentOffsetY.value;
      const index = Math.floor(offsetY / contentHeight);

      console.log(velocity);
      console.log(index);

      const { scrollTo } = scrollViewRef.current as ScrollView;

      scrollTo({ y: contentOffsetY.value, animated: false });

      if (velocity < 0) {
        scrollTo({ y: (index + 1) * contentHeight });
      } else if (velocity > 0) {
        scrollTo({ y: index * contentHeight });
      } else {
        scrollTo({ y: index * contentHeight });
      }
    },
    [contentOffsetY],
  );

  const handleTouchMove = useCallback(
    ({ nativeEvent }: GestureResponderEvent) => {
      locationY.value = nativeEvent.locationY;
      timestamp.value = nativeEvent.timestamp;
    },
    [locationY, timestamp],
  );

  const handleTouchEnd = useCallback(
    ({ nativeEvent }: GestureResponderEvent) => {
      console.log('handleTouchEnd');
      // eslint-disable-next-line curly
      if (!scrollViewRef.current) return;
      const velocity =
        (nativeEvent.locationY - locationY.value) /
        (timestamp.value - nativeEvent.timestamp);
      const offsetY = contentOffsetY.value;

      let index = Math.floor(offsetY / contentHeight);
      const scrollView = scrollViewRef.current as ScrollView;
      if (index < 0) {
        index = 0;
      } else if (velocity <= -0.1) {
        index++;
      } else if (velocity >= 0.1) {
      } else {
        index = Math.floor((-contentHeight / 2 + offsetY) / contentHeight);
      }
      scrollView.scrollTo({ y: index * contentHeight });
      console.log(`index: ${index}, velocity: ${velocity}`);
    },
    [contentOffsetY, locationY, timestamp],
  );

  return (
    <Container
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} />}
      pagingEnabled
      onScroll={handleScroll}
      onMomentumScrollEnd={
        Platform.OS === 'android' ? handleScrollEndDrag : undefined
      }
      onResponderEnd={Platform.OS === 'android' ? handleTouchEnd : undefined}
      onTouchMove={handleTouchMove}
      onTouchEnd={Platform.OS === 'ios' ? handleTouchEnd : undefined}
      scrollEventThrottle={16}
      decelerationRate="fast">
      <Card>
        <Text>Card1</Text>
      </Card>
      <Card>
        <Text>Card2</Text>
      </Card>
      <Card>
        <Text>Card3</Text>
      </Card>
      <Card>
        <Text>Card4</Text>
      </Card>
      <Card>
        <Text>Card5</Text>
      </Card>
      <Card>
        <Text>Card6</Text>
      </Card>
      <Card>
        <Text>Card7</Text>
      </Card>
      <Card>
        <Text>Card8</Text>
      </Card>
      <Card>
        <Text>Card9</Text>
      </Card>
      <Card>
        <Text>Card10</Text>
      </Card>
      <Card>
        <Text>Card11</Text>
      </Card>
    </Container>
  );
}

const Container = styled.ScrollView`
  flex: 1;
`;

const Card = styled.View`
  align-self: center;
  margin: 12px 0 0;
  width: ${width}px;
  height: ${height}px;
  border-radius: 8px;
  border-width: ${StyleSheet.hairlineWidth}px;
`;

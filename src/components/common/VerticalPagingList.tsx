import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { ReactElement, useCallback, useState } from 'react';

import React from 'react';
import styled from 'styled-components/native';

export interface VerticalPagingListProps<ItemT = any> {
  data: ItemT[];
  itemHeight: number;
  keyExtractor: (item: ItemT, index: number) => string;
  renderItem: (info: { item: ItemT; index: number }) => ReactElement | null;
  scrollEventThrottle?: number;
}

const initialLayout: LayoutRectangle = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

export default function VerticalPagingList<T>({
  data,
  itemHeight,
  keyExtractor,
  renderItem,
  scrollEventThrottle = 16,
}: VerticalPagingListProps<T>) {
  const contentOffsetY = useSharedValue<number>(0);

  const [layout, setLayout] = useState<LayoutRectangle>(initialLayout);

  const handleLayout = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setLayout(layout);
    },
    [],
  );

  const handleScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      contentOffsetY.value = nativeEvent.contentOffset.y;
    },
    [contentOffsetY],
  );

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      contentOffsetY.value,
      [-1, 0, layout.height],
      [0, 0, layout.height - itemHeight],
    );

    return {
      paddingBottom: data.length * (layout.height - itemHeight),
      transform: [{ translateY }],
    };
  }, [data, layout, itemHeight]);

  return (
    <Container onLayout={handleLayout}>
      {layout.height > 0 && (
        <ContentScrollView
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={scrollEventThrottle}>
          <ContentWrapper style={animatedStyle}>
            {data.map((item, index) => (
              <ContentView
                key={keyExtractor(item, index)}
                style={{ height: itemHeight }}>
                {renderItem({ item, index })}
              </ContentView>
            ))}
          </ContentWrapper>
        </ContentScrollView>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ContentScrollView = styled.ScrollView`
  flex: 1;
`;

const ContentWrapper = styled(Animated.View)``;

const ContentView = styled.View`
  width: 100%;
`;

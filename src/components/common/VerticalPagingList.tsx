import {
  ActivityIndicator,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import React from 'react';
import styled from 'styled-components/native';

export interface VerticalPagingListProps<ItemT = any> extends ScrollViewProps {
  data: ItemT[];
  itemHeight: number;
  keyExtractor: (item: ItemT, index: number) => string;
  renderItem: (info: { item: ItemT; index: number }) => ReactElement | null;
  scrollEventThrottle?: number;
  onEndReached?: () => void;
  isFetchingNextPage?: boolean;
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
  onEndReached,
  isFetchingNextPage = false,
  ...props
}: VerticalPagingListProps<T>) {
  const isEndReached = useSharedValue<boolean>(false);
  const contentOffsetY = useSharedValue<number>(0);

  const [layout, setLayout] = useState<LayoutRectangle>(initialLayout);

  const endReachedThreadhold = useMemo(() => {
    return layout.height * (data.length - 1);
  }, [data.length, layout.height]);

  const handleLayout = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setLayout(layout);
    },
    [],
  );

  const handleScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { y } = nativeEvent.contentOffset;
      contentOffsetY.value = y;
      if (!isEndReached.value && y > endReachedThreadhold) {
        isEndReached.value = true;
        if (onEndReached) {
          onEndReached();
        }
      }
    },
    [contentOffsetY, endReachedThreadhold, isEndReached, onEndReached],
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

  useEffect(() => {
    isEndReached.value = false;
  }, [data.length, isEndReached]);

  return (
    <Container onLayout={handleLayout}>
      {layout.height > 0 && (
        <ScrollView
          {...props}
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
            {isFetchingNextPage && (
              <ActivityIndicatorWrapper
                style={{ height: layout.height - itemHeight }}>
                <ActivityIndicator />
              </ActivityIndicatorWrapper>
            )}
          </ContentWrapper>
        </ScrollView>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const ContentWrapper = styled(Animated.View)``;

const ContentView = styled.View`
  width: 100%;
`;

const ActivityIndicatorWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

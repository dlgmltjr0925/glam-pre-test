import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Dimensions, LayoutChangeEvent, LayoutRectangle } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import TopTabBarItem, { Item } from './TopTabBarItem';

import { Color } from '../../../constants/Color';
import styled from 'styled-components/native';

interface Layout {
  layout: LayoutRectangle;
  isDone: boolean;
}

interface LayoutRef {
  layouts: Layout[];
}

interface TopTabBarProps {
  items: Item[];
  offsetX: SharedValue<number>;
  onPressItem: (index: number) => void;
}

function getIntialLayoutRef(length: number): LayoutRef {
  const layouts = Array.from({ length }, () => ({
    layout: { x: 0, y: 0, width: 0, height: 0 },
    isDone: false,
  }));

  return { layouts };
}

export default function TopTabBar({
  items,
  offsetX,
  onPressItem,
}: TopTabBarProps) {
  const layoutRef = useRef<LayoutRef>(getIntialLayoutRef(items.length));
  const [layouts, setLayouts] = useState<LayoutRectangle[]>([]);

  const ranges = useMemo(() => {
    if (layouts.length === 0) {
      return null;
    }

    const screenWidth = Dimensions.get('screen').width;
    const inputRange = [
      -1,
      ...Array.from({ length: layouts.length }, (_, i) => screenWidth * i),
      screenWidth * (layouts.length - 1) + 1,
    ];

    const translateX = [
      layouts[0].x - 1,
      ...layouts.map(layout => layout.x),
      layouts[layouts.length - 1].x + 1,
    ];

    const width = [
      layouts[0].width,
      ...layouts.map(layout => layout.width),
      layouts[layouts.length - 1].width,
    ];

    const outputRange = {
      translateX,
      width,
    };

    return { inputRange, outputRange };
  }, [layouts]);

  const tintStyle = useAnimatedStyle(() => {
    if (!ranges) {
      return {};
    }

    const { inputRange, outputRange } = ranges;

    const translateX = interpolate(
      offsetX.value,
      inputRange,
      outputRange.translateX,
    );
    const width = interpolate(offsetX.value, inputRange, outputRange.width);

    return {
      width,
      transform: [{ translateX }],
    };
  }, [ranges]);

  const handlePress = useCallback(
    index => {
      return () => {
        onPressItem(index);
      };
    },
    [onPressItem],
  );

  const handleLayout = useCallback((index: number) => {
    return ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      'worklet';
      layoutRef.current.layouts[index].layout = layout;
      layoutRef.current.layouts[index].isDone = true;

      if (layoutRef.current.layouts.every(({ isDone }) => isDone)) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setLayouts(layoutRef.current.layouts.map(({ layout }) => layout));
      }
    };
  }, []);

  return (
    <TopTabBarWrapper>
      <TopTabBarTint style={tintStyle} />
      {items.map((item, index) => {
        return (
          <TopTabBarItem
            key={item.name}
            item={item}
            index={index}
            offsetX={offsetX}
            onLayout={handleLayout(index)}
            onPress={handlePress(index)}
          />
        );
      })}
    </TopTabBarWrapper>
  );
}

const TopTabBarWrapper = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
`;

const TopTabBarTint = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 63px;
  background-color: ${Color.Black};
`;

import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Dimensions,
  ImageSourcePropType,
  LayoutChangeEvent,
} from 'react-native';
import React, { useMemo } from 'react';

import { Color } from '../../../constants/Color';
import styled from 'styled-components/native';

export interface Item {
  name: string;
  label: string;
  icon?: ImageSourcePropType;
}

interface TopTabBarItemProps {
  item: Item;
  index: number;
  offsetX: SharedValue<number>;
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress?: () => void;
}

export default function TopTabBarItem({
  item,
  index,
  offsetX,
  onLayout,
  onPress,
}: TopTabBarItemProps) {
  const threadhold = useMemo(() => {
    const screenWidth = Dimensions.get('screen').width;
    const base = screenWidth * index;
    return {
      lower: base - screenWidth / 2,
      upper: base + screenWidth / 2,
    };
  }, [index]);

  const itemStyle = useAnimatedStyle(() => {
    const { lower, upper } = threadhold;

    return {
      color:
        offsetX.value >= lower && offsetX.value < upper
          ? Color.Black
          : Color.Gray2,
    };
  }, [threadhold]);

  return (
    <TopTabBarItemWrapper key={item.name} onLayout={onLayout} onPress={onPress}>
      {item.icon ? (
        <TopTabBarImageItem source={item.icon} />
      ) : (
        <TopTabBarTextItem style={itemStyle}>{item.label}</TopTabBarTextItem>
      )}
    </TopTabBarItemWrapper>
  );
}

const TopTabBarItemWrapper = styled.Pressable`
  margin: 0 8px;
`;

const TopTabBarTextItem = styled(Animated.Text)`
  font-size: 20px;
  font-weight: 600;
  color: ${Color.Gray2};
`;

const TopTabBarImageItem = styled.Image``;

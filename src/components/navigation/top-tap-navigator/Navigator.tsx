import Animated, { useSharedValue } from 'react-native-reanimated';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
} from 'react';

import { Color } from '../../../constants/Color';
import { Item } from './TopTabBarItem';
import { ScreenProps } from './Screen';
import TopTabBar from './TopTabBar';
import styled from 'styled-components/native';

export interface NavigatorProps {
  children: ReactElement<ScreenProps> | ReactElement<ScreenProps>[];
}

export default function Navigator(props: PropsWithChildren<NavigatorProps>) {
  if (!props.children) {
    throw new Error('More than one screen is required.');
  }

  const topTabBodyRef = useRef(null);

  const offsetX = useSharedValue<number>(0);

  const screens = useMemo(() => {
    return Array.isArray(props.children) ? props.children : [props.children];
  }, [props.children]);

  const tabBarItems = useMemo<Item[]>(() => {
    return screens.map(screen => {
      const { name, options } = screen.props as ScreenProps;

      return {
        name,
        label: options?.title || name,
        icon: options?.icon,
      };
    });
  }, [screens]);

  const handlePressItem = useCallback((index: number) => {
    if (topTabBodyRef.current) {
      const screenWidth = Dimensions.get('screen').width;
      (topTabBodyRef.current as ScrollView).scrollTo({
        x: index * screenWidth,
      });
    }
  }, []);

  const handleScroll = useCallback(
    ({
      nativeEvent: { contentOffset },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      'worklet';
      offsetX.value = contentOffset.x;
    },
    [offsetX],
  );

  return (
    <TopTabContainer>
      <TopTabHeader>
        <TopTabBar
          items={tabBarItems}
          offsetX={offsetX}
          onPressItem={handlePressItem}
        />
      </TopTabHeader>
      <TopTabBody
        ref={topTabBodyRef}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {screens.map(screen => (
          <TopTabBodyItem key={screen.props.name}>
            <screen.props.component />
          </TopTabBodyItem>
        ))}
      </TopTabBody>
    </TopTabContainer>
  );
}

const TopTabContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${Color.White};
`;

const TopTabHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  padding: 12px 12px 0 8px;
`;

const TopTabBody = styled(Animated.ScrollView)`
  flex: 1;
`;

const TopTabBodyItem = styled.View`
  flex: 1;
  width: ${Dimensions.get('screen').width}px;
`;

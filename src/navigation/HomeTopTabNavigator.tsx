import { Image, Pressable, Text } from 'react-native';
import React, { useRef } from 'react';

import TopTabBar from '../components/navigation/TopTabBar';
import TopTabBarImageItem from '../components/navigation/TopTabBarImageItem';
import TopTabBarTextItem from '../components/navigation/TopTabBarTextItem';
import TopTabBody from '../components/navigation/TopTabBody';
import TopTabBodyItem from '../components/navigation/TopTabBodyItem';
import TopTabContainer from '../components/navigation/TopTabContainer';
import TopTabHeader from '../components/navigation/TopTabHeader';

export default function HomeTopTabNavigator() {
  const topTabBodyRef = useRef(null);

  return (
    <TopTabContainer>
      <TopTabHeader>
        <TopTabBar>
          <TopTabBarImageItem
            source={require('../assets/icon/main/logo.png')}
          />
          <TopTabBarTextItem>근처</TopTabBarTextItem>
          <TopTabBarTextItem>라이브</TopTabBarTextItem>
        </TopTabBar>
        <Pressable>
          <Image source={require('../assets/icon/main/setting.png')} />
        </Pressable>
      </TopTabHeader>
      <TopTabBody
        ref={topTabBodyRef}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}>
        <TopTabBodyItem>
          <Text>Hello</Text>
        </TopTabBodyItem>
        <TopTabBodyItem>
          <Text>Hello</Text>
        </TopTabBodyItem>
        <TopTabBodyItem>
          <Text>Hello</Text>
        </TopTabBodyItem>
      </TopTabBody>
    </TopTabContainer>
  );
}

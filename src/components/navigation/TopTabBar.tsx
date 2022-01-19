import React, { PropsWithChildren } from 'react';

import styled from 'styled-components/native';

const TopTabBarWrapper = styled.View`
  height: 44px;
  flex-direction: row;
  align-items: center;
`;

const TabTabBarItem = styled.Pressable`
  margin: 0 8px;
`;

interface TopTabBarProps {}

export default function TopTabBar({
  children,
}: PropsWithChildren<TopTabBarProps>) {
  return (
    <TopTabBarWrapper>
      {children?.map((Item, i) => (
        <TabTabBarItem key={i}>{Item}</TabTabBarItem>
      ))}
    </TopTabBarWrapper>
  );
}

import { Dimensions, RefreshControl, StyleSheet, Text } from 'react-native';

import Animated from 'react-native-reanimated';
import React from 'react';
import styled from 'styled-components/native';

export default function MainScreen() {
  return (
    <Container
      pagingEnabled
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={false} />}>
      <Card>
        <Text>Card1</Text>
      </Card>
      <Card>
        <Text>Card1</Text>
      </Card>
      <Card>
        <Text>Card1</Text>
      </Card>
      <Card>
        <Text>Card1</Text>
      </Card>
      <Card>
        <Text>Card1</Text>
      </Card>
      <Card>
        <Text>Card1</Text>
      </Card>
    </Container>
  );
}

const Container = styled(Animated.ScrollView)`
  flex: 1;
`;

const Card = styled.View`
  align-self: center;
  margin: 12px 0 0;
  width: ${Dimensions.get('screen').width - 6}px;
  height: ${(Dimensions.get('screen').width - 6) * 1.4}px;
  border-radius: 8px;
`;

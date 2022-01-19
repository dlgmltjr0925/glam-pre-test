import { Dimensions, Text } from 'react-native';

import React from 'react';
import VerticalPagingList from '../../components/common/VerticalPagingList';
import styled from 'styled-components/native';

const width = Dimensions.get('screen').width - 6;
const height = width * 1.4;
const contentHeight = height + 12;

export default function MainScreen() {
  return (
    <VerticalPagingList<string>
      keyExtractor={item => item}
      data={Array.from({ length: 10 }, (_, i) => `Card${i + 1}`)}
      itemHeight={contentHeight}
      renderItem={({ item }) => (
        <Card>
          <Text>{item}</Text>
        </Card>
      )}
    />
  );
}

const Card = styled.View`
  align-self: center;
  margin: 12px 0 0;
  width: ${width}px;
  height: ${height}px;
  border-radius: 8px;
  border-width: 1px;
`;

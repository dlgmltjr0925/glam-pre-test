import { Dimensions, Image, StyleSheet } from 'react-native';

import { Color } from '../../../constants/Color';
import FastImage from 'react-native-fast-image';
import React from 'react';
import styled from 'styled-components/native';

const SIZE = Dimensions.get('screen').width / 3 - 2;

interface PicturesProps {
  pictures: string[];
}

export default function Pictures({ pictures = [] }: PicturesProps) {
  return (
    <Container>
      {Array.from({ length: 6 }, (_, i) => (
        <PictureWrapper key={pictures[i] || `default-${i}`}>
          {pictures[i] ? (
            <PictureImage
              source={{ uri: 'https://test.dev.cupist.de' + pictures[i] }}
            />
          ) : (
            <DefaultImage
              source={require('../../../assets/image/person.png')}
              resizeMode="cover"
            />
          )}
        </PictureWrapper>
      ))}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PictureWrapper = styled.View`
  width: ${SIZE}px;
  height: ${SIZE}px;
  background-color: ${Color.Gray1};
  margin-top: 2px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${Color.Gray1};
  box-sizing: border-box;
`;

const PictureImage = styled(FastImage)`
  flex: 1;
`;

const DefaultImage = styled.Image`
  width: ${SIZE - 2 * StyleSheet.hairlineWidth}px;
  height: ${SIZE - 2 * StyleSheet.hairlineWidth}px;
`;

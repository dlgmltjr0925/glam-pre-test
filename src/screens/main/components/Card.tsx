import Animated from 'react-native-reanimated';
import { Color } from '../../../constants/Color';
import { Dimensions } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export interface Item {
  age: number;
  company: string;
  distance: number;
  height: number;
  id: number;
  introduction: string | null;
  job: string;
  location: string;
  name: string;
  pictures: string[];
}

export interface CardProps {
  item: Item;
}

export const CARD_WIDTH = Dimensions.get('screen').width - 12;
export const CARD_HEIGHT = CARD_WIDTH * 1.4;
export const ITEM_HEIGHT = CARD_HEIGHT + 12;

export default function Card({ item }: CardProps) {
  return <Container></Container>;
}

const Container = styled(Animated.View)`
  align-self: center;
  margin: 12px 0 0;
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${Color.Gray1};
`;

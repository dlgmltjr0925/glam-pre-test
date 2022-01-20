import { Image, ImageSourcePropType } from 'react-native';

import { Color } from '../../../constants/Color';
import React from 'react';
import styled from 'styled-components/native';

export interface Item {
  icon: ImageSourcePropType;
  title: string;
  isHot: boolean;
}

export interface RecommendationItemProps {
  item: Item;
  onPress: (item: Item) => void;
}

export default function RecommendationItem({
  item,
  onPress,
}: RecommendationItemProps) {
  const { icon, title, isHot } = item;
  const handlePress = () => {
    onPress(item);
  };

  return (
    <ItemWrapper>
      <IconWrapper>
        <Image source={icon} />
      </IconWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
        {isHot && (
          <HotIcon
            source={require('../../../assets/icon/recommendations/hot.png')}
          />
        )}
      </TitleWrapper>
      <SelectButton onPress={handlePress}>
        <SelectButtonText>선택</SelectButtonText>
      </SelectButton>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 60px;
`;

const IconWrapper = styled.View`
  width: 40px;
  justify-content: center;
  align-items: center;
`;

const TitleWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-left: 12px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: ${Color.Black};
`;

const HotIcon = styled.Image`
  margin-left: 4px;
`;

const SelectButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  width: 76px;
  height: 32px;
  background-color: ${Color.GlamBlue};
  border-radius: 4px;
`;

const SelectButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.White};
`;

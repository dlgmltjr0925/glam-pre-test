import React, { useCallback } from 'react';
import RecommendationItem, { Item } from './RecommendationItem';

import { CARD_WIDTH } from './IntroductionCard';
import { Color } from '../../../constants/Color';
import styled from 'styled-components/native';

const ITEMS: Item[] = [
  {
    title: '글램 추천',
    icon: require('../../../assets/icon/recommendations/today.png'),
    isHot: true,
  },
  {
    title: '최상위 매력',
    icon: require('../../../assets/icon/recommendations/dia.png'),
    isHot: true,
  },
  {
    title: '볼륨감 있는 체형',
    icon: require('../../../assets/icon/recommendations/glamour.png'),
    isHot: true,
  },
  {
    title: '반려 동물을 키우는',
    icon: require('../../../assets/icon/recommendations/withpet.png'),
    isHot: false,
  },
];

export default function RecommendationCard() {
  const handlePress = useCallback((item: Item) => {
    console.log('pressed item', item);
  }, []);

  return (
    <Container>
      <Title>맞춤 추천</Title>
      <RecommendationList>
        {ITEMS.map(item => (
          <RecommendationItem
            key={item.title}
            item={item}
            onPress={handlePress}
          />
        ))}
      </RecommendationList>
      <ViewAllButton>
        <ViewAllButtonText>24개 항목 모두 보기</ViewAllButtonText>
      </ViewAllButton>
    </Container>
  );
}

const Container = styled.View`
  align-self: center;
  width: ${CARD_WIDTH}px;
  margin-top: 12px;
  padding: 24px 16px 16px;
  border-width: 2px;
  border-radius: 8px;
  border-color: ${Color.Gray0};
  background-color: ${Color.White};
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${Color.Black};
`;

const RecommendationList = styled.View`
  margin-top: 12px;
`;

const ViewAllButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  height: 44px;
  border-radius: 4px;
  background-color: ${Color.Gray0};
`;

const ViewAllButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.Black};
`;

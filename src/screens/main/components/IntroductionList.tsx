import IntroductionCard, { ITEM_HEIGHT, Item } from './IntroductionCard';
import React, { useCallback } from 'react';
import useIntroduction, { Data } from '../hooks/useIntroduction';

import RecommendationCard from './RecommendationCard';
import VerticalPagingList from '../../../components/common/VerticalPagingList';

export default function IntroductionList() {
  const { data } = useIntroduction();

  const renderItem = useCallback(({ item }: { item: Data }) => {
    return item.type === 'introduction' ? (
      <IntroductionCard
        item={item.item}
        priority="high"
        isTodayRecommendation={item.isTodayRecommendation}
      />
    ) : (
      <RecommendationCard />
    );
  }, []);

  return (
    <VerticalPagingList<Data>
      // eslint-disable-next-line @typescript-eslint/no-shadow
      keyExtractor={data =>
        data.type === 'recommendation' ? data.type : data.item.id.toString()
      }
      data={data}
      itemHeight={ITEM_HEIGHT}
      renderItem={renderItem}
    />
  );
}

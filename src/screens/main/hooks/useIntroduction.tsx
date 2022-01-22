import {
  fetchGetIntroduction,
  fetchGetIntroductionAdditional,
} from '../../../data/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import { Item } from '../components/IntroductionCard';

interface IntroductionData {
  type: 'introduction';
  id: string;
  item: Item;
  isTodayRecommendation: boolean;
}

interface RecommendationData {
  type: 'recommendation';
}

export type Data = IntroductionData | RecommendationData;

export default function useIntroduction() {
  const todayResult = useQuery('FetchGetIntroduction', fetchGetIntroduction, {
    suspense: true,
  });

  const additionalResult = useInfiniteQuery(
    'FetchGetIntroductionAdditional',
    ({ pageParam = 1 }) => {
      return fetchGetIntroductionAdditional(pageParam);
    },
    {
      getNextPageParam: lastPage => {
        return lastPage.meta.next?.id;
      },
    },
  );

  const [today, setToday] = useState<IntroductionData[]>([]);

  const [additional, setAdditional] = useState<IntroductionData[]>([]);

  const data = useMemo<Data[]>(() => {
    return [...today, { type: 'recommendation' }, ...additional];
  }, [additional, today]);

  const handleEndReached = useCallback(() => {
    if (additionalResult.hasNextPage) {
      additionalResult.fetchNextPage();
    }
  }, [additionalResult]);

  useEffect(() => {
    if (todayResult.status === 'success') {
      setToday(
        todayResult.data.data.map((item: Item) => ({
          type: 'introduction',
          id: `today-${item.id}`,
          isTodayRecommendation: true,
          item,
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayResult.status]);

  useEffect(() => {
    if (additionalResult.status === 'success') {
      const newInstructions = additionalResult.data.pages;

      setTimeout(() => {
        setAdditional([
          ...additional,
          ...newInstructions[newInstructions.length - 1].data.map(
            (item: Item) => ({
              type: 'introduction',
              id: `additional-${item.id}`,
              isTodayRecommendation: false,
              item,
            }),
          ),
        ]);
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalResult.data?.pages]);

  return {
    data,
    handleEndReached,
    isFetchingAdditional: additionalResult.isFetching,
  };
}

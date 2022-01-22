import {
  fetchGetIntroduction,
  fetchGetIntroductionAdditional,
} from '../../../data/api';
import { useEffect, useMemo, useState } from 'react';

import { Item } from '../components/IntroductionCard';
import { useQuery } from 'react-query';

interface IntroductionData {
  type: 'introduction';
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

  const additionalResult = useQuery(
    ['FetchGetIntroductionAdditional', 1],
    fetchGetIntroductionAdditional,
    { suspense: true },
  );

  const [today, setToday] = useState<IntroductionData[]>([]);

  const [additional, setAdditional] = useState<IntroductionData[]>([]);

  const data = useMemo<Data[]>(() => {
    return [...today, { type: 'recommendation' }, ...additional];
  }, [additional, today]);

  useEffect(() => {
    if (todayResult.status === 'success') {
      setToday(
        todayResult.data.data.map((item: Item) => ({
          type: 'introduction',
          isTodayRecommendation: true,
          item,
        })),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayResult.status]);

  useEffect(() => {
    if (additionalResult.status === 'success') {
      setAdditional([
        ...additional,
        ...additionalResult.data.data.map((item: Item) => ({
          type: 'introduction',
          isTodayRecommendation: false,
          item,
        })),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalResult.status]);

  return { data };
}

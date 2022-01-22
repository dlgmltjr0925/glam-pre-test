/* eslint-disable @typescript-eslint/no-shadow */
import {
  fetchGetIntroduction,
  fetchGetIntroductionAdditional,
  fetchPostIntroductionCustom,
} from '../../../data/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';

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

interface IntroductionRef {
  today: IntroductionData[];
  custom: IntroductionData[];
  additional: IntroductionData[];
}

export default function useIntroduction() {
  const idRef = useRef<number>(0);
  const introductionRef = useRef<IntroductionRef>({
    today: [],
    custom: [],
    additional: [],
  });

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

  const [custom, setCustom] = useState<IntroductionData[]>([]);

  const mutation = useMutation(fetchPostIntroductionCustom, {
    onSuccess: ({ data }) => {
      setCustom([
        ...data.map((item: Item) => ({
          type: 'introduction',
          id: `custom-${++idRef.current}`,
          isTodayRecommendation: false,
          item,
        })),
        ...introductionRef.current.custom,
      ]);
    },
  });

  const [today, setToday] = useState<IntroductionData[]>([]);

  const [additional, setAdditional] = useState<IntroductionData[]>([]);

  const data = useMemo<Data[]>(() => {
    return [...today, { type: 'recommendation' }, ...custom, ...additional];
  }, [additional, custom, today]);

  const handlePressCustom = useCallback(() => {
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePressRemove = useCallback(({ id }: IntroductionData) => {
    const type = id.split('-')[0];
    if (type === 'today') {
      setToday(
        introductionRef.current.today.filter(
          (data: IntroductionData) => data.id !== id,
        ),
      );
    } else if (type === 'custom') {
      setCustom(
        introductionRef.current.custom.filter(
          (data: IntroductionData) => data.id !== id,
        ),
      );
    } else {
      setAdditional(
        introductionRef.current.additional.filter(
          (data: IntroductionData) => data.id !== id,
        ),
      );
    }
  }, []);

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

  useEffect(() => {
    introductionRef.current = {
      today,
      custom,
      additional,
    };
  }, [today, custom, additional]);

  return {
    data,
    handlePressCustom,
    handlePressRemove,
    handleEndReached,
    isFetchingAdditional: additionalResult.isFetching,
  };
}

import IntroductionCard, { ITEM_HEIGHT, Item } from './IntroductionCard';
import React, { useCallback } from 'react';

import RecommendationCard from './RecommendationCard';
import VerticalPagingList from '../../../components/common/VerticalPagingList';

interface IntroductionData {
  type: 'introduction';
  item: Item;
  isTodayRecommendation: boolean;
}

interface RecommendationData {
  type: 'recommendation';
}

type Data = IntroductionData | RecommendationData;

const MOCK_DATA: Data[] = [
  {
    type: 'introduction',
    item: {
      age: 30,
      company: '큐피스트',
      distance: 1600,
      height: 160,
      id: 1,
      introduction:
        '소개글이 있으면 소개글을 노출 시킵니다.\n가나다라마바사아자차카타파가나다라마바사아자차카타파하\nHello World',
      job: '디자이너',
      location: '서울특별시 강남구',
      name: '디자이너 A',
      pictures: ['/profile/03.png', '/profile/04.png', '/profile/05.png'],
    },
    isTodayRecommendation: true,
  },
  {
    type: 'introduction',
    item: {
      age: 27,
      company: '큐피스트',
      distance: 2700,
      height: 163,
      id: 2,
      introduction: null,
      job: '개발자',
      location: '서울특별시 강남구',
      name: '개발자 B',
      pictures: ['/profile/05.png', '/profile/06.png'],
    },
    isTodayRecommendation: true,
  },
  {
    type: 'recommendation',
  },
  {
    type: 'introduction',
    item: {
      age: 30,
      company: '큐피스트',
      distance: 1600,
      height: 160,
      id: 4,
      introduction:
        '소개글이 있으면 소개글을 노출 시킵니다.\n가나다라마바사아자차카타파가나다라마바사아자차카타파하\nHello World',
      job: '디자이너',
      location: '서울특별시 강남구',
      name: '디자이너 A',
      pictures: ['/profile/03.png', '/profile/04.png', '/profile/05.png'],
    },
    isTodayRecommendation: false,
  },
  {
    type: 'introduction',
    item: {
      age: 27,
      company: '큐피스트',
      distance: 2700,
      height: 163,
      id: 5,
      introduction: null,
      job: '개발자',
      location: '서울특별시 강남구',
      name: '개발자 B',
      pictures: ['/profile/05.png', '/profile/06.png'],
    },
    isTodayRecommendation: false,
  },
  {
    type: 'introduction',
    item: {
      age: 30,
      company: '큐피스트',
      distance: 1600,
      height: 160,
      id: 6,
      introduction:
        '소개글이 있으면 소개글을 노출 시킵니다.\n가나다라마바사아자차카타파가나다라마바사아자차카타파하\nHello World',
      job: '디자이너',
      location: '서울특별시 강남구',
      name: '디자이너 A',
      pictures: ['/profile/03.png', '/profile/04.png', '/profile/05.png'],
    },
    isTodayRecommendation: false,
  },
  {
    type: 'introduction',
    item: {
      age: 27,
      company: '큐피스트',
      distance: 2700,
      height: 163,
      id: 7,
      introduction: null,
      job: '개발자',
      location: '서울특별시 강남구',
      name: '개발자 B',
      pictures: ['/profile/05.png', '/profile/06.png'],
    },
    isTodayRecommendation: false,
  },
  {
    type: 'introduction',
    item: {
      age: 27,
      company: '큐피스트',
      distance: 2700,
      height: 163,
      id: 8,
      introduction: null,
      job: '개발자',
      location: '서울특별시 강남구',
      name: '개발자 B',
      pictures: ['/profile/05.png', '/profile/06.png'],
    },
    isTodayRecommendation: false,
  },
  {
    type: 'introduction',
    item: {
      age: 30,
      company: '큐피스트',
      distance: 1600,
      height: 160,
      id: 9,
      introduction:
        '소개글이 있으면 소개글을 노출 시킵니다.\n가나다라마바사아자차카타파가나다라마바사아자차카타파하\nHello World',
      job: '디자이너',
      location: '서울특별시 강남구',
      name: '디자이너 A',
      pictures: ['/profile/03.png', '/profile/04.png', '/profile/05.png'],
    },
    isTodayRecommendation: false,
  },
  {
    type: 'introduction',
    item: {
      age: 27,
      company: '큐피스트',
      distance: 2700,
      height: 163,
      id: 10,
      introduction: null,
      job: '개발자',
      location: '서울특별시 강남구',
      name: '개발자 B',
      pictures: ['/profile/05.png', '/profile/06.png'],
    },
    isTodayRecommendation: false,
  },
  {
    type: 'introduction',
    item: {
      age: 30,
      company: '큐피스트',
      distance: 1600,
      height: 160,
      id: 11,
      introduction:
        '소개글이 있으면 소개글을 노출 시킵니다.\n가나다라마바사아자차카타파가나다라마바사아자차카타파하\nHello World',
      job: '디자이너',
      location: '서울특별시 강남구',
      name: '디자이너 A',
      pictures: ['/profile/03.png', '/profile/04.png', '/profile/05.png'],
    },
    isTodayRecommendation: false,
  },
  {
    type: 'introduction',
    item: {
      age: 27,
      company: '큐피스트',
      distance: 2700,
      height: 163,
      id: 12,
      introduction: null,
      job: '개발자',
      location: '서울특별시 강남구',
      name: '개발자 B',
      pictures: ['/profile/05.png', '/profile/06.png'],
    },
    isTodayRecommendation: false,
  },
];

export default function IntroductionList() {
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
      keyExtractor={data =>
        data.type === 'recommendation' ? data.type : data.item.id.toString()
      }
      data={MOCK_DATA}
      itemHeight={ITEM_HEIGHT}
      renderItem={renderItem}
    />
  );
}

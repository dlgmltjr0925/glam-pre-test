import Card, { ITEM_HEIGHT, Item } from './components/Card';

import React from 'react';
import VerticalPagingList from '../../components/common/VerticalPagingList';

const MOCK_DATA: Item[] = [
  {
    age: 30,
    company: '큐피스트',
    distance: 1600,
    height: 160,
    id: 1,
    introduction: '소개글이 있으면 소개글을 노출 시킵니다',
    job: '디자이너',
    location: '서울특별시 강남구',
    name: '디자이너 A',
    pictures: ['/profile/03.png', '/profile/04.png', '/profile/05.png'],
  },
  {
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
];

export default function MainScreen() {
  return (
    <VerticalPagingList<Item>
      keyExtractor={item => item.id.toString()}
      data={MOCK_DATA}
      itemHeight={ITEM_HEIGHT}
      renderItem={({ item }) => <Card item={item} priority="high" />}
    />
  );
}

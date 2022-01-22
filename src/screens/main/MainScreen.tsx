import React, { Suspense } from 'react';

import IntroductionList from './components/IntroductionList';
import MainSkeleton from './components/MainSkeleton';
import styled from 'styled-components/native';

export default function MainScreen() {
  return (
    <Container>
      <Suspense fallback={<MainSkeleton />}>
        <IntroductionList />
      </Suspense>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

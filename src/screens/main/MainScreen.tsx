import React, { Suspense } from 'react';

import IntroductionList from './components/IntroductionList';
import MainSkeleton from './components/MainSkeleton';

export default function MainScreen() {
  return (
    <Suspense fallback={<MainSkeleton />}>
      <IntroductionList />
    </Suspense>
  );
}

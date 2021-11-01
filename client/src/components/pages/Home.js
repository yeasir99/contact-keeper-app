import React, { Suspense, lazy } from 'react';

import Fallback from '../Fallback';

const HomeElements = lazy(() => import('../HomeElements'));

const Home = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <HomeElements />
    </Suspense>
  );
};

export default Home;

import React, { useEffect, Suspense, lazy } from 'react';
import { useAuth } from '../../context/auth/AuthState';
import { loadUser } from '../../context/auth/authAction';

const HomeElements = lazy(() => import('../HomeElements'));

const Home = () => {
  const [, authDispatch] = useAuth();

  useEffect(() => {
    loadUser(authDispatch)();

    // eslint-disable-next-line
  }, []);

  return (
    <Suspense fallback={() => <h1>Loading...</h1>}>
      <HomeElements />
    </Suspense>
  );
};

export default Home;

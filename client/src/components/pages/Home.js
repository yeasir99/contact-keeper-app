import React, { useEffect, Suspense, lazy } from 'react';
import { useAuth } from '../../context/auth/AuthState';
import { loadUser } from '../../context/auth/authAction';
import Fallback from '../Fallback';

const HomeElements = lazy(() => import('../HomeElements'));

const Home = () => {
  const [, authDispatch] = useAuth();

  useEffect(() => {
    loadUser(authDispatch)();

    // eslint-disable-next-line
  }, []);

  return (
    <Suspense fallback={<Fallback />}>
      <HomeElements />
    </Suspense>
  );
};

export default Home;

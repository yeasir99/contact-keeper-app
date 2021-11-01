import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { useAuth } from './context/auth/AuthState';
import { loadUser } from './context/auth/authAction';

function AppRoutes() {
  const [, authDispatch] = useAuth();

  useEffect(() => {
    loadUser(authDispatch)();
    // eslint-disable-next-line
  }, []);
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Switch>
  );
}

export default AppRoutes;

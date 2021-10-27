import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../../context/auth/AuthState';
import { loginUser, clearError } from '../../context/auth/authAction';
import alertContext from '../../context/alert/alertContext';
import Spinner from '../layout/Spinner';

const Login = ({ history }) => {
  const [{ error, isAuthenticated }, authDispatch] = useAuth();

  const { setAlert } = useContext(alertContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearError(authDispatch);
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    loginUser(authDispatch)({ email, password });
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>{' '}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
          {loading && <Spinner style={{ width: '20px' }} />}
        </button>
      </form>
    </div>
  );
};

export default Login;

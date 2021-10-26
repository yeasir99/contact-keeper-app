import * as ACTIONS from '../types';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

//Load user
export const loadUser = dispatch => async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: ACTIONS.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ACTIONS.AUTH_ERROR,
    });
  }
};

//Register user
export const register = dispatch => async formdata => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/users', formdata, config);
    dispatch({
      type: ACTIONS.REGISTER_SUCCESS,
      payload: res.data,
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: ACTIONS.REGISTER_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//Login User
export const loginUser = dispatch => async formData => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/auth', formData, config);

    dispatch({
      type: ACTIONS.LOGIN_SUCCESS,
      payload: res.data,
    });
    loadUser();
  } catch (err) {
    dispatch({
      type: ACTIONS.LOGIN_FAIL,
      payload: err.response.data.msg,
    });
  }
};

//Logout user
export const logout = dispatch =>
  dispatch({
    type: ACTIONS.LOGOUT,
  });

//Clear user
export const clearError = dispatch => dispatch({ type: ACTIONS.CLEAR_ERRORS });

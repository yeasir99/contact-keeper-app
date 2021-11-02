import * as ACTIONS from '../types';
import axios from 'axios';

//Load user
export const loadUser = dispatch => async () => {
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
export const logout = dispatch => async () => {
  try {
    await axios.get('/api/auth/logout');
    dispatch({
      type: ACTIONS.LOGOUT,
    });
  } catch (error) {
    dispatch({
      type: ACTIONS.LOGIN_FAIL,
      payload: error,
    });
  }
};

//Clear user
export const clearError = dispatch => dispatch({ type: ACTIONS.CLEAR_ERRORS });

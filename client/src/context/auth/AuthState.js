import React, { useReducer } from "react";
import * as ACTIONS from "../types";
import axios from "axios";
import authReducer from "./authReducer";
import authContext from "./authContext";
import setAuthToken from "../../utils/setAuthToken";

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
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
  const register = async (formdata) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", formdata, config);
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
  const loginUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth", formData, config);

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
  const logout = () =>
    dispatch({
      type: ACTIONS.LOGOUT,
    });

  //Clear user
  const clearError = () => dispatch({ type: ACTIONS.CLEAR_ERRORS });

  return (
    <authContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearError,
        loadUser,
        loginUser,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;

import * as ACTIONS from '../types';

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case ACTIONS.REGISTER_SUCCESS:
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case ACTIONS.REGISTER_FAIL:
    case ACTIONS.AUTH_ERROR:
    case ACTIONS.LOGIN_FAIL:
    case ACTIONS.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case ACTIONS.LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;

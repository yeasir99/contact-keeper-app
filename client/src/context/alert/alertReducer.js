import * as ACTIONS from "../types";

export default (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ALERT:
      return [...state, action.payload];
    case ACTIONS.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

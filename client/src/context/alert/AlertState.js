import React, { useReducer } from "react";
import * as ACTIONS from "../types";
import { v4 as uuidv4 } from "uuid";
import alertContext from "./alertContext";
import alertReducer from "./alertReducer";

const AlertState = ({ children }) => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //Set alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuidv4();
    dispatch({
      type: ACTIONS.SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => {
      dispatch({
        type: ACTIONS.REMOVE_ALERT,
        payload: id,
      });
    }, timeout);
  };

  return (
    <alertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {children}
    </alertContext.Provider>
  );
};

export default AlertState;

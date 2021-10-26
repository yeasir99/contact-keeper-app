import React, { useReducer, createContext, useContext } from 'react';
import contactReducer from './contactReducer';

const contactContext = createContext();

contactContext.displayName = 'ContactContext';

export const useContact = () => {
  const context = useContext(contactContext);
  if (!context) {
    throw new Error(`Component must be wrapped with in ContactContextProvider`);
  }
  return context;
};

export const ContactProvider = props => {
  const [state, dispatch] = useReducer(contactReducer, {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  });

  return <contactContext.Provider value={[state, dispatch]} {...props} />;
};

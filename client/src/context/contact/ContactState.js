import React, { useReducer } from "react";
import * as ACTIONS from "../types";
import axios from "axios";
import contactReducer from "./contactReducer";
import contactContext from "./contactContext";

const ContactState = ({ children }) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //Get contacts

  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({ type: ACTIONS.GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: ACTIONS.CONTACT_ERROR, payload: err.response.msg });
    }
  };
  //Add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);

      dispatch({
        type: ACTIONS.ADD_CONTACT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Update contact

  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({
        type: ACTIONS.CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Delete contact

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: ACTIONS.DELETE_CONTACT,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.CONTACT_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Clear contacts
  const clearContacts = () => dispatch({ type: ACTIONS.CLEAR_CONTACTS });

  //Set current contact

  const setCurrent = (contact) =>
    dispatch({ type: ACTIONS.SET_CURRENT, payload: contact });

  //Clear current contact

  const clearCurrent = () => dispatch({ type: ACTIONS.CLEAR_CURRENT });

  //Filter contacts

  const filterContacts = (text) =>
    dispatch({ type: ACTIONS.FILTER_CONTACT, payload: text });

  //Clear filter
  const clearFilter = () => dispatch({ type: ACTIONS.CLEAR_FILTER });

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getContacts,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        clearContacts,
      }}
    >
      {children}
    </contactContext.Provider>
  );
};

export default ContactState;

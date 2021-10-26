import * as ACTIONS from '../types';
import axios from 'axios';

//Get contacts

export const getContacts = dispatch => async () => {
  try {
    const res = await axios.get('/api/contacts');

    dispatch({ type: ACTIONS.GET_CONTACTS, payload: res.data });
  } catch (err) {
    dispatch({ type: ACTIONS.CONTACT_ERROR, payload: err.response.msg });
  }
};
//Add contact
export const addContact = dispatch => async contact => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/contacts', contact, config);

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

export const updateContact = dispatch => async contact => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
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

export const deleteContact = dispatch => async id => {
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
export const clearContacts = dispatch =>
  dispatch({ type: ACTIONS.CLEAR_CONTACTS });

//Set current contact

export const setCurrent = dispatch => contact =>
  dispatch({ type: ACTIONS.SET_CURRENT, payload: contact });

//Clear current contact

export const clearCurrent = dispatch =>
  dispatch({ type: ACTIONS.CLEAR_CURRENT });

//Filter contacts

export const filterContacts = dispatch => text =>
  dispatch({ type: ACTIONS.FILTER_CONTACT, payload: text });

//Clear filter
export const clearFilter = dispatch => dispatch({ type: ACTIONS.CLEAR_FILTER });

import * as ACTIONS from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case ACTIONS.ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };
    case ACTIONS.UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
      };
    case ACTIONS.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false,
      };
    case ACTIONS.CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        current: null,
        error: null,
      };
    case ACTIONS.SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case ACTIONS.CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case ACTIONS.FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case ACTIONS.CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case ACTIONS.CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unsupported type: ${action.type}`);
  }
};

export default contactReducer;

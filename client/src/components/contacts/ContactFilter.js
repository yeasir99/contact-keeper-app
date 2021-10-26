import React, { useRef, useEffect } from 'react';
import { useContact } from '../../context/contact/ContactState';
import {
  filterContacts,
  clearFilter,
} from '../../context/contact/contactAction';

const ContactFilter = () => {
  const text = useRef('');

  const [{ filtered }, contactDispatch] = useContact();

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(contactDispatch)(e.target.value);
    } else {
      clearFilter(contactDispatch);
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;

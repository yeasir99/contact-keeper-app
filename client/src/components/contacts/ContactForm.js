import React, { useState, useEffect } from 'react';
import { useContact } from '../../context/contact/ContactState';
import {
  addContact,
  clearCurrent,
  updateContact,
} from '../../context/contact/contactAction';

const ContactForm = () => {
  const [{ current }, contactDispatch] = useContact();

  useEffect(() => {
    if (current !== null) {
      setContact(contactDispatch)(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current, contactDispatch]);
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const handleChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contactDispatch)(contact);
    } else {
      updateContact(contactDispatch)(contact);
    }
    clearAll();
  };

  const clearAll = () => clearCurrent(contactDispatch);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        placeholder="name"
        value={name}
        name="name"
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        name="email"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        name="phone"
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={handleChange}
      />
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={handleChange}
      />{' '}
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;

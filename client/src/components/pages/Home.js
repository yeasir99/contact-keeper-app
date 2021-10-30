import React, { useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import { useContact } from '../../context/contact/ContactState';
import { getContacts } from '../../context/contact/contactAction';
import { useAuth } from '../../context/auth/AuthState';
import { loadUser } from '../../context/auth/authAction';

const Home = () => {
  const [, authDispatch] = useAuth();
  const [, contactDispatch] = useContact();

  useEffect(() => {
    loadUser(authDispatch)();
    getContacts(contactDispatch)();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;

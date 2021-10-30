import { useEffect } from 'react';
import ContactForm from './contacts/ContactForm';
import Contacts from './contacts/Contacts';
import ContactFilter from './contacts/ContactFilter';
import { useContact } from '../context/contact/ContactState';
import { getContacts } from '../context/contact/contactAction';

function HomeElements() {
  const [, contactDispatch] = useContact();

  useEffect(() => {
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
}

export default HomeElements;

import { Fragment } from 'react';
import { useContact } from '../../context/contact/ContactState';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const [{ contacts, filtered, loading }] = useContact();

  if (loading) <Spinner />;

  if (contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {(
        <TransitionGroup>
          {filtered
            ? filtered?.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) || null}
    </Fragment>
  );
};

export default Contacts;

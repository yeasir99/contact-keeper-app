import React from 'react';
import { useContact } from '../../context/contact/ContactState';
import PropTypes from 'prop-types';
import { FaEnvelopeOpen, FaPhone } from 'react-icons/fa';
import {
  setCurrent,
  deleteContact,
  clearCurrent,
} from '../../context/contact/contactAction';

const ContactItem = ({ contact }) => {
  const [, contactDispatch] = useContact();

  const { _id, name, email, phone, type } = contact;

  const handleEdit = () => setCurrent(contactDispatch)(contact);

  const handleDelete = () => {
    deleteContact(contactDispatch)(_id);
    clearCurrent(contactDispatch);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul>
        {email && (
          <li>
            <FaEnvelopeOpen /> {email}
          </li>
        )}
        {phone && (
          <li>
            <FaPhone /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;

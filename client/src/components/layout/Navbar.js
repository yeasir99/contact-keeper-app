import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FaIdCardAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/auth/AuthState';
import { useContact } from '../../context/contact/ContactState';
import { clearContacts } from '../../context/contact/contactAction';
import { logout } from '../../context/auth/authAction';

const Navbar = () => {
  const [{ isAuthenticated, user }, authDispatch] = useAuth();
  const [, contactDispatch] = useContact();
  const onLogout = () => {
    logout(authDispatch)();
    clearContacts(contactDispatch);
  };
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li
        style={{
          padding: '0 5px',
        }}
      >
        <div
          onClick={onLogout}
          style={{
            cursor: 'pointer',
          }}
        >
          <FaSignOutAlt /> <span className="hide-sm">Logout</span>
        </div>
      </li>
    </Fragment>
  );
  const guestLink = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <FaIdCardAlt /> Contact Keeper
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLink}</ul>
    </div>
  );
};

export default Navbar;

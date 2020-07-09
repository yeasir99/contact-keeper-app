import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { FaIdCardAlt, FaSignOutAlt } from "react-icons/fa";
import authContext from "../../context/auth/authContext";
import contactContext from "../../context/contact/contactContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(authContext);
  const { clearContacts } = useContext(contactContext);
  const onLogout = () => {
    logout();
    clearContacts();
  };
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a href="#!" onClick={onLogout}>
          <FaSignOutAlt /> <span className="hide-sm">Logout</span>
        </a>
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

import React, { useState, useContext, useEffect } from "react";
import authContext from "../../context/auth/authContext";
import alertContext from "../../context/alert/alertContext";

const Login = ({ history }) => {
  const { loginUser, error, clearError, isAuthenticated } = useContext(
    authContext
  );

  const { setAlert } = useContext(alertContext);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearError();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };
  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>{" "}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;

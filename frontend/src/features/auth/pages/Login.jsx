import React from "react";
import "../styles/styles.scss";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form action="" className="">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Dont have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;

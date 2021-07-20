import React from "react";
import style from "./Login.module.css";

const Login = () => {
  return (
    <div className={style.login}>
      <div className="container">
        <h1>hoodie.</h1>
        <form className={style.loginForm}>
          <label>
            Email
            <input type="email" required placeholder="Enter your email" />
          </label>
          <label>
            Password
            <input type="password" required placeholder="Enter your password" />
          </label>
          <button type="submit">Log In</button>
        </form>
        <p className={style.goToSignUp}>
          Don't have an account? Go to <span>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

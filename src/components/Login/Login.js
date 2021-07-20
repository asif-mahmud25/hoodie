import React, { useState } from "react";
import style from "./Login.module.css";
import { useHistory } from "react-router-dom";

//component import
import FormErrorHandler from "../ErrorHandlers/FormErrorHandler/FormErrorHandler";

const Login = () => {
  //error state
  const [error, setError] = useState({
    errorShow: true,
    errorMsg: "",
  });

  //for navigate to sign up
  const history = useHistory();

  //go to sign up
  const goToSignUp = () => {
    history.push("/sign-up");
  };
  return (
    <div className={style.login}>
      <div className="container">
        <h1>hoodie.</h1>
        <div className={error.errorShow ? style.errorMsgContainer : style.hide}>
          <FormErrorHandler errorMsg="Incorrect user email" />
        </div>
        <form className={style.loginForm}>
          <label>
            Email
            <input
              type="email"
              required
              placeholder="Enter your email"
              maxLength="40"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              placeholder="Enter your password"
              maxLength="30"
            />
          </label>
          <button type="submit">Log In</button>
        </form>
        <p className={style.goToSignUp}>
          Don't have an account? Go to <span onClick={goToSignUp}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

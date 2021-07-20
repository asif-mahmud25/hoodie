import React, { useState } from "react";
import style from "./SignUp.module.css";
import { useHistory } from "react-router-dom";

//component import
import FormErrorHandler from "../ErrorHandlers/FormErrorHandler/FormErrorHandler";

const SignUp = () => {
  //error state
  const [error, setError] = useState({
    errorShow: true,
    errorMsg: "",
  });

  //for navigation
  const history = useHistory();

  //go to login
  const goToLogin = () => {
    history.push("/login");
  };
  return (
    <div className={style.signUp}>
      <div className="container">
        <h1>hoodie.</h1>
        <div className={error.errorShow ? style.errorMsgContainer : style.hide}>
          <FormErrorHandler errorMsg="Incorrect user email" />
        </div>
        <form className={style.signUpForm}>
          <label>
            Name
            <input
              type="text"
              required
              placeholder="Enter your name"
              maxLength="30"
            />
          </label>
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
              placeholder="Create a password"
              maxLength="30"
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p className={style.goToLogin}>
          Already have an account? Go to <span onClick={goToLogin}>Log In</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

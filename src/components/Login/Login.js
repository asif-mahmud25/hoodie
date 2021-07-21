import React, { useState } from "react";
import style from "./Login.module.css";
import { useHistory } from "react-router-dom";

//component import
import FormErrorHandler from "../ErrorHandlers/FormErrorHandler/FormErrorHandler";

//firebase auth
import { auth } from "../../firebase";

const Login = () => {
  //input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //error state
  const [error, setError] = useState({
    errorShow: false,
    errorMsg: "",
  });

  //for navigate to sign up
  const history = useHistory();

  //go to sign up
  const goToSignUp = () => {
    history.push("/sign-up");
  };

  //login user
  const loginUser = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);

        //hide error box
        setError({ errorShow: false, errorMsg: "" });

        //empty the inputs
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        //handle errors
        if (err.code === "auth/user-not-found") {
          setError({
            errorShow: true,
            errorMsg: "User not found",
          });
        } else if (err.code === "auth/invalid-email") {
          setError({
            errorShow: true,
            errorMsg: "Email is invalid",
          });
        } else if (err.code === "auth/wrong-password") {
          setError({
            errorShow: true,
            errorMsg: "Password is not correct",
          });
        } else {
          setError({
            errorShow: true,
            errorMsg: "Something went wrong",
          });
        }

        //for test
        console.log(err);
        console.log(err.code);
        console.log(err.message);
      });
  };

  return (
    <div className={style.login}>
      <div className="container">
        <h1>hoodie.</h1>
        <div className={error.errorShow ? style.errorMsgContainer : style.hide}>
          <FormErrorHandler errorMsg={error.errorMsg} />
        </div>
        <form className={style.loginForm} onSubmit={loginUser}>
          <label>
            Email
            <input
              type="email"
              required
              placeholder="Enter your email"
              maxLength="40"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              placeholder="Enter your password"
              maxLength="30"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
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

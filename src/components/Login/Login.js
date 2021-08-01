import React, { useState } from "react";
import style from "./Login.module.css";
import { useHistory } from "react-router-dom";

//component import
import FormErrorHandler from "../ErrorHandlers/FormErrorHandler/FormErrorHandler";
import FullPageLoader from "../Loaders/FullPageLoader/FullPageLoader";

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

  //loading state
  const [loading, setLoading] = useState(false);

  //for navigate to sign up
  const history = useHistory();

  //go to sign up
  const goToSignUp = () => {
    history.push("/sign-up");
  };

  //login user
  const loginUser = (event) => {
    event.preventDefault();

    setLoading(true);

    //hide error box
    setError({ errorShow: false, errorMsg: "" });

    //login with firebase auth
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        //stop loading
        setLoading(false);

        //empty the inputs
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        //stop loading
        setLoading(false);

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

        console.log(err);
        console.log(err.message);
      });
  };

  //showing loader when needed
  let fullLoader = null;
  if (loading) {
    fullLoader = <FullPageLoader />;
  }

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
      {fullLoader}
    </div>
  );
};

export default Login;

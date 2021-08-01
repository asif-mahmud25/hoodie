import React, { useState } from "react";
import style from "./SignUp.module.css";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

//component import
import FormErrorHandler from "../ErrorHandlers/FormErrorHandler/FormErrorHandler";
import FullPageLoader from "../Loaders/FullPageLoader/FullPageLoader";

const SignUp = () => {
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

  //for navigation
  const history = useHistory();

  //go to login
  const goToLogin = () => {
    history.push("/login");
  };

  //sign up a new user
  const signUpUser = (event) => {
    event.preventDefault();

    setLoading(true);

    //hide error box
    setError({
      errorShow: false,
      errorMsg: "",
    });

    //create new user in firebase auth
    auth
      .createUserWithEmailAndPassword(email, password)
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
        if (err.code === "auth/email-already-in-use") {
          setError({
            errorShow: true,
            errorMsg: "Email is already in use",
          });
        } else if (err.code === "auth/invalid-email") {
          setError({
            errorShow: true,
            errorMsg: "Email is invalid",
          });
        } else if (err.code === "auth/weak-password") {
          setError({
            errorShow: true,
            errorMsg: "Password is too weak",
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
    <div className={style.signUp}>
      <div className="container">
        <h1>hoodie.</h1>
        <div className={error.errorShow ? style.errorMsgContainer : style.hide}>
          <FormErrorHandler errorMsg={error.errorMsg} />
        </div>
        <form className={style.signUpForm} onSubmit={signUpUser}>
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
              placeholder="Create a password"
              maxLength="30"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <button type="submit">Sign Up</button>
        </form>
        <p className={style.goToLogin}>
          Already have an account? Go to <span onClick={goToLogin}>Log In</span>
        </p>
      </div>
      {fullLoader}
    </div>
  );
};

export default SignUp;

import React, { useContext, useEffect, useState } from "react";
import style from "./Checkout.module.css";
import { useHistory } from "react-router-dom";

//cart context import
import { CartContext } from "../../context/CartContext";

//components import
import FormErrorHandler from "../ErrorHandlers/FormErrorHandler/FormErrorHandler";

const Checkout = () => {
  //input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //error state
  const [error, setError] = useState({
    errorShow: true,
    errorMsg: "",
  });

  //cart context
  const [cart] = useContext(CartContext);

  //for navigation
  const history = useHistory();

  //if cart is empty go to home
  useEffect(() => {
    if (cart.length < 1) {
      history.replace("/");
    }
  }, []);

  return (
    <div className={style.checkout}>
      <div className="container">
        <div className={style.pageHeading}>
          <h1>CHECKOUT</h1>
          <p>Please enter your information</p>
        </div>
        <div className={style.checkoutContent}>
          <div className={style.formContainer}>
            <div
              className={error.errorShow ? style.errorMsgContainer : style.hide}
            >
              <FormErrorHandler errorMsg="Invalid name" />
            </div>
            <form className={style.checkoutForm}>
              <label>
                Name
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  maxLength="30"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </label>
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
                Phone number
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  maxLength="14"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
              </label>
              <label>
                Address
                <input
                  type="text"
                  required
                  placeholder="Enter your address"
                  maxLength="80"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </label>
              <button type="submit">Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

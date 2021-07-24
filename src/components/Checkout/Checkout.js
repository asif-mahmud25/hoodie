import React, { useContext, useEffect, useState } from "react";
import style from "./Checkout.module.css";
import { useHistory } from "react-router-dom";

//cart context import
import { CartContext } from "../../context/CartContext";

//components import
import FormErrorHandler from "../ErrorHandlers/FormErrorHandler/FormErrorHandler";
import OrderItem from "../OrderItem/OrderItem";

const Checkout = () => {
  //input states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //input error state
  const [error, setError] = useState({
    errorShow: false,
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

  //order items render
  let orderItems = cart.map((el) => {
    return (
      <OrderItem
        key={el.id}
        id={el.id}
        imgUrl={el.imgUrl}
        name={el.name}
        price={el.price}
        size={el.size}
        quantity={el.quantity}
      />
    );
  });

  //calculate total price
  let totalPrice = 0;
  let priceSum = 0;
  if (cart.length > 0) {
    cart.forEach((el) => {
      priceSum = priceSum + el.price;
    });

    //round to two places
    totalPrice = Math.round((priceSum + Number.EPSILON) * 100) / 100;
  }

  //regular expressions for inputs
  const nameRegExp = /^[a-z ,.'-]+$/i;
  const phoneRegExp = /^\d{10,14}$/;
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //submit user order
  const submitOrder = (event) => {
    event.preventDefault();

    //check for input errors
    if (nameRegExp.test(userName) === false) {
      setError({
        errorShow: true,
        errorMsg: "Invalid name",
      });
    } else if (emailRegExp.test(email) === false) {
      setError({
        errorShow: true,
        errorMsg: "Invalid email",
      });
    } else if (phoneRegExp.test(phone) === false) {
      setError({
        errorShow: true,
        errorMsg: "Invalid phone number",
      });
    } else {
      setError({
        errorShow: false,
        errorMsg: "",
      });
      //submit the order here
      console.log("order submitted");
    }
  };

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
              <FormErrorHandler errorMsg={error.errorMsg} />
            </div>
            <form className={style.checkoutForm} onSubmit={submitOrder}>
              <label>
                Name
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  maxLength="30"
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
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
          <div className={style.orderBox}>
            <h3>Your order</h3>
            {orderItems}
            <hr />
            <div className={style.totalPrice}>
              <h3>Total Price</h3>
              <h3>${totalPrice}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

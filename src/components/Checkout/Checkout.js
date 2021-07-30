import React, { useContext, useEffect, useState } from "react";
import style from "./Checkout.module.css";
import { useHistory } from "react-router-dom";

//cart context import
import { CartContext } from "../../context/CartContext";

//auth context import
import { AuthContext } from "../../context/AuthContext";

//import firebase
import firebase from "firebase/app";

//components import
import FormErrorHandler from "../ErrorHandlers/FormErrorHandler/FormErrorHandler";
import OrderItem from "../OrderItem/OrderItem";
import FullPageLoader from "../Loaders/FullPageLoader/FullPageLoader";
import ActionModal from "../Modals/ActionModal/ActionModal";
import MessageModal from "../Modals/MessageModal/MessageModal";

//db import
import { db } from "../../firebase";

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

  //loading state
  const [loading, setLoading] = useState(false);

  //modal states
  const [orderSuccessModal, setOrderSuccessModal] = useState(false);
  const [orderFailedModal, setOrderFailedModal] = useState(false);

  //cart context
  const [cart, setCart] = useContext(CartContext);

  //auth context
  const [user] = useContext(AuthContext);

  //for navigation
  const history = useHistory();

  //if cart is empty go to home
  useEffect(() => {
    if (cart.length < 1) {
      history.replace("/");
    }

    // eslint-disable-next-line
  }, [cart.length]);

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

      setLoading(true);

      //submitting the order here
      db.collection("users")
        .doc(user.userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            //make the order
            db.collection("users")
              .doc(user.userId)
              .collection("orders")
              .add({
                userName: userName,
                userEmail: email,
                userPhone: phone,
                userAddress: address,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                orderItems: cart,
                orderTotalPrice: totalPrice,
              })
              .then((res) => {
                setLoading(false);
                setOrderSuccessModal(true);
              })
              .catch((err) => {
                setLoading(false);
                setOrderFailedModal(true);
                console.log(err);
              });
          } else {
            setLoading(false);
            setOrderFailedModal(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          setOrderFailedModal(true);
          console.log(err);
        });
    }
  };

  //showing loader when needed
  let fullLoader = null;
  if (loading) {
    fullLoader = <FullPageLoader />;
  }

  //modal show logic
  let showModal = null;
  if (orderSuccessModal) {
    showModal = (
      <ActionModal
        modalType="success"
        text="Your order has been placed!"
        buttonOneText="Go To Orders"
        buttonTwoText="Close"
        buttonOneAction={() => {
          setOrderSuccessModal(false);
          setCart([]);
          history.replace("/orders");
        }}
        buttonTwoAction={() => {
          setOrderSuccessModal(false);
          setCart([]);
          history.replace("/");
        }}
      />
    );
  } else if (orderFailedModal) {
    showModal = (
      <MessageModal
        modalType="failed"
        text="Opps, something went wrong!"
        buttonText="Try Later"
        buttonAction={() => {
          setOrderFailedModal(false);
          setCart([]);
          history.replace("/");
        }}
      />
    );
  }

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
      {showModal}
      {fullLoader}
    </div>
  );
};

export default Checkout;

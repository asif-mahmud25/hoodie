import React, { useContext, useState } from "react";
import style from "./Cart.module.css";
import { useHistory } from "react-router-dom";

//import cart context
import { CartContext } from "../../context/CartContext";

//import components
import CartItem from "../CartItem/CartItem";

//modal import
import ActionModal from "../Modals/ActionModal/ActionModal";

//auth context import
import { AuthContext } from "../../context/AuthContext";

const Cart = () => {
  //cart context
  const [cart] = useContext(CartContext);

  //auth context
  const [user] = useContext(AuthContext);

  //modal state
  const [unauthenticatedModal, setUnauthenticatedModal] = useState(false);

  //for navigation
  const history = useHistory();

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

  //cart items
  let cartItems = cart.map((el) => {
    return (
      <CartItem
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

  //checkout btn action
  const userCheckout = () => {
    if (user.loggedIn) {
      history.push("/checkout");
    } else {
      setUnauthenticatedModal(true);
    }
  };

  //show a msg when cart is empty
  let cartPageContent;
  if (cart.length > 0) {
    cartPageContent = (
      <div className={style.cartContent}>
        <div className={style.cartItemContainer}>{cartItems}</div>
        <div className={style.priceBox}>
          <div className={style.priceTextContainer}>
            <h3>Total Price</h3>
            <h2>${totalPrice}</h2>
          </div>
          <button onClick={userCheckout}>Checkout</button>
        </div>
      </div>
    );
  } else {
    cartPageContent = (
      <p className={style.cartEmptyMsg}>
        You haven't added anything in cart yet!
      </p>
    );
  }

  //modal show logic
  let showModal = null;
  if (unauthenticatedModal) {
    showModal = (
      <ActionModal
        modalType="warning"
        text="Login or register to complete order!"
        buttonOneText="Login or Signup"
        buttonTwoText="Close"
        buttonOneAction={() => {
          history.push("/sign-up");
        }}
        buttonTwoAction={() => {
          setUnauthenticatedModal(false);
        }}
      />
    );
  }

  return (
    <div className={style.cart}>
      <div className="container">
        <h1>YOUR CART</h1>
        {cartPageContent}
      </div>
      {showModal}
    </div>
  );
};

export default Cart;

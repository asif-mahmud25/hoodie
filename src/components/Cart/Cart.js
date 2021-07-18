import React, { useContext } from "react";
import style from "./Cart.module.css";

//import cart context
import { CartContext } from "../../context/CartContext";

//import components
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  //cart context
  const [cart, setCart] = useContext(CartContext);

  //for test
  console.log(cart);

  //calculate total price
  let totalPrice = 0;
  if (cart.length > 0) {
    cart.forEach((el) => {
      totalPrice = totalPrice + el.price;
    });
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

  //show a msg when cart is empty
  let cartPageContent;
  if (cart.length > 0) {
    cartPageContent = (
      <div className={style.cartContent}>
        <div className={style.cartItemContainer}>{cartItems}</div>
        <div className={style.priceBox}>
          <div className={style.priceTextContainer}>
            <h3>Total Price</h3>
            <h2>${totalPrice.toFixed(2)}</h2>
          </div>
          <button>Checkout</button>
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
  return (
    <div className={style.cart}>
      <div className="container">
        <h1>YOUR CART</h1>
        {cartPageContent}
      </div>
    </div>
  );
};

export default Cart;

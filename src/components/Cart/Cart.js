import React, { useContext } from "react";
import style from "./Cart.module.css";

//import cart context
import { CartContext } from "../../context/CartContext";

//import components
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  //cart context
  const [cart, setCart] = useContext(CartContext);

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
  return (
    <div className={style.cart}>
      <div className="container">
        <h1>YOUR CART</h1>
        <div className={style.cartContent}>
          <div className={style.cartItemContainer}>{cartItems}</div>
          <div className={style.priceBox}>
            <div className={style.priceTextContainer}>
              <h3>Total Price</h3>
              <h2>$340.50</h2>
            </div>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

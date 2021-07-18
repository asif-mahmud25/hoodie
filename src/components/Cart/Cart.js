import React from "react";
import style from "./Cart.module.css";

const Cart = () => {
  return (
    <div className={style.cart}>
      <div className="container">
        <h1>YOUR CART</h1>
        <div className={style.cartContent}>
          <div className={style.cartItemContainer}>hello</div>
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

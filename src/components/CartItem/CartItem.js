import React from "react";
import style from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <div className={style.cartItem}>
      <div className={style.cartItemContent}>
        <img src={props.imgUrl} alt="" />
        <div className={style.cartItemDetailsBox}>
          <div className={style.cartItemInfo}>
            <h4>{props.name}</h4>
            <h3>{props.price}</h3>
          </div>
          <p>Size: {props.size}</p>
          <div className={style.cartItemAction}>
            <div className={style.cartItemAddReduce}>
              <button>-</button>
              <h3>{props.quantity}</h3>
              <button>+</button>
            </div>
            <p>Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

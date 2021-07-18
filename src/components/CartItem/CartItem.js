import React, { useState } from "react";
import style from "./CartItem.module.css";

//assets import
import placeholderImg from "../../assets/placeholder-img-sm.svg";

const CartItem = (props) => {
  //image load state
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <div className={style.cartItem}>
      <div className={style.cartItemContent}>
        <img
          className={imgLoading ? style.hide : style.show}
          src={props.imgUrl}
          alt=""
          onLoad={() => {
            setImgLoading(false);
          }}
        />
        <img
          className={imgLoading ? style.show : style.hide}
          src={placeholderImg}
          alt=""
        />
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

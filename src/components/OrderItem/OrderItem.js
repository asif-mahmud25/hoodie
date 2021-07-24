import React, { useState } from "react";
import style from "./OrderItem.module.css";

//asset import
import placeholderImg from "../../assets/placeholder-img-sm.svg";

const OrderItem = (props) => {
  //img loading state
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <div className={style.orderItem}>
      <img
        src={props.imgUrl}
        alt="product"
        className={imgLoading ? style.hide : style.show}
        onLoad={() => {
          setImgLoading(false);
        }}
      />
      <img
        src={placeholderImg}
        alt="product"
        className={imgLoading ? style.show : style.hide}
      />
      <div className={style.productDetails}>
        <div className={style.nameAndPrice}>
          <p>{props.name}</p>
          <p>${props.price}</p>
        </div>
        <div className={style.sizeAndQuantity}>
          <p>Size: {props.size}</p>
          <p>Quantity: {props.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

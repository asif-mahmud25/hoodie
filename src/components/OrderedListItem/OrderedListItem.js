import React from "react";
import style from "./OrderedListItem.module.css";

//assets import
import cloth from "../../assets/cloth.svg";

const OrderedListItem = (props) => {
  let productList = null;
  if (props.orderItems.length > 0) {
    productList = props.orderItems.map((el) => {
      return (
        <p className={style.product} key={el.id}>
          {el.name}, Size: {el.size}, Quantity: {el.quantity}
        </p>
      );
    });
  }

  return (
    <div className={style.orderedListItem}>
      <img src={cloth} alt="" />
      <div className={style.orderDescription}>
        <div className={style.timeAndPrice}>
          <p className={style.orderTime}>
            {props.time.toDate().toDateString()}
          </p>
          <p className={style.orderPrice}>${props.price}</p>
        </div>
        <div className={style.userInfo}>
          <p>{props.userName}</p>
          <p>{props.userAddress}</p>
        </div>
        <div>
          <p className={style.productHeading}>Products</p>
          {productList}
        </div>
      </div>
    </div>
  );
};

export default OrderedListItem;

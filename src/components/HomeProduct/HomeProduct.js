import React from "react";
import style from "./HomeProduct.module.css";

const HomeProduct = (props) => {
  return (
    <div className={style.homeProduct}>
      <img src={props.imageUrl} alt="" />
      <div className={style.productInfo}>
        <h3>{props.name}</h3>
        <p>{props.description}</p>
        <h2>${props.price}</h2>
        <button>Add To Cart</button>
      </div>
    </div>
  );
};

export default HomeProduct;

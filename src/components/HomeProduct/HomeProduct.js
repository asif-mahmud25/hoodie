import React, { useState } from "react";
import style from "./HomeProduct.module.css";

//assets import
import placeholderImg from "../../assets/placeholder-img.svg";

const HomeProduct = (props) => {
  //loading state for images
  const [loading, setLoading] = useState(true);

  //change state on image load
  const showImg = () => {
    setLoading(false);
  };

  return (
    <div className={style.homeProduct}>
      <img
        className={loading ? style.show : style.hide}
        src={placeholderImg}
        alt=""
      />
      <img
        className={loading ? style.hide : style.show}
        src={props.imageUrl}
        alt=""
        onLoad={showImg}
      />
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

import React, { useState } from "react";
import style from "./HomeProduct.module.css";
import { useHistory } from "react-router-dom";

//assets import
import placeholderImg from "../../assets/placeholder-img.svg";

const HomeProduct = (props) => {
  //loading state for images
  const [loading, setLoading] = useState(true);

  //change state on image load
  const showImg = () => {
    setLoading(false);
  };

  //for navigation to product page
  const history = useHistory();

  //go to product page
  const goToProduct = () => {
    history.push(`/product/${props.id}`);
  };

  //add to cart
  const addToCart = (e) => {
    e.stopPropagation();
    console.log("added to cart!");
  };

  return (
    <div className={style.homeProduct} onClick={goToProduct}>
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
        <button onClick={addToCart}>Add To Cart</button>
      </div>
    </div>
  );
};

export default HomeProduct;

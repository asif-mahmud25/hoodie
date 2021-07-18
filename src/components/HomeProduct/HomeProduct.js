import React, { useContext, useState } from "react";
import style from "./HomeProduct.module.css";
import { useHistory } from "react-router-dom";

//assets import
import placeholderImg from "../../assets/placeholder-img.svg";

//cart context
import { CartContext } from "../../context/CartContext";

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

  //cart context
  const [cart, setCart] = useContext(CartContext);

  //add to cart
  const addToCart = (e) => {
    e.stopPropagation();

    let itemExits = false;

    //check for item already in cart
    cart.forEach((el) => {
      if (el.id === props.id) {
        itemExits = true;
      }
    });

    if (itemExits === false) {
      setCart([
        ...cart,
        {
          id: props.id,
          img: props.imageSmallUrl,
          name: props.name,
          price: props.price,
          size: "M",
          quantity: 1,
        },
      ]);

      //show item added to cart modal
      props.showAddedToCartModal();
    } else {
      //show item already in cart modal
      props.showItemInCartModal();
    }
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

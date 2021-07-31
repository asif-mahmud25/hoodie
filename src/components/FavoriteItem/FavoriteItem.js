import React, { useState, useContext } from "react";
import style from "./FavoriteItem.module.css";
import { useHistory } from "react-router-dom";

//contex imports
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

//firestore db
import { db } from "../../firebase";

//assets import
import placeholderImg from "../../assets/placeholder-img-sm.svg";
import deleteIcon from "../../assets/delete-icon.svg";

const FavoriteItem = (props) => {
  //loading state
  const [imgLoading, setImgLoading] = useState(true);

  //for navigation
  const history = useHistory();

  //auth context
  const [user] = useContext(AuthContext);

  //cart context
  const [cart, setCart] = useContext(CartContext);

  //delete favorite items
  const deleteFavItem = (event) => {
    event.stopPropagation();

    db.collection("users")
      .doc(user.userId)
      .collection("favorites")
      .doc(props.id)
      .delete()
      .then(() => {
        console.log("item deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //add to cart
  const addToCart = (event) => {
    event.stopPropagation();

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
          imgUrl: props.imgSmallUrl,
          name: props.name,
          price: props.price,
          unitPrice: props.price,
          size: props.size,
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
    <div
      className={style.favoriteItem}
      onClick={() => {
        history.push(`/product/${props.id}`);
      }}
    >
      <div className={style.favoriteItemBox}>
        <div className={style.favoriteItemContent}>
          <img
            src={placeholderImg}
            alt="product"
            className={imgLoading ? style.show : style.hide}
          />
          <img
            src={props.imgSmallUrl}
            alt="product"
            className={imgLoading ? style.hide : style.show}
            onLoad={() => {
              setImgLoading(false);
            }}
          />
          <div className={style.favoriteItemDetails}>
            <div className={style.nameAndPrice}>
              <p>{props.name}</p>
              <p>${props.price}</p>
            </div>
            <p className={style.itemSize}>Size: {props.size}</p>
            <div className={style.favoriteItemAction}>
              <button onClick={addToCart}>Add To Cart</button>
              <p onClick={deleteFavItem}>Remove</p>
            </div>
          </div>
        </div>
      </div>
      {/*phone version*/}
      <div className={style.phoneFavoriteItemBox}>
        <div className={style.phoneFavoriteItemContent}>
          <img
            src={placeholderImg}
            alt="product"
            className={imgLoading ? style.show : style.hide}
          />
          <img
            src={props.imgSmallUrl}
            alt="product"
            className={imgLoading ? style.hide : style.show}
            onLoad={() => {
              setImgLoading(false);
            }}
          />
          <div className={style.phoneFavoriteItemDetails}>
            <div className={style.phoneNameAndDelete}>
              <p>{props.name}</p>
              <img src={deleteIcon} alt="Remove" onClick={deleteFavItem} />
            </div>
            <p className={style.phoneItemSize}>Size: {props.size}</p>
            <div className={style.phonePriceAndAddToCart}>
              <p className={style.phonePrice}>${props.price}</p>
              <p className={style.phoneAddToCart} onClick={addToCart}>
                +Add To Cart
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;

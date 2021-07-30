import React, { useState, useContext } from "react";
import style from "./FavoriteItem.module.css";
import { useHistory } from "react-router-dom";

//auth contex
import { AuthContext } from "../../context/AuthContext";

//firestore db
import { db } from "../../firebase";

//assets import
import placeholderImg from "../../assets/placeholder-img-sm.svg";

const FavoriteItem = (props) => {
  //loading state
  const [imgLoading, setImgLoading] = useState(true);

  //for navigation
  const history = useHistory();

  //auth context
  const [user] = useContext(AuthContext);

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
              <button>Add To Cart</button>
              <p onClick={deleteFavItem}>Remove</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;

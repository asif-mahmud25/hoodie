import React, { useState } from "react";
import style from "./FavoriteItem.module.css";

//assets import
import placeholderImg from "../../assets/placeholder-img-sm.svg";

const FavoriteItem = (props) => {
  //loading state
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <div className={style.favoriteItem}>
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
              <p>Remove</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;

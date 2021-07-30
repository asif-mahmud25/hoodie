import React, { useState } from "react";
import style from "./FavoriteItem.module.css";

//assets import
import placeholderImg from "../../assets/placeholder-img-sm.svg";

const FavoriteItem = () => {
  //loading state
  const [imgLoading, setImgLoading] = useState(true);
  return (
    <div className={style.favoriteItem}>
      <div className={style.favoriteItemContent}>
        <img
          src={placeholderImg}
          alt="product"
          className={imgLoading ? style.show : style.hide}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/hoodie-94315.appspot.com/o/p2-small.png?alt=media&token=9ad1c02b-62f9-4f00-93c1-62946ad8dc2d"
          alt="product"
          className={imgLoading ? style.hide : style.show}
          onLoad={() => {
            setImgLoading(false);
          }}
        />
        <div className={style.favoriteItemDetails}>
          <div className={style.nameAndPrice}>
            <p>Classic leather jacket</p>
            <p>$86.60</p>
          </div>
          <p className={style.itemSize}>Size: M</p>
          <div className={style.favoriteItemAction}>
            <button>Add To Cart</button>
            <p>Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;

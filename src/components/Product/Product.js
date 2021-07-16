import React from "react";
import style from "./Product.module.css";

const Product = () => {
  return (
    <div className={style.product}>
      <div className="container">
        <div className={style.productContent}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/hoodie-94315.appspot.com/o/p6-large.png?alt=media&token=54b5c318-afb9-4d3e-a4ac-390c79506e53"
            alt="product-image"
          />

          <div className={style.productDetails}>
            <h2>Classic leather jacket</h2>
            <p>
              Classic style men's black jacket. Made from genuine soft cow
              leather. Best for bikers who rides with style
            </p>
            <h1>$86.60</h1>
            <div className={style.sizeButtonsContainer}>
              <button className={style.sizeButton}>S</button>
              <button className={style.sizeButton}>M</button>
              <button className={style.sizeButton}>L</button>
              <button className={style.sizeButton}>XL</button>
            </div>
            <div>
              <button className={style.cartButton}>Add To Cart</button>
              <button className={style.favoriteButton}>Add To Favorites</button>
              {/* <button>Remove Favorite</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

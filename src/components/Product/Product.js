import React from "react";
import style from "./Product.module.css";

const Product = () => {
  return (
    <div>
      <div className="container">
        <div>
          <div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hoodie-94315.appspot.com/o/p6-large.png?alt=media&token=54b5c318-afb9-4d3e-a4ac-390c79506e53"
              alt="product-image"
            />
          </div>
          <div>
            <h2>Classic leather jacket</h2>
            <p>
              Classic style men's black jacket. Made from genuine soft cow
              leather. Best for bikers who rides with style
            </p>
            <h1>$86.60</h1>
            <div>
              <button>S</button>
              <button>M</button>
              <button>L</button>
              <button>XL</button>
            </div>
            <div>
              <button>Add To Cart</button>
              <button>Add To Favorites</button>
              <button>Remove Favorite</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

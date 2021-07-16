import React, { useEffect, useState } from "react";
import style from "./Product.module.css";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../../firebase";

const Product = () => {
  //to get the product id
  const params = useParams();

  //for navigation
  const history = useHistory();

  //product state
  const [product, setProduct] = useState({
    id: "",
    imgUrl: "",
    name: "",
    description: "",
    price: "",
  });

  let productHolder = {};

  useEffect(() => {
    db.collection("products")
      .doc(`${params.id}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          //for test
          console.log(doc.data());

          productHolder = {
            id: doc.data().id,
            imgUrl: doc.data().imgL,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
          };

          setProduct(productHolder);
        } else {
          //if there not such product go to home
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // eslint-disable-next-line
  }, [params.id]);

  //for test
  console.log(product);
  return (
    <div className={style.product}>
      <div className="container">
        <div className={style.productContent}>
          <img src={product.imgUrl} alt="product" />

          <div className={style.productDetails}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h1>{product.price}</h1>
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

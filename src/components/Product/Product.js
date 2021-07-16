import React, { useEffect, useState } from "react";
import style from "./Product.module.css";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import MainLoader from "../Loaders/MainLoader/MainLoader";

//assets import
import placeholderImg from "../../assets/placeholder-img.svg";

const Product = () => {
  //to get the product id
  const params = useParams();

  //for navigation
  const history = useHistory();

  //loading states
  const [productLoading, setProductLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);

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
          setProductLoading(false);
        } else {
          //if there not such product go to home
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setProductLoading(false);
      });

    // eslint-disable-next-line
  }, [params.id]);

  //on image load
  const showImg = () => {
    setImgLoading(false);
  };

  //for test
  console.log(product);
  return (
    <div className={style.product}>
      <div className="container">
        <div className={productLoading ? style.hide : style.productContent}>
          <img
            className={imgLoading ? style.hide : style.show}
            src={product.imgUrl}
            alt="product"
            onLoad={showImg}
          />
          <img
            className={imgLoading ? style.show : style.hide}
            src={placeholderImg}
            alt="product"
          />
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
        <div className={productLoading ? style.show : style.hide}>
          <MainLoader />
        </div>
      </div>
    </div>
  );
};

export default Product;

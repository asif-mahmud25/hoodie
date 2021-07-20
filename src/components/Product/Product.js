import React, { useEffect, useState, useContext } from "react";
import style from "./Product.module.css";
import { useParams, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import MainLoader from "../Loaders/MainLoader/MainLoader";

//cart context import
import { CartContext } from "../../context/CartContext";

//components import
import MessageModal from "../Modals/MessageModal/MessageModal";

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

  //product size state
  const [productSize, setProductSize] = useState("M");

  //product state
  const [product, setProduct] = useState({
    id: "",
    imgUrl: "",
    imgSmallUrl: "",
    name: "",
    description: "",
    price: "",
  });

  //modal states
  const [addedToCartModal, setAddedToCartModal] = useState(false);
  const [itemExistInCartModal, setItemExistInCartModal] = useState(false);

  //cart context
  const [cart, setCart] = useContext(CartContext);

  //for holding the fetched data
  let productHolder = {};

  //fetch the product from firebase on component load
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
            imgSmallUrl: doc.data().imgS,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
          };

          setProduct(productHolder);
          setProductLoading(false);
        } else {
          //if there is no such product go to home
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setProductLoading(false);
      });

    // eslint-disable-next-line
  }, [params.id]);

  //add to cart
  const addToCart = (e) => {
    let itemExits = false;

    //check for item already in cart
    cart.forEach((el) => {
      if (el.id === product.id) {
        itemExits = true;
      }
    });

    if (itemExits === false) {
      setCart([
        ...cart,
        {
          id: product.id,
          imgUrl: product.imgSmallUrl,
          name: product.name,
          price: product.price,
          unitPrice: product.price,
          size: productSize,
          quantity: 1,
        },
      ]);

      //show item added to cart modal
      setAddedToCartModal(true);
    } else {
      //show item already in cart modal
      setItemExistInCartModal(true);
    }
  };

  //on image load
  const showImg = () => {
    setImgLoading(false);
  };

  //size button styles
  let sSizeBtn = style.sizeButton;
  let mSizeBtn = style.sizeButton;
  let lSizeBtn = style.sizeButton;
  let xLSizeBtn = style.sizeButton;

  //size button style logic
  if (productSize === "S") {
    sSizeBtn = style.sizeButtonActive;
  } else if (productSize === "M") {
    mSizeBtn = style.sizeButtonActive;
  } else if (productSize === "L") {
    lSizeBtn = style.sizeButtonActive;
  } else if (productSize === "XL") {
    xLSizeBtn = style.sizeButtonActive;
  }

  //modal render logic
  let showModal = null;

  if (addedToCartModal) {
    showModal = (
      <MessageModal
        modalType="success"
        text="Item added to cart!"
        buttonText="Ok"
        buttonAction={() => {
          setAddedToCartModal(false);
        }}
      />
    );
  } else if (itemExistInCartModal) {
    showModal = (
      <MessageModal
        modalType="warning"
        text="Item already added to cart!"
        buttonText="Ok"
        buttonAction={() => {
          setItemExistInCartModal(false);
        }}
      />
    );
  }

  //for test
  console.log(product);
  console.log(productSize);
  console.log(cart);
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
              <button
                className={sSizeBtn}
                onClick={() => {
                  setProductSize("S");
                }}
              >
                S
              </button>
              <button
                className={mSizeBtn}
                onClick={() => {
                  setProductSize("M");
                }}
              >
                M
              </button>
              <button
                className={lSizeBtn}
                onClick={() => {
                  setProductSize("L");
                }}
              >
                L
              </button>
              <button
                className={xLSizeBtn}
                onClick={() => {
                  setProductSize("XL");
                }}
              >
                XL
              </button>
            </div>
            <div>
              <button className={style.cartButton} onClick={addToCart}>
                Add To Cart
              </button>
              <button className={style.favoriteButton}>Add To Favorites</button>
              {/* <button>Remove Favorite</button> */}
            </div>
          </div>
        </div>
        <div className={productLoading ? style.show : style.hide}>
          <MainLoader />
        </div>
      </div>
      {showModal}
    </div>
  );
};

export default Product;

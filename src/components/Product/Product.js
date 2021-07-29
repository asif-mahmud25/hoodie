import React, { useEffect, useState, useContext } from "react";
import style from "./Product.module.css";
import { useParams, useHistory } from "react-router-dom";

//context import
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

//components import
import MessageModal from "../Modals/MessageModal/MessageModal";
import MainLoader from "../Loaders/MainLoader/MainLoader";
import FullPageLoader from "../Loaders/FullPageLoader/FullPageLoader";

//firestore db import
import { db } from "../../firebase";

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
  const [addToFavLoading, setAddToFavLoading] = useState(false);

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
  const [addToFavSuccessModal, setAddToFavSuccessModal] = useState(false);
  const [addToFavFailedModal, setAddToFavFailedModal] = useState(false);
  const [alreadyInFavModal, setAlreadyInFavModal] = useState(false);

  //cart context
  const [cart, setCart] = useContext(CartContext);

  //auth context
  const [user] = useContext(AuthContext);

  //for holding the fetched data
  let productHolder = {};

  //fetch the product from firebase on component load
  useEffect(() => {
    db.collection("products")
      .doc(`${params.id}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
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

  //add to favorites in the db
  const addToFavorites = () => {
    //show loader
    setAddToFavLoading(true);

    db.collection("users")
      .doc(user.userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          db.collection("users")
            .doc(user.userId)
            .collection("favorites")
            .doc(product.id)
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("alredy added to favorites!");
                setAlreadyInFavModal(true);
                setAddToFavLoading(false);
              } else {
                db.collection("users")
                  .doc(user.userId)
                  .collection("favorites")
                  .doc(product.id)
                  .set({ ...product, size: productSize })
                  .then((res) => {
                    console.log("added to favorites!");
                    setAddToFavSuccessModal(true);
                    setAddToFavLoading(false);
                  })
                  .catch((err) => {
                    console.log(err);
                    setAddToFavFailedModal(true);
                    setAddToFavLoading(false);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
              setAddToFavFailedModal(true);
              setAddToFavLoading(false);
            });
        } else {
          setAddToFavFailedModal(true);
          setAddToFavLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setAddToFavFailedModal(true);
        setAddToFavLoading(false);
      });
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
  } else if (addToFavSuccessModal) {
    showModal = (
      <MessageModal
        modalType="success"
        text="Item added to favorites!"
        buttonText="Ok"
        buttonAction={() => {
          setAddToFavSuccessModal(false);
        }}
      />
    );
  } else if (addToFavFailedModal) {
    showModal = (
      <MessageModal
        modalType="failed"
        text="Failed to add to favorites!"
        buttonText="Try Later"
        buttonAction={() => {
          setAddToFavFailedModal(false);
        }}
      />
    );
  } else if (alreadyInFavModal) {
    showModal = (
      <MessageModal
        modalType="warning"
        text="Alredy added to favorites!"
        buttonText="Ok"
        buttonAction={() => {
          setAlreadyInFavModal(false);
        }}
      />
    );
  }

  //showing full page loader when adding to favorites
  let fullLoader = null;
  if (addToFavLoading) {
    fullLoader = <FullPageLoader />;
  }

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
            <h1>${product.price}</h1>
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
              <button className={style.favoriteButton} onClick={addToFavorites}>
                Add To Favorites
              </button>
            </div>
          </div>
        </div>
        <div className={productLoading ? style.show : style.hide}>
          <MainLoader />
        </div>
      </div>
      {showModal}
      {fullLoader}
    </div>
  );
};

export default Product;

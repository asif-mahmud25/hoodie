import React, { useState, useContext, useEffect } from "react";
import style from "./Favorites.module.css";

//components import
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import MainLoader from "../Loaders/MainLoader/MainLoader";
import MessageModal from "../Modals/MessageModal/MessageModal";

//firestore db
import { db } from "../../firebase";

//context import
import { AuthContext } from "../../context/AuthContext";

const Favorites = () => {
  //favorites state
  const [favoriteItems, setFavoriteItems] = useState([]);

  //loading states
  const [favListLoading, setFavListLoading] = useState(true);

  //auth context
  const [user] = useContext(AuthContext);

  //modal states
  const [addedToCartModal, setAddedToCartModal] = useState(false);
  const [itemInCartModal, setItemInCartModal] = useState(false);

  //get favorites on component load
  useEffect(() => {
    let unsubscribe = () => {
      console.log("fav listener was not attached.");
    };

    db.collection("users")
      .doc(user.userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          unsubscribe = db
            .collection("users")
            .doc(user.userId)
            .collection("favorites")
            .onSnapshot(
              (snapshot) => {
                let allFavorites = [];
                snapshot.forEach((doc) => {
                  allFavorites.push({ ...doc.data() });
                });

                setFavListLoading(false);
                setFavoriteItems(allFavorites);
              },
              (error) => {
                console.log(error);
                setFavListLoading(false);
              }
            );
        } else {
          setFavListLoading(false);
        }
      })
      .catch((err) => {
        setFavListLoading(false);
        console.log(err);
      });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line
  }, []);

  //show favorite items
  let favoriteList = (
    <p className={style.noFavoritesText}>You haven't added anything yet!</p>
  );
  if (favoriteItems.length > 0) {
    favoriteList = favoriteItems.map((el) => {
      return (
        <FavoriteItem
          key={el.id}
          id={el.id}
          name={el.name}
          description={el.description}
          price={el.price}
          size={el.size}
          imgUrl={el.imgUrl}
          imgSmallUrl={el.imgSmallUrl}
          showAddedToCartModal={() => {
            setAddedToCartModal(true);
          }}
          showItemInCartModal={() => {
            setItemInCartModal(true);
          }}
        />
      );
    });
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
  } else if (itemInCartModal) {
    showModal = (
      <MessageModal
        modalType="warning"
        text="Item already added to cart!"
        buttonText="Ok"
        buttonAction={() => {
          setItemInCartModal(false);
        }}
      />
    );
  }

  return (
    <div className={style.favorites}>
      <div className="container">
        <h1 className={style.pageHeader}>YOUR FAVORITES</h1>
        {favListLoading ? <MainLoader /> : <div>{favoriteList}</div>}
      </div>
      {showModal}
    </div>
  );
};

export default Favorites;

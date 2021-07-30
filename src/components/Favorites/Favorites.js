import React from "react";
import style from "./Favorites.module.css";

//components import
import FavoriteItem from "../FavoriteItem/FavoriteItem";

const Favorites = () => {
  return (
    <div className={style.favorites}>
      <div className="container">
        <h1 className={style.pageHeader}>YOUR FAVORITES</h1>
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
        <FavoriteItem />
      </div>
    </div>
  );
};

export default Favorites;

import React from "react";
import style from "./Favorites.module.css";

const Favorites = () => {
  return (
    <div className={style.favorites}>
      <div className="container">
        <h1 className={style.pageHeader}>YOUR FAVORITES</h1>
      </div>
    </div>
  );
};

export default Favorites;

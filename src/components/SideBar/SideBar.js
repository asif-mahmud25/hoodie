import React from "react";
import style from "./SideBar.module.css";

//assets imports
import menuBars from "../../assets/menu-bars.svg";

const SideBar = () => {
  return (
    <div className={style.sideBar}>
      <div className={style.sideBarHeader}>
        <div className="container">
          <div className={style.sideBarHeaderContent}>
            <h1>hoodie.</h1>
            <img src={menuBars} alt="Menu" />
          </div>
        </div>
      </div>
      <div className={style.sideBarBox}></div>
    </div>
  );
};

export default SideBar;

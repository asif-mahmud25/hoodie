import React, { useState } from "react";
import style from "./SideBar.module.css";

//assets imports
import menuBars from "../../assets/menu-bars.svg";

const SideBar = () => {
  const [sideBarOpen, setSidebarOpen] = useState(false);

  //open sidebar
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  //close sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <div className={style.sideBar}>
      <div className={style.sideBarHeader}>
        <div className="container">
          <div className={style.sideBarHeaderContent}>
            <h1>hoodie.</h1>
            <img src={menuBars} alt="Menu" onClick={openSidebar} />
          </div>
        </div>
      </div>
      <div
        className={
          sideBarOpen
            ? style.sideBarBoxBackdrop
            : style.sideBarBoxBackdropHidden
        }
        onClick={closeSidebar}
      ></div>
      <div
        className={sideBarOpen ? style.sideBarBoxOpen : style.sideBarBoxClosed}
      >
        hoodie
      </div>
    </div>
  );
};

export default SideBar;

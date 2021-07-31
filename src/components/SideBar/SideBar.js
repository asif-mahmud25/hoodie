import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./SideBar.module.css";

//auth context import
import { AuthContext } from "../../context/AuthContext";

//assets imports
import menuBars from "../../assets/menu-bars.svg";

const SideBar = () => {
  const [sideBarOpen, setSidebarOpen] = useState(false);

  //auth context
  const [user] = useContext(AuthContext);

  //open sidebar
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  //close sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  let authenticatedLinks = (
    <nav>
      <ul>
        <li onClick={closeSidebar}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li onClick={closeSidebar}>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
        <li onClick={closeSidebar}>
          <NavLink to="/cart">Cart</NavLink>
        </li>
        <li onClick={closeSidebar}>
          <NavLink to="/orders">Orders</NavLink>
        </li>
        <li onClick={closeSidebar}>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );

  let visitorLinks = (
    <nav>
      <ul>
        <li onClick={closeSidebar}>
          <NavLink to="/">Home</NavLink>
        </li>
        <li onClick={closeSidebar}>
          <NavLink to="/cart">Cart</NavLink>
        </li>
        <li onClick={closeSidebar}>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <div onClick={closeSidebar}>
            <NavLink to="/sign-up">Sign Up</NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );

  let navItems;
  if (user.loggedIn) {
    navItems = authenticatedLinks;
  } else {
    navItems = visitorLinks;
  }
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
        <h1 className={style.sidebarBoxLogo}>hoodie.</h1>
        <div className={style.navItems}>{navItems}</div>
      </div>
    </div>
  );
};

export default SideBar;

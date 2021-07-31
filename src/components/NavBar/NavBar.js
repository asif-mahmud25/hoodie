import React, { useContext } from "react";
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

//auth context import
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  //auth context
  const [user] = useContext(AuthContext);

  let authenticatedLinks = (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );

  let visitorLinks = (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart</NavLink>
        </li>
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <div>
            <NavLink to="/sign-up">Sign Up</NavLink>
          </div>
        </li>
      </ul>
    </nav>
  );

  //navbar changes according to user logged in status
  let navItems;
  if (user.loggedIn) {
    navItems = authenticatedLinks;
  } else {
    navItems = visitorLinks;
  }

  return (
    <div className={style.navBar}>
      <div className="container">
        <div className={style.navBarContent}>
          <h1>hoodie.</h1>
          {navItems}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

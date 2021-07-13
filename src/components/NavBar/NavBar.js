import React from "react";
import style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={style.navBar}>
      <div className="container">
        <div className={style.navBarContent}>
          <h1>hoodie.</h1>
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
                <div>
                  <NavLink to="/sign-up">Sign Up</NavLink>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

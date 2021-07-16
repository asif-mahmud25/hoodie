import React from "react";
import style from "./AppLayout.module.css";
import { Route, Switch, Redirect } from "react-router-dom";

//components imports
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import Product from "../Product/Product";

const AppLayout = () => {
  return (
    <div className={style.appLayout}>
      <NavBar />
      <SideBar />
      <div className={style.appLayoutContainer}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/product/:id" exact component={Product} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;

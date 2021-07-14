import React from "react";
import style from "./AppLayout.module.css";
import { Route, Switch, Redirect } from "react-router-dom";

//components imports
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";

const AppLayout = () => {
  return (
    <div className={style.appLayout}>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
};

export default AppLayout;

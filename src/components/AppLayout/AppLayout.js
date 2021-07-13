import React from "react";
import style from "./AppLayout.module.css";
import { Route, Switch, Redirect } from "react-router-dom";

//components imports
import Home from "../Home/Home";

const AppLayout = () => {
  return (
    <div className={style.appLayout}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  );
};

export default AppLayout;

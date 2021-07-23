import React, { useContext } from "react";
import style from "./AppLayout.module.css";
import { Route, Switch, Redirect } from "react-router-dom";

//auth context import
import { AuthContext } from "../../context/AuthContext";

//components imports
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const AppLayout = () => {
  //auth context
  const [user] = useContext(AuthContext);

  let authenticatiedRoutes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" exact component={Product} />
      <Route path="/cart" exact component={Cart} />
      <Redirect to="/" />
    </Switch>
  );

  let visitorRoutes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/product/:id" exact component={Product} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/login" exact component={Login} />
      <Route path="/sign-up" exact component={SignUp} />
      <Redirect to="/" />
    </Switch>
  );

  let routesUsed;
  if (user.loggedIn) {
    routesUsed = authenticatiedRoutes;
  } else {
    routesUsed = visitorRoutes;
  }
  return (
    <div className={style.appLayout}>
      <NavBar />
      <SideBar />
      <div className={style.appLayoutContainer}>{routesUsed}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;

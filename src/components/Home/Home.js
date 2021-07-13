import React from "react";
import style from "./Home.module.css";

import NavBar from "../NavBar/NavBar";

const Home = () => {
  return (
    <div className={style.home}>
      <NavBar />
    </div>
  );
};

export default Home;

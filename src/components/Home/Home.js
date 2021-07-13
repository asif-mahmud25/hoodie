import React from "react";
import style from "./Home.module.css";

import NavBar from "../NavBar/NavBar";

//assets import
import heroImg from "../../assets/heroImage.png";

const Home = () => {
  return (
    <div className={style.home}>
      <NavBar />
      <div className={style.heroSection}>
        <div className="container">
          <div className={style.heroSectionContent}>
            <div className={style.tagLineBox}>
              <h1 className={style.tagLineWords}>CLASSIC</h1>
              <h1 className={style.tagLineWords}>WITH</h1>
              <h1 className={style.tagLineWordHighlight}>MODERN</h1>
              <h1 className={style.tagLineWords}>TWIST</h1>
              <p>Hoodies, jackets & sweaters</p>
            </div>
            <div className={style.heroImage}>
              <img src={heroImg}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

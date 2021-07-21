import React from "react";
import style from "./FullPageLoader.module.css";

const FullPageLoader = () => {
  return (
    <div className={style.fullPageLoader}>
      <div className={style.loaderContainer}>
        <div className={style.loader}>Loading...</div>
      </div>
    </div>
  );
};

export default FullPageLoader;

import React from "react";
import style from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className="container">
        <div className={style.footerContent}>
          <div>
            <h1>hoodie.</h1>
            <p>Designed and developed by Asif Mahmud</p>
            <p>asifmahmud.officials@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

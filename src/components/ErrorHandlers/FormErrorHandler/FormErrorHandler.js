import React from "react";
import style from "./FormErrorHandler.module.css";

//asset import
import errorImg from "../../../assets/error.svg";

const FormErrorHandler = (props) => {
  return (
    <div className={style.formErrorHandler}>
      <div className={style.formErrorHandlerContent}>
        <img src={errorImg} alt="" />
        <p>{props.errorMsg}</p>
      </div>
    </div>
  );
};

export default FormErrorHandler;

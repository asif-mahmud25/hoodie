import React from "react";
import style from "./MessageModal.module.css";

//assets import
import check from "../../../assets/check-circle.svg";
import cross from "../../../assets/cross-circle.svg";
import exclamation from "../../../assets/exclamation-circle.svg";

const MessageModal = (props) => {
  let modalImg;
  //setting modal img
  if (props.modalType === "success") {
    modalImg = check;
  } else if (props.modalType === "failed") {
    modalImg = cross;
  } else if (props.modalType === "warning") {
    modalImg = exclamation;
  }
  return (
    <div className={style.messageModal}>
      <div className={style.modalBackdrop}>
        <div className="container">
          <div className={style.modalBox}>
            <img src={modalImg} alt="" />
            <h2>{props.text}</h2>
            <button onClick={props.buttonAction}>{props.buttonText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;

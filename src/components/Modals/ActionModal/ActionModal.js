import React from "react";
import style from "./ActionModal.module.css";

//assets import
import check from "../../../assets/check-circle.svg";
import cross from "../../../assets/cross-circle.svg";
import exclamation from "../../../assets/exclamation-circle.svg";
import favoriteImg from "../../../assets/favorite.svg";
import userImg from "../../../assets/user.svg";

const ActionModal = (props) => {
  let modalImg;
  //setting modal img
  if (props.modalType === "success") {
    modalImg = check;
  } else if (props.modalType === "failed") {
    modalImg = cross;
  } else if (props.modalType === "warning") {
    modalImg = exclamation;
  } else if (props.modalType === "favorite") {
    modalImg = favoriteImg;
  } else if (props.modalType === "user") {
    modalImg = userImg;
  }

  return (
    <div className={style.actionModal}>
      <div className={style.modalBackdrop}>
        <div className="container">
          <div className={style.modalBoxContainer}>
            <div className={style.modalBox}>
              <img src={modalImg} alt="" />
              <h2>{props.text}</h2>
              <button onClick={props.buttonOneAction}>
                {props.buttonOneText}
              </button>
              <button onClick={props.buttonTwoAction}>
                {props.buttonTwoText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;

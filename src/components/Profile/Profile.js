import React, { useContext } from "react";
import style from "./Profile.module.css";

//auth context import
import { AuthContext } from "../../context/AuthContext";

//assets import
import userImg from "../../assets/user.svg";

const Profile = () => {
  //auth context
  const [user] = useContext(AuthContext);
  return (
    <div className={style.profile}>
      <div className="container">
        <img src={userImg} alt="user" />
        <h1>{user.userEmail}</h1>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Profile;

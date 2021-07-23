import React, { useContext, useState } from "react";
import style from "./Profile.module.css";

//auth context import
import { AuthContext } from "../../context/AuthContext";

//firebase auth
import { auth } from "../../firebase";

//assets import
import userImg from "../../assets/user.svg";

//modal import
import ActionModal from "../Modals/ActionModal/ActionModal";

const Profile = () => {
  //auth context
  const [user] = useContext(AuthContext);

  //modal context
  const [logoutModal, setLogoutModal] = useState(false);

  //show the logout modal
  const showLogoutModal = () => {
    setLogoutModal(true);
  };

  //logout the user
  const logoutUser = () => {
    auth.signOut();
  };

  //modal show logic
  let showModal = null;
  if (logoutModal) {
    showModal = (
      <ActionModal
        modalType="user"
        text="Do you want to log out?"
        buttonOneText="Yes, Logout"
        buttonTwoText="No"
        buttonOneAction={logoutUser}
        buttonTwoAction={() => {
          setLogoutModal(false);
        }}
      />
    );
  }

  return (
    <div className={style.profile}>
      <div className={style.profileContent}>
        <div className="container">
          <img src={userImg} alt="user" />
          <h1>{user.userEmail}</h1>
          <button onClick={showLogoutModal}>Logout</button>
        </div>
      </div>
      {showModal}
    </div>
  );
};

export default Profile;

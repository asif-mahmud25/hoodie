import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  //initial state
  let initialState = {
    loggedIn: false,
    userId: "",
    userEmail: "",
  };

  //setting state to local storage if user exists
  if (localStorage.getItem("user")) {
    initialState = JSON.parse(localStorage.getItem("user"));
  }

  const [user, setUser] = useState(initialState);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState({
    loggedIn: false,
    userId: "",
    userEmail: "",
  });

  return (
    <AuthContext.Provider value={[user, setUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};

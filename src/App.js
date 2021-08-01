import { useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

//main component import
import AppLayout from "./components/AppLayout/AppLayout";

//context import
import { CartContextProvider } from "./context/CartContext";
import { AuthContext } from "./context/AuthContext";

//firebase auth import
import { auth } from "./firebase";

//firebase db import
import { db } from "./firebase";

function App() {
  //auth context
  const [, setUser] = useContext(AuthContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("logged in");

        let currentUser = {
          loggedIn: true,
          userId: authUser.uid,
          userEmail: authUser.email,
        };

        //save to local storage
        localStorage.setItem("user", JSON.stringify(currentUser));

        //set auth context
        setUser(currentUser);

        //set user data in db if it's a new user
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log("Welcome back!");
            } else {
              db.collection("users")
                .doc(authUser.uid)
                .set({ userId: authUser.uid, userEmail: authUser.email })
                .then((res) => {
                  console.log("user set");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("not logged in");

        //clear local storage
        localStorage.clear();

        //set auth context
        setUser({
          loggedIn: false,
          userId: "",
          userEmail: "",
        });
      }
    });

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <BrowserRouter>
        <CartContextProvider>
          <AppLayout />
        </CartContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

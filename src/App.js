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
      } else {
        console.log("logged out!");

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

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
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in");
        console.log(user);

        //set auth context
        setUser({
          loggedIn: true,
          userId: user.uid,
          userEmail: user.email,
        });
      } else {
        console.log("logged out!");

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

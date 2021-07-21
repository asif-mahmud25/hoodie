import { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

//main component import
import AppLayout from "./components/AppLayout/AppLayout";

//context import
import { CartContextProvider } from "./context/CartContext";

//firebase auth import
import { auth } from "./firebase";

function App() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in");
        console.log(user);
      } else {
        console.log("logged out!");
      }
    });
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

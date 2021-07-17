import "./App.css";
import { BrowserRouter } from "react-router-dom";

import AppLayout from "./components/AppLayout/AppLayout";

//context import
import { CartContextProvider } from "./context/CartContext";

function App() {
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
